'use strict';

llFromLatLng = (latLng) ->
    latLng.lat + ',' + latLng.lng

latLngFromLl = (ll) ->
    llSplit            = ll.split(',')
    {lat: llSplit[0], lng: llSplit[1]}

# &ll=9.993552791991132,-84.20888416469096 # SJO airport
class GMap
    constructor: (options) ->
        console.log 'GMap.constructor'
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

        @win = $(window)
##        @crossHairLatEl = $('#mapcrosshairlat')
##        @crossHairLngEl = $('#mapcrosshairlng')
        @mapEl = $("#map")
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

        @rootScope.protocol = @location.protocol()
        @rootScope.host = @location.host()
        @rootScope.mapCenter = @center
        @rootScope.mapZoom = @zoom
        @rootScope.mapType = @mapType

        #        @updateLocation
        #        @.win[0].google.maps.event.trigger(@map, 'resize')


    updateLocation: ->
        console.log 'updateLocation'
        if @location.path() == "/map"
            #            console.log '@center.lat ' + @center.lat
            #            console.log '@center.lng ' + @center.lng
            #            console.log '@mapType ' + @mapType
            #            console.log 'updatelocation before'
            console.log @location.url()
            #            console.log @location.path()
#            @location.url("map?q=#{@center.lat},#{@center.lng}&t=#{@mapType}&z=#{@zoom}")
            #            console.log 'updatelocation after'
            #            console.log @location.url()
            #            console.log @location.path()
            @rootScope.$apply()

    addPlace: =>
        console.log 'addPlace'
#        #if confirm("Add a new place?")
#        lat = @map.getCenter().lat()
#        lng = @map.getCenter().lng()
#        #console.log lat, lng
#        marker = new GMarker(@map, lat, lng)
#        # @places.create(territoryno: @preferences.get('territoryno'), point: "POINT (#{lat} #{lng})")

    onDragStart: =>
        @dragging = on

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
            console.log 'onCenterChanged & !dragging'
            @rootScope.mapCenter = @center
            @ll = llFromLatLng @center
            @routeParams.ll = @ll
#            console.log @ll
            @rootScope.$apply()

            @updateLocation()

    onZoomChange: =>
        console.log 'onZoomChange'
        @rootScope.mapZoom = @zoom = @map.getZoom()
        @routeParams.z = @zoom
        @rootScope.$apply()
        @updateLocation()

    onTypeChange: =>
        console.log 'onTypeChange'
        @mapType = @map.getMapTypeId()
#
#        switch @map.getMapTypeId()
#            when google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID
#                @polyOpts = true # @roadmapPolyOpts
#            else
#                @polyOpts = true
#        # @hybridPolyOpts
#
        @rootScope.mapType = @mapType[0]
        @routeParams.t = @mapType[0]
        @rootScope.$apply()
        @updateLocation()
#        console.log 'onTypeChange'


class GMarker
#    constructor: (@map, @lat, @lng) ->
#        @position = new google.maps.LatLng(@lat, @lng)
#        @render()

    render: ->
#        @marker = new google.maps.Marker(
#            draggable: true
#        )
#
#        google.maps.event.addListener @marker, "dragend", @dragend
#        google.maps.event.addListener @marker, "click", @click

        @show()

#    dragend: =>
#        if confirm("Are you sure you want to move this marker?")
#            # @model.set(lat:  @marker.position.lat(), lng: @marker.position.lng())
#            # @model.save()
#        else
#            # move back to original position
#            # @marker.setPosition( new google.maps.LatLng(@model.get('lat'), @model.get('lng')))

    show: =>
#        @marker.setPosition(@position)

        # title = ''
        # @marker.setTitle(title)
#        @marker.setMap(@map)

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

