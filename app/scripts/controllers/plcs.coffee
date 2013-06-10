'use strict'

llFromLatLng = (latLng) ->
    latLng.lat + ',' + latLng.lng

latLngFromLl = (ll) ->
    llSplit            = ll.split(',')
    {lat: llSplit[0], lng: llSplit[1]}

spritesPath = 'img/map/sprites/'
maxZoom = 19

angular.module('ofApp').controller('PlcsCtrl', \
    ['$rootScope', '$scope', '$location', '$routeParams', \
     'Restangular', '$timeout', '$log', '$anchorScroll', 'GoogleMap', \
        ($rootScope, $scope, $location, $routeParams, \
         Restangular, $timeout, $log, $anchorScroll, GoogleMap) ->


    # --------------- should pass in options
    gmap = GoogleMap
    googleMaps = google.maps
#    console.log 'gmap', gmap
    map = gmap.map
#    console.log 'googleMaps', googleMaps
#    console.log 'map', map
    defaultRouteArgs =
        ll: '9.971365509675179,-84.16658163070679'
        cngSlug: 'crherbs'
        cngAreaSlug: 'br'
        cngAreaTerrSlug: 'brr06'
        q: ''
        sort: 'bdry,w'
        #                ------------------- what's this
        filter: 'filtBdyId:crherbs'
        z: 17
        pp: 5
        pg: 5


    $scope.items = []
    $scope.lastItemsWithInfo = null
    $scope.maxId = null
    $scope.q = $routeParams.q or defaultRouteArgs.q
    $scope.ll = $routeParams.ll or defaultRouteArgs.ll
    $scope.z = parseInt($routeParams.z, 10) or defaultRouteArgs.z
    $scope.pp = $routeParams.pp or defaultRouteArgs.pp
    $scope.pg = $routeParams.pg or defaultRouteArgs.pg
    $scope.sort = $routeParams.sort or defaultRouteArgs.sort
    $scope.args = defaultRouteArgs
    $rootScope.filtBdyId = $scope.filtBdyId = null
    $rootScope.editingBdy = false
    $rootScope.bdysLoaded = false
    $rootScope.selectedItemIndex = gmap.selectedItem = gmap.selectedItemIndex = -1

    Bdys = Restangular.all('bdys')
    Plcs = Restangular.all('plcs')

#    $scope.cngs = [
#        slug: 'crherbs'
#        nam: 'Belen Sur'
#    ]
#    $scope.cngAreas = [
#        bdry: 'crherbs'
#        slug: 'crherbsbr'
#        nam: 'Cariari'
#    ]
    $routeParams.sort = defaultRouteArgs.sort  unless $routeParams.sort
    $rootScope.returnRoute = $location.$$url
    $scope.location = $location
    $scope.routeParams = $routeParams

    $rootScope.filtBdyId = $scope.filtBdyId = $routeParams.filtBdyId
    console.log 'filtBdyId', $rootScope.filtBdyId
    $rootScope.$watch 'selectedItemIndex', (newValue) ->
        $scope.selectedItem = $rootScope.selectedItem
        $rootScope.selectedItemIndex = $scope.selectedItemIndex = newValue

    gmap.icon = (item) ->
        $scope.mkrIcon item.mkrNo, item.mkrState

    $scope.itemMkrClick = (index) ->
        $rootScope.selectedItemIndex = gmap.selectedItemIndex = $scope.selectedItemIndex = index
        $rootScope.selectedItem = gmap.selectedItem = $scope.items[index]
        map.setZoom maxZoom
        if $scope.items[index].pt
            $rootScope.selectedItemIndex = gmap.selectedItemIndex = $scope.selectedItemIndex = -1
            pt = $scope.items[index].pt
            $scope.ll = llFromLatLng pt
            map.setCenter (new google.maps.LatLng(pt[0], pt[1]))

        $location.hash 'top'
        $anchorScroll()

    $scope.doSearch = ->
        if $rootScope.editingBdy
            console.log 'currently editing a boundary'
            return

        console.log 'doSearch'

        args = {}
        q = $scope.q
        whereParts = {}
        whereParts.bdry = $routeParams.filtBdyId  \
            if typeof ($routeParams.filtBdyId) isnt 'boolean' \
                and $routeParams.filtBdyId
        quickFindPlcIds = q.match(/qp\w+/g)
        if quickFindPlcIds
            plcIds = []
            i = 0

            while i < quickFindPlcIds.length
                console.log quickFindPlcIds[i]
                plcIds.push quickFindPlcIds[i].substr(2)
                ++i
            whereParts.id = $in: plcIds
            q = q.replace(/qp\w+\s*/g, '')
        if q
            whereParts.dNam =
                $regex: q
                $options: 'i'
        args.where = JSON.stringify(whereParts)  if whereParts
        args.sort = $routeParams.sort  if $routeParams.sort
        Plcs.getList(args) \
            .then ((items) ->

                $scope.loadBdys()
                gmap.removeMkrs()

                for item, i in items._items
                    items._items[i].patch = $scope.patch


                    if item.pt and parseInt($routeParams.z, 10) > 16
                        items._items[i].mapMkr = gmap.addPlcMkr(map, item)

                $rootScope.items = $scope.items = items._items

                $location.search 'q', $scope.q  if $scope.q
            ), errorCallback = ->
                console.log 'Oops error from server :('


    $scope.saveBdy = (bdyKey) ->
        bdy = $rootScope.bdys[bdyKey]
        bdy.poly.setEditable(false)
        $rootScope.editingBdy = $scope.editingBdy = false

    $scope.editBdy = (bdyKey) ->
        console.log 'editBdy key:', bdyKey
        bdy = $rootScope.bdys[bdyKey]
        bdy.poly.setEditable(true)
        $rootScope.editingBdy = $scope.editingBdy = true

    $scope.showBdyLabels = ->
        for slug, bdy of $scope.bdys

            minZoom = bdy.zoom
            if bdy.typ == "congAreaResidentialTerr"
                strokeColor = '#98F5FF' # cadetblue1
                fontSize = 12
                lbl = bdy.nam.split('#')[1]
                minZoom = 15
                maxZoom = 17
            else if bdy.typ == "congArea"
                strokeColor = '#FF82AB' # palevioletred1
                fontSize = 16
                lbl = bdy.nam
                minZoom = 14
                maxZoom = 17
            else if bdy.typ == "cong"
                strokeColor = 'white'
                fontSize = 25
                lbl = bdy.nam
                minZoom = 13
                maxZoom = 17
            else
                strokeColor = 'white'
                fontSize = 20
                lbl = bdy.nam
                minZoom = 1
                maxZoom = 20

            # http://google-maps-utility-library-v3.googlecode.com/svn/trunk/maplabel/docs/reference.html
            mapLabel = new MapLabel(
                minZoom: minZoom
                maxZoom: maxZoom
                strokeColor: strokeColor
                text: lbl
                position: new google.maps.LatLng(bdy.ptCenter[0], bdy.ptCenter[1])
                map: map
                fontSize: fontSize
            )



    $scope.loadBdys = ->
        Bdys.getList({sort:'typ,slug'})
            .then ((items) ->
                bdys = {}
                filtBdys = []
                for item, i in items._items
                    bdy =
                        slug: item.slug
                        nam: item.nam
                        typ: item.typ
                        ptCenter: [item.ptCenter[0], item.ptCenter[1]]
                        zoom: 18
                        mapTypeId: 'hybrid'
                    if item.typ == "congAreaResidentialTerr"
                        bdy.zoom = 18
                    else if item.typ == "congArea"
                        bdy.zoom = 15
                    else if item.typ == "cong"
                        bdy.zoom = 14
                    else
                        bdy.zoom = 12


                    bdys[item.slug] = bdy
                    filtBdys.push {slug: item.slug, nam: item.nam}


                $scope.bdys = bdys
                $scope.filtBdys = filtBdys
                $scope.showBdyLabels()

            ), errorCallback = ->
                console.log 'Oops error from server :('



    $scope.loadBdyPolys = ->
        Bdys.getList()
            .then ((items) ->
                bdys = {}
                for item, i in items._items
                    bdy = item

                    bdy.bdyPoly = gmap.addBdy(map, bdy)
                    bdys[item.slug] = bdy

#                $rootScope.bdys = $scope.bdys = bdys
                $rootScope.bdysLoaded = true

            ), errorCallback = ->
                console.log 'Oops error from server :('



#
#        if not $rootScope.bdysLoaded
#            for key, bdy of $scope.bdys
#                console.log 'loadBdy', key
#                bdyPoly = gmap.addBdy(map, bdy)
#                $rootScope.bdys[key].poly = $scope.bdys[key].poly = bdyPoly.bdy
#        $rootScope.bdysLoaded = true

    $scope.patch = (_id, data) ->
        Plc = Restangular.one('plcs', _id)

        Plc.customPUT(null, null, null, data) \
                .then ((itemUpdated) ->
            console.log 'success!'
        ), errorCallback = ->
            console.log 'Oops error from server :('



    $scope.$watch 'z', (newValue) ->
        $location.search 'z', newValue
        $scope.z = parseInt(newValue, 10)

    $scope.$watch 'filtBdyId', (newValue) ->
        $location.search 'filtBdyId', newValue
        $rootScope.filtBdyId = $scope.filtBdyId = newValue
        if newValue \
                and typeof newValue == 'string' \
                and $routeParams.filtBdyId != newValue
            bdy = $scope.bdys[newValue]
            ptCenter = bdy.ptCenter
            map.setCenter (new google.maps.LatLng(ptCenter[0], ptCenter[1]))
            map.setZoom bdy.zoom
            map.setMapTypeId bdy.mapTypeId
            $rootScope.filtBdyId = $scope.filtBdyId = newValue
            $routeParams.filtBdyId = newValue

    $scope.$watch 'routeParams', ((newVal, oldVal) ->
        if !$rootScope.editingBdy
            angular.forEach newVal, (v, k) ->
                if k isnt 'where'
                    $scope[k] = v
                    $location.search k, v

    ), true
    qry = {}
    $scope.doClear = ->
        $scope.q = $scope.location.q = $scope.routeParams.q = defaultRouteArgs.q
        $scope.doSearch()


    $scope.add = ->
        data = 'doc=' + JSON.stringify($scope.newItem)
        Plcs = Restangular.all('plcs')
        Plcs.post(data).then (itemAdded) ->
            $scope.newItem._id = itemAdded.doc._id
            $scope.items.push $scope.newItem
            $scope.newItem = {}

    $scope.remove = ($index) ->
        confirmRemove = confirm('Are you absolutely sure you want to delete?')
        if confirmRemove
            item = $scope.items[$index]
            Plc = Restangular.one('plcs', item._id)
            Plc.remove().then (->
                $scope.items.splice $index, 1
            ), errorCallback = ->
                console.log 'Oops error from server :('
                $location.path '/plc/' + $routeParams.id


    $scope.insert = ->
        $location.path '/plc/insert'

    $scope.edit = ($index) ->
        item = $scope.items[$index]
        $location.path '/plc/' + item._id + '/edit'

    $scope.view = ($index) ->
        item = $scope.items[$index]
        $location.path '/plc/' + item._id

    $scope.mkrIcon = (mkrNo, mkrState = 0) ->
        mkrStates = ['new', 'try_1', 'try_1_contacted', 'try_2', \
                     'try_2_contacted', 'try_3', 'try_3_contacted']
        markerHeight = null
        markerWidth = null
        spriteImage = null
        spriteX = null
        spriteY = null
        if mkrNo < 10
            spriteImage = spritesPath + 'sprite_1.png'
            markerWidth = 12
            spriteX = (mkrNo - 1) * markerWidth
            spriteY = mkrState * markerHeight
        else if mkrNo < 100
            spriteImage = spritesPath + 'sprite_2.png'
            markerWidth = 16
            spriteX = (mkrNo - 10) * markerWidth
            spriteY = mkrState * markerHeight
        else
            spriteImage = spritesPath + 'sprite_3.png'
            markerWidth = 20
            spriteX = (mkrNo - 100) * markerWidth
            spriteY = mkrState * markerHeight
        spriteY += 1  if spriteY # WHY? It just looks lined up correctly. :)

        # new google.maps.Point((mkrNo - markerOffset) * markerWidth, \
        # (markerNo - markerOffset) * 12),
        icon = new google.maps.MarkerImage( \
                                spriteImage, \
                                new google.maps.Size(markerWidth, 12), \
                                new google.maps.Point(spriteX, spriteY))  \
            if mkrNo and mkrState > -1
        return icon


    $scope.doSearch()
    $scope.loadBdyPolys()
])

angular.module('ofApp').controller('PlcFormCtrl', \
    ['$rootScope', '$scope', '$location', '$routeParams', 'Restangular', \
        ($rootScope, $scope, $location, $routeParams, Restangular) ->

    insertMode = $location.$$path is '/plc/insert'
    if insertMode
        $scope.mode = 'Add New'
    else
        $scope.mode = 'Update'
        Plc = Restangular.one('plcs', $routeParams.id)
        Plc.get().then ((item) ->
            $scope.dNam = item.dNam
            $scope.item = {}
            $scope.item._id = item._id or null
            $scope.item.bdry = item.bdry or ''
            $scope.item.nam = item.nam or ''
            $scope.item.namS = item.namS or ''
            $scope.item.addr = item.addr
            $scope.item.desc = item.desc
            if typeof (item.tags) isnt 'undefined'
                $scope.item.tags = item.tags.join(',')
            else
                $scope.item.tags = ''
            if typeof (item.pt) isnt 'undefined'
                $scope.item.lng = item.pt[0]
                $scope.item.lat = item.pt[1]
        ), errorCallback = ->
            console.log 'Oops error from server :('

    $scope.remove = (item) ->
        confirmRemove = confirm('Are you absolutely sure you want to delete?')
        if confirmRemove
            Plc = Restangular.one('plcs', item._id)
            Plc.remove().then (->
                $location.path '/plcs'
            ), errorCallback = ->
                console.log 'Oops error from server :('
                $location.path '/plc/' + $routeParams.id


    $scope.save = (item) ->
        data = {}
        console.log 'save'
        if insertMode
            data = 'doc=' + JSON.stringify(item)
            Plcs = Restangular.all('plcs')
            Plcs.post(data).then (->
                window.location.href = '#' + $rootScope.returnRoute
            ), errorCallback = ->
                console.log 'Oops error from server :('

        else
            if 'undefined' isnt item.tags and item.tags > ''
                item.tags = item.tags.split(',')
            else
                item.tags = []
            if 'undefined' isnt item.lng and 'undefined' isnt item.lat
                item.pt = [item.lng, item.lat]
                delete item.lat

                delete item.lng
            delete item._id

            console.log 'item', item
            data = JSON.stringify(actions:
                $set:
                    flds: item
            )
            Plc.customPUT(null, null, null, data).then ((itemUpdated) ->
                window.location.href = '#' + $rootScope.returnRoute
            ), errorCallback = ->
                console.log 'Oops error from server :('


    $scope.abandonChanges = ->
        $location.path '/plc/' + $scope.item._id
])

angular.module('ofApp').controller 'PlcViewCtrl', \
    ['$rootScope', '$scope', '$location', '$routeParams', 'Restangular', \
        ($rootScope, $scope, $location, $routeParams, Restangular) ->

    Plc = Restangular.one('plcs', $routeParams.id)
    Plc.get().then ((item) ->
        $scope.item = item
        if 'pt' in item
            $scope.lng = item.pt[0]
            $scope.lat = item.pt[1]
    ), errorCallback = ->
        console.log 'Oops error from server :('

    $scope.remove = (item) ->
        confirmRemove = confirm('Are you absolutely sure you want to delete?')
        if confirmRemove
            Plc = Restangular.one('plcs', item._id)
            Plc.remove().then (->

                #              return $location.path('/plcs');
                window.location.href = '#' + $rootScope.returnRoute
            ), errorCallback = ->
                console.log 'Oops error from server :('
                window.location.href = '#' + $rootScope.returnRoute

    $scope.edit = (item) ->
        $location.path '/plc/' + item._id + '/edit'
]
