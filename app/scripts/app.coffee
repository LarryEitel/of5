'use strict'

llFromLatLng = (latLng) ->
    latLng.lat + ',' + latLng.lng

latLngFromLl = (ll) ->
    llSplit            = ll.split(',')
    {lat: llSplit[0], lng: llSplit[1]}

class GPoly
    constructor: (@map, @pts, @bdyData = null) ->
        @gmaps = google.maps
        @coords = []
        for pt in pts
            @coords.push new @gmaps.LatLng(pt[0], pt[1])


        @bdy = new @gmaps.Polygon(
            paths: @coords
            strokeColor: "red"
            strokeOpacity: 0.8
            strokeWeight: 2
#            fillColor: "lightblue"
#            fillOpacity: 0.1
        )
        @bdy.setMap @map
        console.log @bdy

    render: ->
        console.log 'render'


    show: =>


    click: =>
        console.log 'mkrClick'


# &ll=9.993552791991132,-84.20888416469096 # SJO airport
class GMap
    constructor: (options) ->
#        console.log 'GMap.constructor'
        @rootScope = options.rootScope
        @dragging = 0
        @location = options.location
        @routeParams = options.routeParams
        #        @positionTracking = off

        @zoom = parseInt(@location.search().z) || options.zoom
        @mapType = @location.search().t || options.mapType
        @ll = @location.search().ll || options.ll
        if @ll
            @center = latLngFromLl @ll
        else
            @center = options.center

        #        console.log '@routeParams', @routeParams
        @routeParams.ll = @ll

        #        @navBarHeight = @rootScope.navBarHeight

#        @win = $(window)
        ##        @crossHairLatEl = $('#mapcrosshairlat')
        ##        @crossHairLngEl = $('#mapcrosshairlng')
        @mapEl = $('#map')
        @mapTypes = {m: 'roadmap', h: 'hybrid'}

#        @mapEl.hide()

        # resize mapEl div when window is initialize
        #        @resizeMapEl()

        # resize mapEl div when window is resized
        #        @win.resize @resizeMapEl
        #        $('#map-position-button').click @onPositionButtonClick
        #        $('#map-add-button').click(@addPlace)

        # this will be moved to GMarker
        #        $('#map-directions-button').click(@getDirections)

#        console.log '@mapEl', @mapEl[0]
        @map = new google.maps.Map(@mapEl[0], {
            zoom: @zoom
            center: new google.maps.LatLng(@center.lat, @center.lng)
            mapTypeId: @mapTypes[@mapType]
        })


        addListener     = google.maps.event.addListener
        addListener @map, 'center_changed', @onCenterChanged
        addListener @map, 'maptypeid_changed', @onTypeChange
        addListener @map, 'zoom_changed', @onZoomChange
        addListener @map, 'dragstart', @onDragStart
        addListener @map, 'dragend', @onDragEnd
        addListener @map, 'click', @onClick

#        @rootScope.map = @map
        @rootScope.protocol = @location.protocol()
        @rootScope.host = @location.host()
        @rootScope.mapCenter = @center
        @rootScope.mapZoom = @zoom
        @rootScope.mapTypeId = @mapTypeId

#        @updateLocation
    #        @.win[0].google.maps.event.trigger(@map, 'resize')


    onClick: (e) =>
        # if an item marker in the list is selected
        console.log 'onClick.@rootScope.selectedItemIndex', @rootScope.selectedItemIndex
        console.log 'clicked at:', e, [e.latLng.lat(), e.latLng.lng()]
        if @rootScope.selectedItemIndex > -1
            #        #if confirm('Add a new place?')
            #        lat = @map.getCenter().lat()
            #        lng = @map.getCenter().lng()
            #        #console.log lat, lng
            item = @rootScope.selectedItem
            item.pt = [e.latLng.lat(), e.latLng.lng()]

            @addPlcMkr @map, item
            data = JSON.stringify actions:
                $set:
                    flds:
                        pt: item.pt

            item.patch(item._id, data)
            @rootScope.selectedItemIndex = -1
            @rootScope.$$phase or @rootScope.$apply()


    addBdy: (map, item) =>
        console.log 'addBdy'
        new GPoly(map, item.pts, item)

    addPlcMkr: (map, item) =>
        icon = @icon(item)
        lat = item.pt[0]
        lng = item.pt[1]
        draggable = true
        itemData = {_id: item._id, id: item.id, \
            mkrNo: item.mkrNo, dNam: item.dNam, patch: item.patch}

        new GMarker(map, lat, lng, icon, draggable, itemData)

#        # @places.create(territoryno: @preferences.get('territoryno'), \
#               point: 'POINT (#{lat} #{lng})')


    removeMkrs: =>
        if @rootScope.items
            angular.forEach @rootScope.items, (v, i) ->
#                if v.hasOwnProperty('mapMkr')
                if v.mapMkr
                    # Remove from map
                    v.mapMkr.marker.setMap null
                    # delete v.mapMkr


    onDragStart: =>
        @dragging = on
        return true

    setCenter: (latLng) =>
        # new google.maps.LatLng(latLng.lat, latLng.lng)
#        @map.setCenter (new google.maps.LatLng(latLng.lat, latLng.lng))
        console.log 'setCenter', @center

    onDragEnd: =>
        @dragging = off
        @onCenterChanged()

    resizeMapEl: =>
#        @mapEl.css('height', (@win.height() - @navBarHeight))

    onCenterChanged: =>
        center                = @map.getCenter()
        @center.lat = center.lat()
        @center.lng = center.lng()
        #        @crossHairLatEl.html(@center.lat)
        #        @crossHairLngEl.html(@center.lng)

        if not @dragging
#            console.log 'onCenterChanged & !dragging'
            @rootScope.mapCenter = @center
            @ll = llFromLatLng @center
            @routeParams.ll = @ll
            @updateLocation()

    updateLocation: =>
#        console.log 'updateLocation'
        @rootScope.$$phase or @rootScope.$apply()

    onZoomChange: =>
#        console.log 'onZoomChange'
        @rootScope.mapZoom = @zoom = @map.getZoom()
        @routeParams.z = @zoom
        @updateLocation()

    onTypeChange: =>
        @mapTypeId = @map.getMapTypeId()
        #
        #        switch @map.getMapTypeId()
        #            when google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID
        #                @polyOpts = true # @roadmapPolyOpts
        #            else
        #                @polyOpts = true
        #        # @hybridPolyOpts
        #
        @rootScope.mapTypeId = @mapTypeId[0]
        @routeParams.t = @mapTypeId[0]
#        @rootScope.$apply()
        @updateLocation()
#        console.log 'onTypeChange'

#    addMarker: (lat, lng) =>
#        console.log 'addMarker', lat, lng
#        console.log 'icon', @icon()
##        #if confirm('Add a new place?')
##        lat = @map.getCenter().lat()
##        lng = @map.getCenter().lng()
##        #console.log lat, lng
#        marker = new GMarker(@map, lat, lng)
#        console.log 'marker', marker
##        # @places.create(territoryno: @preferences.get('territoryno'), \
#           point: 'POINT (#{lat} #{lng})')


class GMarker
    constructor: (@map, @lat, @lng, @icon = null, @draggable = true, @itemData = null) ->
        @gmaps = google.maps
        @position = new @gmaps.LatLng(@lat, @lng)
        @marker = new @gmaps.Marker(
            draggable: @draggable
            icon: @icon
        )

        @gmaps.event.addListener @marker, 'dragend', @dragend
        @gmaps.event.addListener @marker, 'click', @click

        @marker.setPosition(@position)
        @marker.setMap(@map)

#        @render()
#        @marker = new google.maps.Marker(
#            position: new google.maps.LatLng(@lat, @lng)
#            map: @map
#            icon: icon
#        )

    render: ->
        console.log 'render'

        @show()

    dragend: (e) =>
        data = JSON.stringify actions:
            $set:
                flds:
                    pt: [e.latLng.lat(), e.latLng.lng()]

        @itemData.patch(@itemData._id, data)

#    dragend: =>
#        if confirm('Are you sure you want to move this marker?')
#            # @model.set(lat:  @marker.position.lat(), lng: @marker.position.lng())
#            # @model.save()
#        else
#            # move back to original position
#            # @marker.setPosition( new google.maps.LatLng(@model.get('lat'), @model.get('lng')))

    show: =>
        @marker.setPosition(@position)

        # title = ''
        # @marker.setTitle(title)
        @marker.setMap(@map)

    click: =>
        console.log 'mkrClick'
        #  click: =>
        #    infoWindow = new InfoWindow()
        #
        #    # testing
        #    $('a#place-item-move.btn').live 'click', (event) ->
        #      #console.log 'event', event
        #      #event.preventDefault()
        #      console.log 'place-item-move'
        #
        #
        #    infoWindow.self.open(@map, @marker)

#
#    move: (event) =>
#        console.log 'move'
#        event.preventDefault()
#        alert 'move'


#'use strict'
angular.module 'ofApp', ['restangular', 'ngCookies', 'ui.bootstrap']

# angular.module('ofApp').constant('XCHGLAB_CONFIG', {API_KEY: 'testkey'});
#angular.module('ofApp').config(function ($routeProvider) {
#     $routeProvider
#       .when('/',
#       { templateUrl: 'views/main.html', controller: 'MainCtrl'
#       })
#       .when('/plcs', {templateUrl: 'views/plcs.html', controller: 'PlcsCtrl'})
#       .when('/plc/:id/edit', {templateUrl: 'views/plc-form.html', controller: 'PlcFormCtrl'})
#       .when('/plc/insert', {templateUrl: 'views/plc-form.html', controller: 'PlcFormCtrl'})
#       .when('/plc/:id', {templateUrl: 'views/plc-view.html', controller: 'PlcViewCtrl'})
#       .otherwise({redirectTo: '/'});
#   });
angular.module('ofApp').config ['$httpProvider', ($httpProvider) ->
    $httpProvider.defaults.headers.common.Authorization = 'Basic admin@orgtec.com:xxxxxx'
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    return $httpProvider.defaults.headers.post['Content-Type']
]
angular.module('ofApp').config ['RestangularProvider', (RestangularProvider) ->
    RestangularProvider.setBaseUrl 'http://exi.xchg.com/api'

    # RestangularProvider.setBaseUrl('http://localhost:5000/api');

    # what's this
    RestangularProvider.setListTypeIsArray false

    #        RestangularProvider.setRequestInterceptor( \
    #               function(element, operation, route, url) {
    #          if (operation === 'put') {
    #            element.actions = '{'$set':{'flds':{'lbl':'Larry'}}}';
    #            delete element.id;
    #          }
    #
    #          return element;
    #        });
    RestangularProvider.setResponseExtractor (response, operation, what) ->
        localStorage.setItem 'lsuser', JSON.stringify(response._items[0])  \
            if what is 'users' and operation is 'getList'
        response

]

#          if (operation === 'get') {
#            return response;
#          } else if (operation === 'getList') {
#            return response;
#          }
angular.module('ofApp').config ['$routeProvider', '$locationProvider', '$httpProvider',
    ($routeProvider, $locationProvider, $httpProvider) ->
        access = routingConfig.accessLevels
        $routeProvider.when '/plcs',
            templateUrl: 'views/plcs.html'
            controller: 'PlcsCtrl'
            access: access.anon

        $routeProvider.when '/plc/:id/edit',
            templateUrl: 'views/plc-form.html'
            controller: 'PlcFormCtrl'
            access: access.anon

        $routeProvider.when '/plc/insert',
            templateUrl: 'views/plc-form.html'
            controller: 'PlcFormCtrl'
            access: access.anon

        $routeProvider.when '/plc/:id',
            templateUrl: 'views/plc-view.html'
            controller: 'PlcViewCtrl'
            access: access.anon

        $routeProvider.when '/',
            templateUrl: 'views/partials/home.html'
            controller: 'HomeCtrl'
            access: access.user

        $routeProvider.when '/login',
            templateUrl: 'views/partials/login.html'
            controller: 'LoginCtrl'
            access: access.anon

        $routeProvider.when '/logout',
            templateUrl: 'views/partials/logout.html'
            controller: 'LogoutCtrl'
            access: access.user

        $routeProvider.when '/register',
            templateUrl: 'views/partials/register.html'
            controller: 'RegisterCtrl'
            access: access.anon

        $routeProvider.when '/private',
            templateUrl: '/partials/private'
            controller: 'PrivateCtrl'
            access: access.user

        $routeProvider.when '/admin',
            templateUrl: '/partials/admin'
            controller: 'AdminCtrl'
            access: access.admin

        $routeProvider.when '/404',
            templateUrl: 'views/partials/404.html'
            access: access.public

        $routeProvider.otherwise redirectTo: '/404'

        #    $locationProvider.html5Mode(true);
        interceptor = ['$location', '$q', ($location, $q) ->
            success = (response) ->
                response
            error = (response) ->
                if response.status is 401
                    $location.path '/login'
                    $q.reject response
                else
                    $q.reject response
            (promise) ->
                promise.then success, error
        ]
        $httpProvider.responseInterceptors.push interceptor
]

llFromLatLng = (latLng) ->
    latLng.lat + ',' + latLng.lng

latLngFromLl = (ll) ->
    llSplit            = ll.split(',')
    {lat: llSplit[0], lng: llSplit[1]}

angular.module('ofApp')
    .factory 'GoogleMap', ['$rootScope', '$location', '$routeParams', \
            ($rootScope, $location, $routeParams) ->
        SJO                     = {lat: 9.993552791991132, lng: -84.20888416469096}
        BSBR                     = {lat: 9.971365509675179, lng: -84.16658163070679}
        initPosition            = BSBR
        initZoom                = 16

        mapOptions =
            rootScope: $rootScope
            location: $location
            routeParams: $routeParams
            zoom: initZoom
            mapType: 'h'
    #            ll: initPosition.lat + ',' + initPosition.lng
            ll: llFromLatLng initPosition
            center:
                lat: initPosition.lat
                lng: initPosition.lng

        x = 0
        return new GMap(mapOptions)
    ]

angular.module('ofApp')
    .run ($rootScope, $location, Auth) ->
        $rootScope.$on '$routeChangeStart', (event, next, current) ->

            $rootScope.error = null

            #          console.log($location.$$url);
            #          $location.path($location.$$url);
            #        } else {
            $location.path '/login'  \
                unless Auth.isLoggedIn()  \
                unless Auth.authorize(next.access)

        $rootScope.appInitialized = true
