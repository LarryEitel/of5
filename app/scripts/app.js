// Generated by CoffeeScript 1.6.2
(function() {
  'use strict';
  var GMap, GMarker, latLngFromLl, llFromLatLng,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  llFromLatLng = function(latLng) {
    return latLng.lat + ',' + latLng.lng;
  };

  latLngFromLl = function(ll) {
    var llSplit;

    llSplit = ll.split(',');
    return {
      lat: llSplit[0],
      lng: llSplit[1]
    };
  };

  GMap = (function() {
    function GMap(options) {
      this.addMarker = __bind(this.addMarker, this);
      this.onTypeChange = __bind(this.onTypeChange, this);
      this.onZoomChange = __bind(this.onZoomChange, this);
      this.updateLocation = __bind(this.updateLocation, this);
      this.onCenterChanged = __bind(this.onCenterChanged, this);
      this.resizeMapEl = __bind(this.resizeMapEl, this);
      this.onDragEnd = __bind(this.onDragEnd, this);
      this.setCenter = __bind(this.setCenter, this);
      this.onDragStart = __bind(this.onDragStart, this);
      this.addPlcMkr = __bind(this.addPlcMkr, this);
      this.onClick = __bind(this.onClick, this);
      var addListener;

      this.rootScope = options.rootScope;
      this.dragging = 0;
      this.location = options.location;
      this.routeParams = options.routeParams;
      this.zoom = parseInt(this.location.search().z) || options.zoom;
      this.mapType = this.location.search().t || options.mapType;
      this.ll = this.location.search().ll || options.ll;
      if (this.ll) {
        this.center = latLngFromLl(this.ll);
      } else {
        this.center = options.center;
      }
      this.routeParams.ll = this.ll;
      this.mapEl = $("#map");
      this.mapTypes = {
        m: 'roadmap',
        h: 'hybrid'
      };
      this.map = new google.maps.Map(this.mapEl[0], {
        zoom: this.zoom,
        center: new google.maps.LatLng(this.center.lat, this.center.lng),
        mapTypeId: this.mapTypes[this.mapType]
      });
      addListener = google.maps.event.addListener;
      addListener(this.map, 'center_changed', this.onCenterChanged);
      addListener(this.map, 'maptypeid_changed', this.onTypeChange);
      addListener(this.map, 'zoom_changed', this.onZoomChange);
      addListener(this.map, 'dragstart', this.onDragStart);
      addListener(this.map, 'dragend', this.onDragEnd);
      addListener(this.map, 'click', this.onClick);
      this.rootScope.protocol = this.location.protocol();
      this.rootScope.host = this.location.host();
      this.rootScope.mapCenter = this.center;
      this.rootScope.mapZoom = this.zoom;
      this.rootScope.mapTypeId = this.mapTypeId;
    }

    GMap.prototype.onClick = function(e) {
      console.log('onClick', e);
      if (this.rootScope.selectedItemIndex > -1) {
        return this.addPlcMkr(e.latLng.lat(), e.latLng.lng());
      }
    };

    GMap.prototype.addPlcMkr = function(lat, lng) {
      var icon, marker;

      icon = this.icon(this.rootScope.selectedItem);
      marker = new GMarker(this.map, lat, lng, icon);
      this.rootScope.selectedItem.pt = [lat, lng];
      this.rootScope.selectedItemIndex = -1;
      this.rootScope.$$phase || this.rootScope.$apply();
      console.log('@rootScope.selectedItem', this.rootScope.selectedItem);
      return console.log('marker', marker);
    };

    GMap.prototype.onDragStart = function() {
      return this.dragging = true;
    };

    GMap.prototype.setCenter = function(latLng) {
      console.log('center before', this.center);
      return console.log('center after', this.center);
    };

    GMap.prototype.onDragEnd = function() {
      this.dragging = false;
      return this.onCenterChanged();
    };

    GMap.prototype.resizeMapEl = function() {};

    GMap.prototype.onCenterChanged = function() {
      var center;

      center = this.map.getCenter();
      this.center.lat = center.lat();
      this.center.lng = center.lng();
      if (!this.dragging) {
        this.rootScope.mapCenter = this.center;
        this.ll = llFromLatLng(this.center);
        this.routeParams.ll = this.ll;
        return this.updateLocation();
      }
    };

    GMap.prototype.updateLocation = function() {
      return this.rootScope.$$phase || this.rootScope.$apply();
    };

    GMap.prototype.onZoomChange = function() {
      this.rootScope.mapZoom = this.zoom = this.map.getZoom();
      this.routeParams.z = this.zoom;
      return this.updateLocation();
    };

    GMap.prototype.onTypeChange = function() {
      console.log('onTypeChange');
      this.mapTypeId = this.map.getMapTypeId();
      this.rootScope.mapTypeId = this.mapTypeId[0];
      this.routeParams.t = this.mapTypeId[0];
      return this.updateLocation();
    };

    GMap.prototype.addMarker = function(lat, lng) {
      var marker;

      console.log('addMarker', lat, lng);
      console.log('icon', this.icon());
      marker = new GMarker(this.map, lat, lng);
      return console.log('marker', marker);
    };

    return GMap;

  })();

  GMarker = (function() {
    function GMarker(map, lat, lng, icon, draggable) {
      this.map = map;
      this.lat = lat;
      this.lng = lng;
      this.icon = icon != null ? icon : null;
      this.draggable = draggable != null ? draggable : true;
      this.click = __bind(this.click, this);
      this.show = __bind(this.show, this);
      this.dragend = __bind(this.dragend, this);
      this.position = new google.maps.LatLng(this.lat, this.lng);
      this.render();
      this.render();
    }

    GMarker.prototype.render = function() {
      this.marker = new google.maps.Marker({
        draggable: this.draggable,
        icon: this.icon
      });
      google.maps.event.addListener(this.marker, "dragend", this.dragend);
      google.maps.event.addListener(this.marker, "click", this.click);
      return this.show();
    };

    GMarker.prototype.dragend = function() {
      return console.log('dragend');
    };

    GMarker.prototype.show = function() {
      this.marker.setPosition(this.position);
      return this.marker.setMap(this.map);
    };

    GMarker.prototype.click = function() {
      return console.log('mkrClick');
    };

    return GMarker;

  })();

  angular.module("ofApp", ["restangular", "ngCookies", "ui.bootstrap"]);

  angular.module("ofApp").config([
    "$httpProvider", function($httpProvider) {
      $httpProvider.defaults.headers.common.Authorization = "Basic admin@orgtec.com:xxxxxx";
      return $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    }
  ]);

  angular.module("ofApp").config([
    "RestangularProvider", function(RestangularProvider) {
      RestangularProvider.setBaseUrl("http://exi.xchg.com/api");
      RestangularProvider.setListTypeIsArray(false);
      return RestangularProvider.setResponseExtractor(function(response, operation, what) {
        if (what === "users" && operation === "getList") {
          localStorage.setItem("lsuser", JSON.stringify(response._items[0]));
        }
        return response;
      });
    }
  ]);

  angular.module("ofApp").config([
    "$routeProvider", "$locationProvider", "$httpProvider", function($routeProvider, $locationProvider, $httpProvider) {
      var access, interceptor;

      access = routingConfig.accessLevels;
      $routeProvider.when("/plcs", {
        templateUrl: "views/plcs.html",
        controller: "PlcsCtrl",
        access: access.anon
      });
      $routeProvider.when("/plc/:id/edit", {
        templateUrl: "views/plc-form.html",
        controller: "PlcFormCtrl",
        access: access.anon
      });
      $routeProvider.when("/plc/insert", {
        templateUrl: "views/plc-form.html",
        controller: "PlcFormCtrl",
        access: access.anon
      });
      $routeProvider.when("/plc/:id", {
        templateUrl: "views/plc-view.html",
        controller: "PlcViewCtrl",
        access: access.anon
      });
      $routeProvider.when("/", {
        templateUrl: "views/partials/home.html",
        controller: "HomeCtrl",
        access: access.user
      });
      $routeProvider.when("/login", {
        templateUrl: "views/partials/login.html",
        controller: "LoginCtrl",
        access: access.anon
      });
      $routeProvider.when("/logout", {
        templateUrl: "views/partials/logout.html",
        controller: "LogoutCtrl",
        access: access.user
      });
      $routeProvider.when("/register", {
        templateUrl: "views/partials/register.html",
        controller: "RegisterCtrl",
        access: access.anon
      });
      $routeProvider.when("/private", {
        templateUrl: "/partials/private",
        controller: "PrivateCtrl",
        access: access.user
      });
      $routeProvider.when("/admin", {
        templateUrl: "/partials/admin",
        controller: "AdminCtrl",
        access: access.admin
      });
      $routeProvider.when("/404", {
        templateUrl: "views/partials/404.html",
        access: access["public"]
      });
      $routeProvider.otherwise({
        redirectTo: "/404"
      });
      interceptor = [
        "$location", "$q", function($location, $q) {
          var error, success;

          success = function(response) {
            return response;
          };
          error = function(response) {
            if (response.status === 401) {
              $location.path("/login");
              return $q.reject(response);
            } else {
              return $q.reject(response);
            }
          };
          return function(promise) {
            return promise.then(success, error);
          };
        }
      ];
      return $httpProvider.responseInterceptors.push(interceptor);
    }
  ]);

  llFromLatLng = function(latLng) {
    return latLng.lat + ',' + latLng.lng;
  };

  latLngFromLl = function(ll) {
    var llSplit;

    llSplit = ll.split(',');
    return {
      lat: llSplit[0],
      lng: llSplit[1]
    };
  };

  angular.module("ofApp").factory("GoogleMap", [
    '$rootScope', '$location', '$routeParams', function($rootScope, $location, $routeParams) {
      var SJO, initPosition, initZoom, mapOptions, x;

      SJO = {
        lat: 9.993552791991132,
        lng: -84.20888416469096
      };
      initPosition = SJO;
      initZoom = 16;
      mapOptions = {
        rootScope: $rootScope,
        location: $location,
        routeParams: $routeParams,
        zoom: initZoom,
        mapType: 'm',
        ll: llFromLatLng(initPosition),
        center: {
          lat: initPosition.lat,
          lng: initPosition.lng
        }
      };
      x = 0;
      return new GMap(mapOptions);
    }
  ]);

  angular.module("ofApp").run(function($rootScope, $location, Auth) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      $rootScope.error = null;
      if (!(!Auth.authorize(next.access) ? Auth.isLoggedIn() : void 0)) {
        return $location.path("/login");
      }
    });
    return $rootScope.appInitialized = true;
  });

}).call(this);
