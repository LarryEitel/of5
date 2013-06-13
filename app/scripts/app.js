// Generated by CoffeeScript 1.6.2
(function() {
  'use strict';
  var GMap, GMarker, GPoly, latLngFromLl, llFromLatLng,
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

  GPoly = (function() {
    GPoly.prototype.defaultOptions = {
      normal: {
        fillColor: 'blue',
        fillOpacity: 0,
        strokeColor: 'blue',
        strokeOpacity: .8,
        strokeWeight: 2
      },
      hover: {
        fillOpacity: .1,
        strokeWeight: 3
      }
    };

    GPoly.prototype.typOptions = {
      cong: {
        roadmap: {
          zIndex: 4,
          fillColor: 'black',
          fillOpacity: 0,
          strokeColor: 'black',
          strokeOpacity: .8,
          strokeWeight: 3
        },
        hybrid: {
          zIndex: 100,
          fillColor: 'white',
          fillOpacity: 0,
          strokeColor: 'white',
          strokeOpacity: .8,
          strokeWeight: 4
        },
        hover: {
          fillOpacity: .1,
          strokeWeight: 3
        }
      },
      congArea: {
        roadmap: {
          zIndex: 3,
          fillColor: 'red',
          fillOpacity: 0,
          strokeColor: 'red',
          strokeOpacity: .8,
          strokeWeight: 2
        },
        hybrid: {
          zIndex: 103,
          fillColor: 'red',
          fillOpacity: 0,
          strokeColor: 'red',
          strokeOpacity: .8,
          strokeWeight: 3
        },
        hover: {
          fillOpacity: .1,
          strokeWeight: 4
        }
      },
      congAreaResidentialTerr: {
        roadmap: {
          zIndex: 0,
          fillColor: 'blue',
          fillOpacity: 0,
          strokeColor: 'blue',
          strokeOpacity: .8,
          strokeWeight: 2
        },
        hybrid: {
          zIndex: 106,
          fillColor: 'blue',
          fillOpacity: 0,
          strokeColor: 'blue',
          strokeOpacity: .8,
          strokeWeight: 2
        },
        hover: {
          fillOpacity: .1,
          strokeWeight: 3
        }
      }
    };

    function GPoly(map, pts, bdyData) {
      var mapTypeId, pt, _i, _len, _ref;

      this.map = map;
      this.pts = pts;
      this.bdyData = bdyData;
      this.click = __bind(this.click, this);
      this.show = __bind(this.show, this);
      this.gmaps = google.maps;
      this.coords = [];
      for (_i = 0, _len = pts.length; _i < _len; _i++) {
        pt = pts[_i];
        this.coords.push(new this.gmaps.LatLng(pt[0], pt[1]));
      }
      this.bdy = new this.gmaps.Polygon({
        paths: this.coords,
        strokeColor: "red",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0,
        clickable: false
      });
      mapTypeId = this.map.mapTypeId || 'hybrid';
      if ((_ref = this.bdyData.typ) === "cong" || _ref === "congArea" || _ref === "congAreaResidentialTerr") {
        this.bdy.setOptions(this.typOptions[this.bdyData.typ][mapTypeId]);
      }
      this.bdy.setMap(this.map);
    }

    GPoly.prototype.render = function() {
      return console.log('render');
    };

    GPoly.prototype.show = function() {};

    GPoly.prototype.click = function() {
      return console.log('mkrClick');
    };

    return GPoly;

  })();

  GMap = (function() {
    function GMap(options) {
      this.onTypeChange = __bind(this.onTypeChange, this);
      this.onZoomChange = __bind(this.onZoomChange, this);
      this.updateLocation = __bind(this.updateLocation, this);
      this.onCenterChanged = __bind(this.onCenterChanged, this);
      this.resizeMapEl = __bind(this.resizeMapEl, this);
      this.onDragEnd = __bind(this.onDragEnd, this);
      this.setCenter = __bind(this.setCenter, this);
      this.onDragStart = __bind(this.onDragStart, this);
      this.removeMkrs = __bind(this.removeMkrs, this);
      this.addPlcMkr = __bind(this.addPlcMkr, this);
      this.addBdy = __bind(this.addBdy, this);
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
      this.mapEl = $('#map');
      this.mapTypes = {
        m: 'roadmap',
        h: 'hybrid'
      };
      this.map = new google.maps.Map(this.mapEl[0], {
        zoom: this.zoom,
        visualRefresh: true,
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
      var data, item;

      console.log('onClick.@rootScope.selectedItemIndex', this.rootScope.selectedItemIndex);
      console.log('clicked at:', e, [e.latLng.lat(), e.latLng.lng()]);
      if (this.rootScope.selectedItemIndex > -1) {
        item = this.rootScope.selectedItem;
        item.pt = [e.latLng.lat(), e.latLng.lng()];
        this.addPlcMkr(this.map, item);
        data = JSON.stringify({
          actions: {
            $set: {
              flds: {
                pt: item.pt
              }
            }
          }
        });
        item.patch(item._id, data);
        this.rootScope.selectedItemIndex = -1;
        return this.rootScope.$$phase || this.rootScope.$apply();
      }
    };

    GMap.prototype.addBdy = function(map, item) {
      return new GPoly(map, item.pts, item);
    };

    GMap.prototype.addPlcMkr = function(map, item) {
      var draggable, icon, itemData, lat, lng;

      icon = this.icon(item);
      lat = item.pt[0];
      lng = item.pt[1];
      draggable = true;
      itemData = {
        _id: item._id,
        id: item.id,
        mkrNo: item.mkrNo,
        dNam: item.dNam,
        patch: item.patch
      };
      return new GMarker(map, lat, lng, icon, draggable, itemData);
    };

    GMap.prototype.removeMkrs = function() {
      if (this.rootScope.items) {
        return angular.forEach(this.rootScope.items, function(v, i) {
          if (v.mapMkr) {
            return v.mapMkr.marker.setMap(null);
          }
        });
      }
    };

    GMap.prototype.onDragStart = function() {
      this.dragging = true;
      return true;
    };

    GMap.prototype.setCenter = function(latLng) {
      return console.log('setCenter', this.center);
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
      this.mapTypeId = this.map.getMapTypeId();
      this.rootScope.mapTypeId = this.mapTypeId[0];
      this.routeParams.t = this.mapTypeId[0];
      return this.updateLocation();
    };

    return GMap;

  })();

  GMarker = (function() {
    function GMarker(map, lat, lng, icon, draggable, itemData) {
      this.map = map;
      this.lat = lat;
      this.lng = lng;
      this.icon = icon != null ? icon : null;
      this.draggable = draggable != null ? draggable : true;
      this.itemData = itemData != null ? itemData : null;
      this.click = __bind(this.click, this);
      this.show = __bind(this.show, this);
      this.dragend = __bind(this.dragend, this);
      this.gmaps = google.maps;
      this.position = new this.gmaps.LatLng(this.lat, this.lng);
      this.marker = new this.gmaps.Marker({
        draggable: this.draggable,
        icon: this.icon
      });
      this.gmaps.event.addListener(this.marker, 'dragend', this.dragend);
      this.gmaps.event.addListener(this.marker, 'click', this.click);
      this.marker.setPosition(this.position);
      this.marker.setMap(this.map);
    }

    GMarker.prototype.render = function() {
      console.log('render');
      return this.show();
    };

    GMarker.prototype.dragend = function(e) {
      var data;

      if (confirm('Are you sure you want to move this marker?')) {
        data = JSON.stringify({
          actions: {
            $set: {
              flds: {
                pt: [e.latLng.lat(), e.latLng.lng()]
              }
            }
          }
        });
        return this.itemData.patch(this.itemData._id, data);
      } else {
        return this.marker.setPosition(this.position);
      }
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

  angular.module('ofApp', ['restangular', 'ngCookies', 'ui.bootstrap']);

  angular.module('ofApp').config([
    '$httpProvider', function($httpProvider) {
      $httpProvider.defaults.headers.common.Authorization = 'Basic admin@orgtec.com:xxxxxx';
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      return $httpProvider.defaults.headers.post['Content-Type'];
    }
  ]);

  angular.module('ofApp').config([
    'RestangularProvider', function(RestangularProvider) {
      RestangularProvider.setBaseUrl('http://exi.xchg.com/api');
      RestangularProvider.setListTypeIsArray(false);
      return RestangularProvider.setResponseExtractor(function(response, operation, what) {
        if (what === 'users' && operation === 'getList') {
          localStorage.setItem('lsuser', JSON.stringify(response._items[0]));
        }
        return response;
      });
    }
  ]);

  angular.module('ofApp').config([
    '$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
      var access, interceptor;

      access = routingConfig.accessLevels;
      $routeProvider.when('/plcs', {
        templateUrl: 'views/plcs.html',
        controller: 'PlcsCtrl',
        access: access.anon
      });
      $routeProvider.when('/plc/:id/edit', {
        templateUrl: 'views/plc-form.html',
        controller: 'PlcFormCtrl',
        access: access.anon
      });
      $routeProvider.when('/plc/insert', {
        templateUrl: 'views/plc-form.html',
        controller: 'PlcFormCtrl',
        access: access.anon
      });
      $routeProvider.when('/plc/:id', {
        templateUrl: 'views/plc-view.html',
        controller: 'PlcViewCtrl',
        access: access.anon
      });
      $routeProvider.when('/', {
        templateUrl: 'views/partials/home.html',
        controller: 'HomeCtrl',
        access: access.user
      });
      $routeProvider.when('/login', {
        templateUrl: 'views/partials/login.html',
        controller: 'LoginCtrl',
        access: access.anon
      });
      $routeProvider.when('/logout', {
        templateUrl: 'views/partials/logout.html',
        controller: 'LogoutCtrl',
        access: access.user
      });
      $routeProvider.when('/register', {
        templateUrl: 'views/partials/register.html',
        controller: 'RegisterCtrl',
        access: access.anon
      });
      $routeProvider.when('/private', {
        templateUrl: '/partials/private',
        controller: 'PrivateCtrl',
        access: access.user
      });
      $routeProvider.when('/admin', {
        templateUrl: '/partials/admin',
        controller: 'AdminCtrl',
        access: access.admin
      });
      $routeProvider.when('/404', {
        templateUrl: 'views/partials/404.html',
        access: access["public"]
      });
      $routeProvider.otherwise({
        redirectTo: '/404'
      });
      interceptor = [
        '$location', '$q', function($location, $q) {
          var error, success;

          success = function(response) {
            return response;
          };
          error = function(response) {
            if (response.status === 401) {
              $location.path('/login');
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

  angular.module('ofApp').factory('GoogleMap', [
    '$rootScope', '$location', '$routeParams', function($rootScope, $location, $routeParams) {
      var BSBR, SJO, initPosition, initZoom, mapOptions;

      SJO = {
        lat: 9.993552791991132,
        lng: -84.20888416469096
      };
      BSBR = {
        lat: 9.971365509675179,
        lng: -84.16658163070679
      };
      initPosition = BSBR;
      initZoom = 16;
      mapOptions = {
        rootScope: $rootScope,
        location: $location,
        routeParams: $routeParams,
        zoom: initZoom,
        mapType: 'h',
        ll: llFromLatLng(initPosition),
        center: {
          lat: initPosition.lat,
          lng: initPosition.lng
        }
      };
      return new GMap(mapOptions);
    }
  ]);

  angular.module('ofApp').run(function($rootScope, $location, $routeParams, Auth) {
    $rootScope.currBdy = {};
    $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
      $rootScope.currPath = $location.$$path;
      return $rootScope.title = $location.$$search.title;
    });
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      $rootScope.error = null;
      if (!(!Auth.authorize(next.access) ? Auth.isLoggedIn() : void 0)) {
        return $location.path('/login');
      }
    });
    return $rootScope.appInitialized = true;
  });

}).call(this);
