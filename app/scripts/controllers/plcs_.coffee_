"use strict"
angular.module("ofApp").controller("PlcsCtrl",
                        ["$rootScope", "$scope", "$location", "$routeParams", "Restangular", "$timeout", "$log",
                         "$anchorScroll",
                            ($rootScope, $scope, $location, $routeParams, Restangular, $timeout, $log, $anchorScroll) ->
                                SJO =
                                    latitude: 9.988002927
                                    longitude: -84.20538052916

                                BR06 =
                                    latitude: 9.968179612738837
                                    longitude: -84.16628122329712

                                defaultCenter = BR06
                                defaultLatLng = defaultCenter.latitude.toString() + "," + defaultCenter.longitude.toString()
                                if $routeParams.ll and typeof ($routeParams.ll) is "string"
                                    ll = $routeParams.ll.split(",")
                                    defaultLatLng = ll
                                    defaultCenter =
                                        latitude: parseFloat(ll[0])
                                        longitude: parseFloat(ll[1])
                                angular.extend $scope,
                                    position:
                                        coords: defaultCenter

                                    centerProperty: defaultCenter
                                    zoomProperty: 18
                                    markersProperty: []
                                    clickedLatitudeProperty: null
                                    clickedLongitudeProperty: null
                                    eventsProperty:
                                        click: (mapModel, eventName, originalEventArgs) ->
                                            $log.log "user defined event on map directive with scope", this

                                $scope.itemMkrClick = (index) ->
                                    console.log "itemMkrClick.index", index
                                    $scope.selectedItemIndex = index
                                    if $scope.items[index].pt isnt `undefined`
                                        pt = $scope.items[index].pt
                                        console.log "pt", pt
                                        $scope.ll = pt[0].toString() + "," + pt[1].toString()
                                    $location.hash "top"
                                    $anchorScroll()

                                defaultRouteArgs =
                                    ll: defaultLatLng
                                    cngSlug: "crherbs"
                                    cngAreaSlug: "crherbsca"
                                    cngAreaTerrSlug: "crherbsca12"
                                    q: ""
                                    sort: "bdry,w"
                                    filter: "cngAreaTerr:crherbs"
                                    z: 18
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
                                $scope.cngs = [
                                    slug: "crherbs"
                                    nam: "Belen Sur"
                                ]
                                $scope.cngAreas = [
                                    bdry: "crherbs"
                                    slug: "crherbsca"
                                    nam: "Cariari"
                                ]
                                $scope.cngAreaTerrs = [
                                    bdry: "crherbsca"
                                    slug: "crherbsca12"
                                    nam: "CA-12"
                                ]
                                $routeParams.sort = defaultRouteArgs.sort  unless $routeParams.sort
                                $rootScope.returnRoute = $location.$$url
                                $scope.location = $location
                                $scope.routeParams = $routeParams
                                $scope.$watch "z", (newValue) ->
                                    $location.search "z", newValue
                                    $scope.z = parseInt(newValue, 10)

                                $scope.$watch "cngAreaTerrId", (newValue) ->
                                    $location.search "cngAreaTerrId", newValue
                                    $scope.cngAreaTerrId = newValue

                                $scope.$watch "routeParams", ((newVal, oldVal) ->
                                    angular.forEach newVal, (v, k) ->
                                        if k isnt "where"
                                            $scope[k] = v
                                            $location.search k, v

                                ), true
                                Plcs = Restangular.all("plcs")
                                qry = {}
                                $scope.doClear = ->
                                    $scope.q = $scope.location.q = $scope.routeParams.q = defaultRouteArgs.q
                                    $scope.doSearch()

                                $scope.doSearch = ->
                                    args = {}
                                    q = $scope.q
                                    whereParts = {}
                                    whereParts.bdry = $routeParams.cngAreaTerrId  if typeof ($routeParams.cngAreaTerrId) isnt "boolean" and $routeParams.cngAreaTerrId
                                    quickFindPlcIds = q.match(/qp\w+/g)
                                    if quickFindPlcIds
                                        plcIds = []
                                        i = 0

                                        while i < quickFindPlcIds.length
                                            console.log quickFindPlcIds[i]
                                            plcIds.push quickFindPlcIds[i].substr(2)
                                            ++i
                                        whereParts.id =
                                            $in: plcIds
                                        q = q.replace(/qp\w+\s*/g, "")
                                    if q
                                        whereParts.dNam =
                                            $regex: q
                                            $options: "i"
                                    args.where = JSON.stringify(whereParts)  if whereParts
                                    args.sort = $routeParams.sort  if $routeParams.sort
                                    Plcs.getList(args).then ((items) ->
                                        $scope.items = items._items
                                        objs = items._items
                                        i = 0

                                        while i < objs.length
                                            obj = objs[i]
                                            obj.mkrUpdate = (e, mkrDat) ->
                                                Plc = Restangular.one("plcs", mkrDat.dat._id)
                                                fldsToPut =
                                                    pt: [e.latLng.lat(), e.latLng.lng()]
                                                data = JSON.stringify(actions:
                                                    $set:
                                                        flds: fldsToPut
                                                )
                                                console.log "customPUT", data
                                                Plc.customPUT(`undefined`, `undefined`, `undefined`,
                                                                        data).then ((itemUpdated) ->
                                                console.log "put success", itemUpdated
                                    ), errorCallback = ->
                                        console.log "mkrUpdate Oops error from server :("


                                    if typeof (obj.pt) isnt "undefined"
                                        $scope.markersProperty.push
                                            latitude: obj.pt[0]
                                            longitude: obj.pt[1]
                                            draggable: true
                                            mkrNo: obj.mkrNo
                                            mkrState: obj.mkrState
                                            dat: obj

                                    ++i
                                    $location.search "q", $scope.q  if $scope.q
)
,
errorCallback = ->
    console.log "Oops error from server :("


$scope.add = ->
    data = "doc=" + JSON.stringify($scope.newItem)
    Plcs = Restangular.all("plcs")
    Plcs.post(data).then (itemAdded) ->
        $scope.newItem._id = itemAdded.doc._id
        $scope.items.push $scope.newItem
        $scope.newItem = {}


$scope.remove = ($index) ->
    confirmRemove = confirm("Are you absolutely sure you want to delete?")
    if confirmRemove
        item = $scope.items[$index]
        Plc = Restangular.one("plcs", item._id)
        Plc.remove().then (->
            $scope.items.splice $index, 1
        ), errorCallback = ->
            console.log "Oops error from server :("
            $location.path "/plc/" + $routeParams.id


$scope.insert = ->
    $location.path "/plc/insert"

$scope.edit = ($index) ->
    item = $scope.items[$index]
    $location.path "/plc/" + item._id + "/edit"

$scope.view = ($index) ->
    item = $scope.items[$index]
    $location.path "/plc/" + item._id

$scope.doSearch()
]).
controller("PlcFormCtrl",
                        ["$rootScope", "$scope", "$location", "$routeParams", "Restangular",
                            ($rootScope, $scope, $location, $routeParams, Restangular) ->
                                insertMode = $location.$$path is "/plc/insert"
                                if insertMode
                                    $scope.mode = "Add New"
                                else
                                    $scope.mode = "Update"
                                    Plc = Restangular.one("plcs", $routeParams.id)
                                    Plc.get().then ((item) ->
                                        $scope.dNam = item.dNam
                                        $scope.item = {}
                                        $scope.item._id = item._id or null
                                        $scope.item.bdry = item.bdry or ""
                                        $scope.item.nam = item.nam or ""
                                        $scope.item.namS = item.namS or ""
                                        $scope.item.addr = item.addr
                                        $scope.item.desc = item.desc
                                        if typeof (item.tags) isnt "undefined"
                                            $scope.item.tags = item.tags.join(",")
                                        else
                                            $scope.item.tags = ""
                                        if typeof (item.pt) isnt "undefined"
                                            $scope.item.lng = item.pt[0]
                                            $scope.item.lat = item.pt[1]
                                    ), errorCallback = ->
                                        console.log "Oops error from server :("

                                $scope.remove = (item) ->
                                    confirmRemove = confirm("Are you absolutely sure you want to delete?")
                                    if confirmRemove
                                        Plc = Restangular.one("plcs", item._id)
                                        Plc.remove().then (->
                                            $location.path "/plcs"
                                        ), errorCallback = ->
                                            console.log "Oops error from server :("
                                            $location.path "/plc/" + $routeParams.id


                                $scope.save = (item) ->
                                    data = {}
                                    console.log "save"
                                    if insertMode
                                        data = "doc=" + JSON.stringify(item)
                                        Plcs = Restangular.all("plcs")
                                        Plcs.post(data).then (->
                                            window.location.href = "#" + $rootScope.returnRoute
                                        ), errorCallback = ->
                                            console.log "Oops error from server :("

                                    else
                                        if `undefined` isnt item.tags and item.tags > ""
                                            item.tags = item.tags.split(",")
                                        else
                                            item.tags = []
                                        if `undefined` isnt item.lng and `undefined` isnt item.lat
                                            item.pt = [item.lng, item.lat]
                                            delete item.lat

                                            delete item.lng
                                        delete item._id

                                        console.log "item", item
                                        data = JSON.stringify(actions:
                                            $set:
                                                flds: item
                                        )
                                        Plc.customPUT(`undefined`, `undefined`, `undefined`,
                                                                data).then ((itemUpdated) ->
                                        window.location.href = "#" + $rootScope.returnRoute
)
,
errorCallback = ->
    console.log "Oops error from server :("


$scope.abandonChanges = ->
    $location.path "/plc/" + $scope.item._id
]).
controller "PlcViewCtrl",
                        ["$rootScope", "$scope", "$location", "$routeParams", "Restangular",
                            ($rootScope, $scope, $location, $routeParams, Restangular) ->
                                Plc = Restangular.one("plcs", $routeParams.id)
                                Plc.get().then ((item) ->
                                    $scope.item = item
                                    if `undefined` isnt item.pt
                                        $scope.lng = item.pt[0]
                                        $scope.lat = item.pt[1]
                                ), errorCallback = ->
                                    console.log "Oops error from server :("

                                $scope.remove = (item) ->
                                    confirmRemove = confirm("Are you absolutely sure you want to delete?")
                                    if confirmRemove
                                        Plc = Restangular.one("plcs", item._id)
                                        Plc.remove().then (->

                                            #              return $location.path('/plcs');
                                            window.location.href = "#" + $rootScope.returnRoute
                                        ), errorCallback = ->
                                            console.log "Oops error from server :("
                                            window.location.href = "#" + $rootScope.returnRoute


                                #              return $location.path('/plc/' + $routeParams.id);
                                $scope.edit = (item) ->
                                    $location.path "/plc/" + item._id + "/edit"
                        ]
