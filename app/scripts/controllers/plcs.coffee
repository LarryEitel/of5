'use strict'

llFromLatLng = (latLng) ->
    latLng.lat + ',' + latLng.lng

latLngFromLl = (ll) ->
    llSplit            = ll.split(',')
    {lat: llSplit[0], lng: llSplit[1]}

spritesPath = 'img/map/sprites/'
mapMarkersPath = 'img/map/markers/small/white/numbers/'
mapMaxZoom = 19

angular.module('ofApp').controller('PlcsCtrl', \
    ['$rootScope', '$scope', '$location', '$routeParams', '$cookies', \
     'Restangular', '$timeout', '$log', '$anchorScroll', 'GoogleMap', \
        ($rootScope, $scope, $location, $routeParams, $cookies, \
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
    $scope.media = $routeParams.media or ''
    $rootScope.printView = $scope.printView = $routeParams.media == 'prn'
    $scope.args = defaultRouteArgs
    $rootScope.filtBdyId = $scope.filtBdyId = null
    $rootScope.editingBdy = false
    $rootScope.bdysLoaded = false
    $rootScope.selectedItemIndex = gmap.selectedItem = gmap.selectedItemIndex = -1
    $scope.bdyViews =
        crherbs:
                                [{nam: 'Main', zoom:14, llCenter: '9.976819295953407,-84.16194130521517', mapTypeId: 'hybrid'}]
        crherbsbr:
                                [{nam: 'Main', zoom:15, llCenter: '9.971071018203258,-84.15988136869173', mapTypeId: 'hybrid'}]
        crherbsbrr01:
                                [{nam: 'Main', zoom:17, llCenter: '9.973437968382253,-84.16134049039584', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]}]
        crherbsbrr02:
                                [{nam: 'Main', zoom:17, llCenter: '9.97349638016292,-84.16631358847928', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]}]
        crherbsbrr03:
                                [{nam: 'Main', zoom:18, llCenter: '9.973667700855833,-84.16967939293744', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]}]
        crherbsbrr04:
                                [{nam: 'Main', zoom:18, llCenter: '9.971095930944049,-84.16924278118506', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]}]
        crherbsbrr05:
                                [{nam: 'Main', zoom:18, llCenter: '9.97113872118877,-84.16887763435983', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]}]
        crherbsbrr06:
                                [{nam: 'Main', zoom:18, llCenter: '9.96906003005786,-84.16883676999466', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]},
                                {nam: 'E', zoom:19, llCenter: '9.969028329520771,-84.16865974419967', mapTypeId: 'hybrid'},
                                {nam: 'W', zoom:19, llCenter: '9.969178907047947,-84.16866779082672', mapTypeId: 'hybrid'}]
        crherbsbrr07:
                                [{nam: 'Main', zoom:18, llCenter: '9.967435883191067,-84.16807573414316', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]}]
        crherbsbrr08:
                                [{nam: 'Main', zoom:18, llCenter: '9.967593806754337,-84.16492581199572', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]}]
        crherbsbrr09:
                                [{nam: 'Main', zoom:18, llCenter: '9.969137449721174,-84.16503919625961', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]},
                                {nam: 'NE', zoom:19, llCenter: '9.969412187521936,-84.1647307422229', mapTypeId: 'hybrid'},
                                {nam: 'SW', zoom:19, llCenter: '9.968801952286398,-84.1655944135257', mapTypeId: 'hybrid'}]
        crherbsbrr10:
                                [{nam: 'Main', zoom:18, llCenter: '9.970525510722636,-84.16511999919874', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]},
                                {nam: 'NW', zoom:19, llCenter: '9.970512302225993,-84.1655813391493', mapTypeId: 'hybrid'},
                                {nam: 'E', zoom:19, llCenter: '9.970916482013722,-84.16447090461713', mapTypeId: 'hybrid'}]
        crherbsbrr11:
                                [{nam: 'Main', zoom:18, llCenter: '9.970053746032534,-84.16725222757447', mapTypeId: 'hybrid', \
                                    notes: [{title: 'Direcciónes a este territorio', note: 'saliendo del Salon del Reino de los Testigos de Jehovah, dobla  a la derecha y continuar al sur 600 mtrs, al final de la calle dobla a la izquierda,  en el primer semaforo dobla a la derecha, continuar hasta que llegar a la entradad de Bosques de Dona Rosa y entrar doblando a la derecha, coja la proxima derecha y la primera casa esta 100 metros mano izquierda'}]},
                                {nam: 'N', zoom:19, llCenter: '9.970510760384416,-84.16725222757447', mapTypeId: 'hybrid'},
                                {nam: 'S', zoom:19, llCenter: '9.969612581282494,-84.16717712572205', mapTypeId: 'hybrid'}]

#    console.log '$rootScope.tkn', $rootScope.tkn
#    LoggedInRestangular.service.init($rootScope.tkn)
#    Bdys = LoggedInRestangular.all('bdys')
#    Plcs = LoggedInRestangular.all('plcs')
#
#    LoggedInRestangular = Restangular.withConfig((restangularConfigurer) ->
#            restangularConfigurer.setDefaultHeaders {'Authorization':'Basic admin@orgtec.com:eeee'}
#    )
#    Bdys = LoggedInRestangular.all('bdys')
#    Plcs = LoggedInRestangular.all('plcs')

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

    $scope.togglePrintView = ->
        $rootScope.printView = $scope.printView = !$scope.printView
        if $scope.printView
            console.log 'PrintView Set On'
            $location.search 'media', 'prn'
        else
            console.log 'PrintView Set On'
            $location.search 'media', ''


    gmap.icon = (item) ->
        if $scope.printView
            $scope.mkrIcon2 item.mkrNo, item.mkrState
        else
            $scope.mkrIcon item.mkrNo, item.mkrState

    $scope.itemMkrClick = (index) ->
        $rootScope.selectedItemIndex = gmap.selectedItemIndex = $scope.selectedItemIndex = index
        $rootScope.selectedItem = gmap.selectedItem = $scope.items[index]
        map.setZoom mapMaxZoom
        if $scope.items[index].pt
            $rootScope.selectedItemIndex = gmap.selectedItemIndex = $scope.selectedItemIndex = -1
            pt = $scope.items[index].pt
            $scope.ll = llFromLatLng pt
            map.setCenter (new google.maps.LatLng(pt[0], pt[1]))

        $location.hash 'top'
        $anchorScroll()

    $scope.doSearch = ->
        if $rootScope.editingBdy
            return

        gmap.removeMkrs()

        if ((typeof ($routeParams.filtBdyId) is 'boolean' or !$routeParams.filtBdyId) and !$scope.q) \
                or (typeof ($routeParams.filtBdyId) is 'boolean' and !$scope.q)
            return


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
#        args.pp = $routeParams.pp || 200

#        Plcs.customGETLIST(args, {'Authentication-Token':'three'}, {'Authentication-Token':'two'}) \
        Plcs.getList(args, {'Authentication-Token': $rootScope.tkn}) \
            .then ((items) ->
                mkrNo = 1
                for item, i in items._items
                    items._items[i].patch = $scope.patch

                    # temporary until mkrNo removed from model
                    delete items._items[i].mkrNo
                    if item.typ != 'ref'
                        items._items[i].mkrNo = mkrNo
                        mkrNo += 1


                    if item.pt and parseInt($routeParams.z, 10) > 16
#                        items._items[i].mapMkr = gmap.addPlcMkr(map, item)
                        items._items[i].mapMkr = gmap.addPlcMkr(map, item)


                $rootScope.items = $scope.items = items._items
#                $scope.bdys[item.bdry].totalDoors = mkrNo - 1
                $scope.bdy = $scope.bdyViews[item.bdry][0]
                $scope.bdy.totalDoors = mkrNo - 1

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
                zIndex = 10 + 99999
            else if bdy.typ == "congArea"
                strokeColor = '#FF82AB' # palevioletred1
                fontSize = 16
                lbl = bdy.nam
                minZoom = 14
                maxZoom = 17
                zIndex = 20 + 99999
            else if bdy.typ == "cong"
                strokeColor = 'white'
                fontSize = 25
                lbl = bdy.nam
                minZoom = 13
                maxZoom = 17
                zIndex = 30 + 99999
            else
                strokeColor = 'white'
                fontSize = 20
                lbl = bdy.nam
                minZoom = 1
                maxZoom = 20
                zIndex = 1000

            # http://google-maps-utility-library-v3.googlecode.com/svn/trunk/maplabel/docs/reference.html
            mapLabel = new MapLabel(
                minZoom: minZoom
                maxZoom: maxZoom
                strokeColor: strokeColor
                text: lbl
                position: new google.maps.LatLng(bdy.ptCenter[0], bdy.ptCenter[1])
                map: map
                fontSize: fontSize
                zIndex: zIndex
            )
            x=0



    $scope.loadBdys = ->
        Bdys.getList({sort:'typ,slug'}, {'Authentication-Token': $rootScope.tkn})
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
        Bdys.getList(null, {'Authentication-Token': $rootScope.tkn})
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
        bdy = ''
        if newValue \
                and typeof newValue == 'string' \
                and $routeParams.filtBdyId != newValue
            bdy = $scope.bdys[newValue]
            ptCenter = bdy.ptCenter
            map.setCenter (new google.maps.LatLng(ptCenter[0], ptCenter[1]))


            llCenter = latLngFromLl($scope.bdyViews[newValue][0].llCenter)
            map.setCenter (new google.maps.LatLng(llCenter.lat, llCenter.lng))
            #            map.setCenter (new google.maps.LatLng(ptCenter[0], ptCenter[1]))
            map.setZoom $scope.bdyViews[newValue][0].zoom
            #            map.setZoom bdy.zoom

            map.setZoom bdy.zoom
            map.setMapTypeId bdy.mapTypeId
            $rootScope.filtBdyId = $scope.filtBdyId = newValue
            $routeParams.filtBdyId = newValue
            $rootScope.title = $scope.title = $routeParams.title = bdy.nam
            console.log 'newValue inside', newValue, bdy.nam

        else if $routeParams.filtBdyId != newValue
            console.log 'newValue', ''
            $rootScope.title = $scope.title = ''
            $routeParams.title = ''

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

    $scope.moveDown = ($index) ->
        confirmMove = confirm('Move Down?')
        if !confirmMove
            return
        # clone some details from the item the user clicked the Plus (Insert) Icon
        itemFrom = $scope.items[$index]

        # easiest is to put next item's w value between this item and the previous

        # this should NOT be the last item because button is not shown if it is
        itemNext = $scope.items[$index + 1]

        # need to calc sort w(eight) value
        # if the first item in list, just subtract 1 to w
        # .00000001 makes it a float!!! exact value not important
        if $index == 0
            newValueForNext_w = itemFrom.w - 1.00000001

        # else avg
        else
            newValueForNext_w = itemFrom.w - ((itemFrom.w - $scope.items[$index - 1].w) / 2)

        data = JSON.stringify(actions:
            $set:
                flds: {w: newValueForNext_w}
        )
        Plc = Restangular.one('plcs', itemNext._id)
        Plc.customPUT(null, null, null, data).then ((itemChanged) ->
            $scope.doSearch()
        ), errorCallback = ->
            console.log 'Oops error from server :('

    $scope.moveUp = ($index) ->
        confirmMove = confirm('Move up?')
        if !confirmMove
            return
        # clone some details from the item the user clicked the Plus (Insert) Icon
        itemFrom = $scope.items[$index]

        # this should NOT be the first item because button is not shown if zero
        itemPrevious = $scope.items[$index - 1]

        # easiest is to put previous item's w value between this item and the next
        # need to calc sort w(eight) value
        # if the last item in list, just add 1 to w
        # .00000001 makes it a float!!! exact value not important
        if $index == $scope.items.length - 1
            newValueForPrevious_w = itemFrom.w + 1.00000001

        # this should NOT be zero because button is not shown if zero
        else if $index == 0
            newValueForPrevious_w = itemFrom.w - 1.00000001

        # else avg
        else
            newValueForPrevious_w = itemFrom.w + (($scope.items[$index + 1].w - itemFrom.w) / 2)

        data = JSON.stringify(actions:
            $set:
                flds: {w: newValueForPrevious_w}
        )
        Plc = Restangular.one('plcs', itemPrevious._id)
        Plc.customPUT(null, null, null, data).then ((itemChanged) ->
            $scope.doSearch()
        ), errorCallback = ->
            console.log 'Oops error from server :('


    $scope.insertAfter = ($index) ->
        confirmInsert = confirm('Insert a new place?')
        if !confirmInsert
            return

        # clone some details from the item the user clicked the Plus (Insert) Icon
        itemFrom = $scope.items[$index]

        blankItem = {nam: 'Nuevo lugar en blanco.', bdry:itemFrom.bdry}

        # need to calc sort w(eight) value
        # if the last item in list, just add 1 to w
        if $index == $scope.items.length - 1
            blankItem.w = itemFrom.w + 1.00000001

        # else avg
        else
            blankItem.w = itemFrom.w + (($scope.items[$index + 1].w - itemFrom.w) / 2)

        data = 'doc=' + JSON.stringify(blankItem)
        Plcs = Restangular.all('plcs')
        Plcs.post(data).then (itemAdded) ->
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
                $scope.doSearch()
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
        markerHeight = 12
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
            markerWidth = 14
            spriteX = (mkrNo - 10) * markerWidth
            spriteY = mkrState * markerHeight
        else
            spriteImage = spritesPath + 'sprite_3.png'
            markerWidth = 18
            spriteX = (mkrNo - 100) * markerWidth
            spriteY = mkrState * markerHeight
        spriteY += 1  if spriteY # WHY? It just looks lined up correctly. :)

        # new google.maps.Point((mkrNo - markerOffset) * markerWidth, \
        # (markerNo - markerOffset) * 12),
        icon = new google.maps.MarkerImage( \
            spriteImage, \
            new google.maps.Size(markerWidth, 12),
            # offset within the sprite
            new google.maps.Point(spriteX, spriteY),  \
            # anchor point divide by half to put marker exactly centered on point
            new google.maps.Point(markerWidth/2, markerHeight/2) \
            ) if mkrNo and mkrState > -1
        return icon


    $scope.mkrIcon2 = (mkrNo, mkrState = 0) ->
        iconImage = mapMarkersPath + mkrNo + '.png'
#        console.log iconImage
#        marker_base_width = 60
#        marker_height = 60

        mkrHeight = 12
        if mkrNo < 10
            mkrWidth = 12
#            mkrWidth = marker_base_width
#            scaleWidth = 14
        else if mkrNo < 100
            mkrWidth = 14
#            mkrWidth = parseInt(marker_base_width * 1.15, 10)
#            scaleWidth = 16
        else
            mkrWidth = 20
#            mkrWidth = parseInt(marker_base_width * 1.6, 10)
#            scaleWidth = 22

#        icon =  new google.maps.MarkerImage(
#            iconImage,
#            new google.maps.Size(mkrWidth, mkrHeight),
#            new google.maps.Point(0, 0),
#            null,
##            new google.maps.Point(0, marker_height/2), #anchor is bottom center of the scaled image
#            new google.maps.Size(scaleWidth, 14))

        icon =  new google.maps.MarkerImage(
            iconImage,
            new google.maps.Size(mkrWidth, mkrHeight),
            new google.maps.Point(0, 0))

        return icon

    $scope.loadBdys()
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
            $scope.etag = item.etag
            $scope.dNam = item.dNam
            $scope.item = {}
            $scope.item._id = item._id or null
            $scope.item.bdry = item.bdry or ''
            $scope.item.nam = item.nam or ''
            $scope.item.namS = item.namS or ''
            $scope.item.typ = item.typ or ''
            $scope.item.addr = item.addr
            $scope.item.desc = item.desc
            $scope.item.w = item.w
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
#            if typeof(item.typ) isnt 'undefined' and item.typ > ''
#                item.typ

            if typeof(item.tags) isnt 'undefined' and item.tags > ''
                try
                    item.tags = item.tags.split(',')
                catch error
                    console.log 'spit error'

            else
                item.tags = []
#            if 'undefined' isnt item.lng and 'undefined' isnt item.lat
#                item.pt = [item.lng, item.lat]

            if item.typ == 'ref'
                item.pt = []

            delete item.lat
            delete item.lng
            delete item._id


            item.w += .000000001
            data = JSON.stringify(actions:
                $set:
                    flds: item
            )
            headers = {'If-Match': $scope.etag}
#            headers = {'ETag': $scope.etag, 'If-Match': $scope.etag}
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
