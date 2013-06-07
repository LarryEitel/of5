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
        cngAreaTerrSlug: 'br06'
        q: ''
        sort: 'bdry,w'
        filter: 'cngAreaTerr:crherbs'
        z: 17
        pp: 5
        pg: 5


    $scope.items = []
    $scope.lastItemsWithInfo = null
    $scope.maxId = null
    $scope.q = $routeParams.q or defaultRouteArgs.q
    $scope.ll = $routeParams.ll or defaultRouteArgs.ll
    console.log 'll', $scope.ll
    $scope.z = parseInt($routeParams.z, 10) or defaultRouteArgs.z
    $scope.pp = $routeParams.pp or defaultRouteArgs.pp
    $scope.pg = $routeParams.pg or defaultRouteArgs.pg
    $scope.sort = $routeParams.sort or defaultRouteArgs.sort
    $scope.args = defaultRouteArgs
    $rootScope.cngAreaTerrId = $scope.cngAreaTerrId = null
    $rootScope.editingBdy = false
    $rootScope.bdysLoaded = false
    $rootScope.selectedItemIndex = gmap.selectedItem = gmap.selectedItemIndex = -1
    $rootScope.bdys = $scope.bdys =
        crherbsbr06:
            slug: 'crherbsbr06'
            cPt: {lat: 9.968153195552807, lng: -84.16725754737854}
            zoom: 18
            mapTypeId: 'hybrid'
            nam: 'Bosques Doña Rosa #06'
            pts: [[9.968973408638314, -84.16704810218715], [9.968834630162002, -84.16738249091311], [9.968687859338182, -84.16774137804002], [9.968576842974961, -84.16801182972485], [9.968357135937447, -84.16856601952634], [9.968235536849983, -84.1688600789591], [9.968290364601158, -84.1689382478004], [9.968185140827481, -84.16925035558872], [9.968071991033325, -84.16959979567874], [9.967896742305653, -84.17004978516898], [9.967619131169556, -84.1698935282033], [9.967423552934315, -84.16974591816535], [9.967035306551264, -84.16945708532839], [9.966685131806567, -84.16939843670873], [9.966378287697097, -84.1691726710474], [9.966023354857446, -84.16893273823939], [9.965734303225522, -84.16857025333104], [9.965613440668452, -84.16826787236042], [9.965819326733603, -84.16803068108251], [9.965957335661212, -84.16799686820771], [9.966182771570422, -84.16790301677798], [9.966307864428352, -84.16775732151905], [9.96656028368469, -84.16746657050498], [9.966602035273382, -84.1673851778044], [9.966674270744669, -84.16718030471891], [9.966646242740357, -84.16689545065421], [9.966659298405238, -84.16670404110766], [9.966688356310634, -84.16638654621703], [9.966646786420888, -84.1661875138058], [9.967314722075486, -84.16630549476103], [9.967907745506793, -84.16639133922605], [9.968658444907955, -84.16649284406267], [9.969173790522499, -84.16652434615186]]
        crherbsbr08:
            slug: 'crherbsbr08'
            cPt: {lat: 9.970424700092135, lng: -84.1655137742861}
            zoom: 18
            mapTypeId: 'hybrid'
            nam: 'Bosques Doña Rosa #08'
            pts: [[9.970634375109034, -84.16662862265946], [9.969907681451806, -84.16657379040629], [9.96918575418298, -84.16650864293284], [9.96943374126796, -84.16599287415393], [9.969851338243716, -84.16521112187816], [9.970192424609472, -84.1644953963647], [9.970381346368669, -84.16399504832715], [9.970414333758404, -84.16356338864574], [9.970860827824179, -84.16358807368938], [9.971522431696373, -84.1636944279533], [9.971865267262292, -84.16377292236123], [9.97160925842014, -84.16415504435048], [9.971549964164529, -84.1645948033377], [9.971502592657677, -84.16497758355433], [9.971482064948713, -84.16534208232451], [9.971453921969445, -84.1657601923639], [9.971431254046498, -84.16631665124032], [9.971410736324534, -84.1666766097517]]
#    $scope.cngs = [
#        slug: 'crherbs'
#        nam: 'Belen Sur'
#    ]
#    $scope.cngAreas = [
#        bdry: 'crherbs'
#        slug: 'crherbsbr'
#        nam: 'Cariari'
#    ]
    $scope.cngAreaTerrs = [
#        bdry: 'crherbsbr'
        {slug: 'crherbsbr06', nam: 'br06-Bosques Doña Rosa 06'},
        {slug: 'crherbsbr08', nam: 'br08-Bosques Doña Rosa 08'}
    ]
    $routeParams.sort = defaultRouteArgs.sort  unless $routeParams.sort
    $rootScope.returnRoute = $location.$$url
    $scope.location = $location
    $scope.routeParams = $routeParams

    $rootScope.cngAreaTerrId = $scope.cngAreaTerrId = $routeParams.cngAreaTerrId
    console.log 'cngAreaTerrId', $rootScope.cngAreaTerrId
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
        whereParts.bdry = $routeParams.cngAreaTerrId  \
            if typeof ($routeParams.cngAreaTerrId) isnt 'boolean' \
                and $routeParams.cngAreaTerrId
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


                    if item.pt
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

    $scope.loadBdys = ->
        if not $rootScope.bdysLoaded
            for key, bdy of $scope.bdys
                console.log 'loadBdy', key
                bdyPoly = gmap.addBdy(map, bdy)
                $rootScope.bdys[key].poly = $scope.bdys[key].poly = bdyPoly.bdy
        $rootScope.bdysLoaded = true

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

    $scope.$watch 'cngAreaTerrId', (newValue) ->
        $location.search 'cngAreaTerrId', newValue
        $rootScope.cngAreaTerrId = $scope.cngAreaTerrId = newValue
        if newValue \
                and typeof newValue == 'string' \
                and $routeParams.cngAreaTerrId != newValue
            bdy = $scope.bdys[newValue]
            cPt = bdy.cPt
            map.setCenter (new google.maps.LatLng(cPt.lat, cPt.lng))
            map.setZoom bdy.zoom
            map.setMapTypeId bdy.mapTypeId
            $rootScope.cngAreaTerrId = $scope.cngAreaTerrId = newValue
            $routeParams.cngAreaTerrId = newValue

    $scope.$watch 'routeParams', ((newVal, oldVal) ->
        if !$rootScope.editingBdy
            angular.forEach newVal, (v, k) ->
                if k isnt 'where'
                    $scope[k] = v
                    $location.search k, v

    ), true
    Plcs = Restangular.all('plcs')
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
