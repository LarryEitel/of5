"use strict";(function(e){e.userRoles={"public":1,user:2,admin:4},e.accessLevels={"public":7,anon:1,user:6,admin:4}})("undefined"==typeof exports?this.routingConfig={}:exports),angular.module("ofApp",["restangular","ngCookies","ui.bootstrap","google-maps"]),angular.module("ofApp").config(["$httpProvider",function(e){e.defaults.headers.common.Authorization="Basic admin@orgtec.com:xxxxxx",e.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"}]),angular.module("ofApp").config(["RestangularProvider",function(e){e.setBaseUrl("http://exi.xchg.com/api"),e.setListTypeIsArray(!1),e.setResponseExtractor(function(e,t,o){return"users"===o&&"getList"===t&&localStorage.setItem("lsuser",JSON.stringify(e._items[0])),e})}]),angular.module("ofApp").config(["$routeProvider","$locationProvider","$httpProvider",function(e,t,o){var n=routingConfig.accessLevels;e.when("/plcs",{templateUrl:"views/plcs.html",controller:"PlcsCtrl",access:n.anon}),e.when("/plc/:id/edit",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl",access:n.anon}),e.when("/plc/insert",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl",access:n.anon}),e.when("/plc/:id",{templateUrl:"views/plc-view.html",controller:"PlcViewCtrl",access:n.anon}),e.when("/",{templateUrl:"views/partials/home.html",controller:"HomeCtrl",access:n.user}),e.when("/login",{templateUrl:"views/partials/login.html",controller:"LoginCtrl",access:n.anon}),e.when("/logout",{templateUrl:"views/partials/logout.html",controller:"LogoutCtrl",access:n.user}),e.when("/register",{templateUrl:"views/partials/register.html",controller:"RegisterCtrl",access:n.anon}),e.when("/private",{templateUrl:"/partials/private",controller:"PrivateCtrl",access:n.user}),e.when("/admin",{templateUrl:"/partials/admin",controller:"AdminCtrl",access:n.admin}),e.when("/404",{templateUrl:"views/partials/404.html",access:n.public}),e.otherwise({redirectTo:"/404"});var r=["$location","$q",function(e,t){function o(e){return e}function n(o){return 401===o.status?(e.path("/login"),t.reject(o)):t.reject(o)}return function(e){return e.then(o,n)}}];o.responseInterceptors.push(r)}]),angular.module("ofApp").run(["$rootScope","$location","Auth",function(e,t,o){e.$on("$routeChangeStart",function(n,r){e.error=null,o.authorize(r.access)||o.isLoggedIn()||t.path("/login")}),e.appInitialized=!0}]),angular.module("ofApp").factory("Auth",["Restangular","$http","$rootScope","$cookieStore",function(e,t,o){var n=routingConfig.accessLevels,r=routingConfig.userRoles;return localStorage.getItem("lsuser")&&(o.user=JSON.parse(localStorage.getItem("lsuser"))),o.accessLevels=n,o.userRoles=r,{authorize:function(e,t){return void 0!==t?!0:!1},isLoggedIn:function(e){return void 0===e?e=o.user:void 0},register:function(e,o,n){t.post("/register",e).success(o).error(n)},login:function(t,n){var r=e.all("users");r.getList({where:JSON.stringify({uNam:t.username})}).then(function(e){e._items.length&&(t=e._items[0],o.user=t,n(t))},function(){$location.path("/")},function(){o.error="Failed to login"})},logout:function(e,n){t.post("/logout").success(function(){o.user.uNam="",e()}).error(n)},accessLevels:n,userRoles:r}}]),angular.module("ofApp").controller("AppCtrl",["$rootScope","$scope","$location","Auth",function(e,t,o,n){t.getUserRoleText=function(e){return _.invert(n.userRoles)[e]},t.logout=function(){n.logout(function(){o.path("/login")},function(){e.error="Failed to logout"})}}]),angular.module("ofApp").controller("LoginCtrl",["$rootScope","$scope","$location","Auth",function(e,t,o,n){e.activeNavItem="login",t.rememberme=!0,t.login=function(){localStorage.removeItem("lsuser"),n.login({username:t.username,password:t.password,rememberme:t.rememberme},function(){o.path("/")},function(){e.error="Failed to login"})}}]),angular.module("ofApp").controller("LogoutCtrl",["$rootScope","$location",function(e,t){localStorage.removeItem("lsuser"),delete e.user,t.path("/")}]),angular.module("ofApp").controller("HomeCtrl",["$rootScope",function(e){e.activeNavItem="home"}]),angular.module("ofApp").controller("RegisterCtrl",["$rootScope","$scope","$location","Auth",function(e,t,o,n){e.activeNavItem="register",t.role=routingConfig.userRoles.user,t.register=function(){n.register({username:t.username,password:t.password,role:t.role},function(t){e.user=t,o.path("/")},function(t){e.error=t})}}]),angular.module("ofApp").controller("PrivateCtrl",["$rootScope",function(e){e.activeNavItem="private"}]),angular.module("ofApp").controller("AdminCtrl",["$rootScope","$scope","Users",function(e,t,o){e.activeNavItem="admin",t.loading=!0,o.getAll(function(e){t.users=e,t.loading=!1},function(){e.error="Failed to fetch users.",t.loading=!1})}]),angular.module("ofApp").directive("accessLevel",["$rootScope","Auth",function(e,t){return{restrict:"A",link:function(o,n,r){var l=n.css("display");e.$watch("user.role",function(){t.authorize(r.accessLevel)?n.css("display",l):n.css("display","none")})}}}]).directive("autoFillableField",function(){return{restrict:"A",require:"?ngModel",link:function(e,t,o,n){setInterval(function(){""===t.val()&&n.$pristine||e.$apply(function(){n.$setViewValue(t.val())})},300)}}}),function(){function e(e,t){return 1e-6>Math.abs(e-t)}var t=function(){function t(t){var n=null,r=[],l=[],a=[],i=angular.extend({},o,t),s=this,c=null;this.center=t.center,this.zoom=i.zoom,this.draggable=i.draggable,this.dragging=!1,this.selector=i.container,this.markers=[],this.options=i.options,this.draw=function(){if(null!==s.center)if(null===n)n=new google.maps.Map(s.selector,angular.extend(s.options,{center:s.center,zoom:s.zoom,draggable:s.draggable,mapTypeId:google.maps.MapTypeId.HYBRID})),google.maps.event.addListener(n,"dragstart",function(){s.dragging=!0}),google.maps.event.addListener(n,"idle",function(){s.dragging=!1}),google.maps.event.addListener(n,"drag",function(){s.dragging=!0}),google.maps.event.addListener(n,"zoom_changed",function(){console.log("zoom_chaged"),s.zoom=n.getZoom(),s.z=s.zoom,s.center=n.getCenter()}),google.maps.event.addListener(n,"center_changed",function(){s.center=n.getCenter()}),l.length&&angular.forEach(l,function(e){google.maps.event.addListener(n,e.on,e.handler)});else{google.maps.event.trigger(n,"resize");var t=n.getCenter();e(t.lat(),s.center.lat())&&e(t.lng(),s.center.lng())||n.setCenter(s.center),n.getZoom()!==s.zoom&&n.setZoom(s.zoom)}},this.fit=function(){if(n&&r.length){var e=new google.maps.LatLngBounds;angular.forEach(r,function(t){e.extend(t.getPosition())}),n.fitBounds(e)}},this.on=function(e,t){l.push({on:e,handler:t})},this.addMarker=function(e,t,o,l,a,i,u,g,d,p,m){if(null===s.findMarker(e,t)){void 0===a&&(a=0);var f,v,h,w,$,k="img/map/sprites/";10>l?(h=k+"sprite_1.png",v=12,w=(l-1)*v,$=a*f):100>l?(h=k+"sprite_2.png",v=16,w=(l-10)*v,$=a*f):(h=k+"sprite_3.png",v=20,w=(l-100)*v,$=a*f),$&&($+=1),l&&void 0!==a&&(o=new google.maps.MarkerImage(h,new google.maps.Size(v,12),new google.maps.Point(w,$),new google.maps.Point(0,0)));var y=new google.maps.Marker({position:new google.maps.LatLng(e,t),map:n,draggable:p,icon:o});if(null!==i){var I=new google.maps.InfoWindow({content:i});google.maps.event.addListener(y,"click",function(){null!==c&&c.close(),I.open(n,y),c=I}),google.maps.event.addListener(y,"dragend",function(e){console.log("marker.dragend");var t=s.findMarkerIndex(e.latLng.lat(),e.latLng.lng());s.markers[t].dat.mkrUpdate(e,s.markers[t]),console.log("that.markers[mkrIdx]",s.markers[t]),console.log("mkrIdx",t),console.log("mkr",r[t])})}return r.unshift(y),s.markers.unshift({lat:e,lng:t,mkrNo:l,mkrState:a,draggable:!1,icon:o,infoWindowContent:i,label:u,url:g,dat:m,thumbnail:d}),y}},this.findMarker=function(t,o){for(var n=0;r.length>n;n++){var l=r[n].getPosition();if(e(l.lat(),t)&&e(l.lng(),o))return r[n]}return null},this.findMarkerIndex=function(t,o){for(var n=0;r.length>n;n++){var l=r[n].getPosition();if(e(l.lat(),t)&&e(l.lng(),o))return n}return-1},this.addInfoWindow=function(e,t,o){var n=new google.maps.InfoWindow({content:o,position:new google.maps.LatLng(e,t)});return a.push(n),n},this.hasMarker=function(e,t){return null!==s.findMarker(e,t)},this.getMarkerInstances=function(){return r},this.removeMarkers=function(e){var t=this;angular.forEach(e,function(e){var o=e.getPosition(),n=o.lat(),l=o.lng(),a=t.findMarkerIndex(n,l);r.splice(a,1),t.markers.splice(a,1),e.setMap(null)})}}var o={zoom:8,draggable:!1,container:null};return t}(),o=angular.module("google-maps",[]);o.directive("googleMap",["$rootScope","$location","$log","$timeout","$filter","Restangular",function(o,n,r,l,a,i){var s=function(e,t,o){var n=o.map;e.map=o.map,self.addInfoWindow=function(e,t,o){n.addInfoWindow(e,t,o)}};return s.$inject=["$location","$scope","$element"],{restrict:"ECA",priority:100,transclude:!0,template:'<div class="angular-google-map" ng-transclude></div>',replace:!1,scope:{center:"=center",markers:"=markers",latitude:"=latitude",longitude:"=longitude",zoom:"=zoom",refresh:"&refresh",windows:"=windows",events:"=events"},controller:s,link:function(o,n,a){if(!angular.isDefined(o.center)||!angular.isDefined(o.center.latitude)||!angular.isDefined(o.center.longitude))return r.error("angular-google-maps: could not find a valid center property"),void 0;if(!angular.isDefined(o.zoom))return r.error("angular-google-maps: map zoom property not set"),void 0;angular.element(n).addClass("angular-google-map");var s={options:{}};a.options&&(s.options=angular.fromJson(a.options));var c=o.center.latitude,u=o.center.longitude;if(console.log("map center",o.center.latitude,o.center.longitude),void 0!==o.ll){console.log("map center. ll",o.ll);var g=o.ll.split(",");console.log("ll",g),console.log("ll",g)}var d=new t(angular.extend(s,{container:n[0],center:new google.maps.LatLng(c,u),draggable:"true"===a.draggable,ll:o.ll,z:o.z,zoom:o.zoom}));if(d.on("drag",function(){var e=d.center;l(function(){o.$apply(function(){o.center.latitude=e.lat(),o.center.longitude=e.lng()})})}),d.on("zoom_changed",function(){o.zoom!==d.zoom&&l(function(){o.$apply(function(){o.zoom=d.zoom,o.z=d.z})})}),d.on("center_changed",function(){var e=d.center;l(function(){o.$apply(function(){d.dragging||(o.center.latitude=e.lat(),o.center.longitude=e.lng())})})}),angular.isDefined(o.events))for(var p in o.events)o.events.hasOwnProperty(p)&&angular.isFunction(o.events[p])&&d.on(p,function(){o.events[p].apply(o,[d,p,arguments])});"true"===a.markClick&&function(){var e=null;d.on("click",function(t){if(null===e){if(e={latitude:t.latLng.lat(),longitude:t.latLng.lng()},void 0!==o.$parent.selectedItemIndex){var n=o.$parent.items[o.$parent.selectedItemIndex];if(void 0===n.pt){e.mkrNo=n.mkrNo,e.mkrState=n.mkrState||0,n.pt=[e.latitude,e.longitude],o.markers.push(e),d.addMarker(e.latitude,e.longitude,void 0,e.mkrNo,e.mkrState,void 0,void 0,void 0,void 0,!0);var r=i.one("plcs",n._id),a=JSON.stringify({actions:{$set:{flds:{pt:n.pt}}}});r.customPUT(void 0,void 0,void 0,a).then(function(){console.log("success!")},function(){console.log("Oops error from server :(")})}}l(function(){e&&(o.latitude=e.latitude,o.longitude=e.longitude),o.$apply()})}e=null})}(),o.map=d,angular.isUndefined(o.refresh())?d.draw():o.$watch("refresh()",function(e,t){e&&!t&&d.draw()}),o.$watch("markers",function(t){l(function(){angular.forEach(t,function(e){d.hasMarker(e.latitude,e.longitude,e.draggable)||d.addMarker(e.latitude,e.longitude,e.icon,e.mkrNo,e.mkrState,e.infoWindow,e.label,e.url,e.thumbnail,e.draggable,e.dat)});var n=[];angular.forEach(d.getMarkerInstances(),function(t){for(var r=t.getPosition(),l=r.lat(),a=r.lng(),i=!1,s=0;o.markers.length>s;s++){var c=o.markers[s];e(c.latitude,l)&&e(c.longitude,a)&&(i=!0)}i||n.push(t)}),"true"===a.fit&&t&&t.length>1&&d.fit()})},!0),o.$watch("center",function(e,t){e!==t&&(d.dragging||(d.center=new google.maps.LatLng(e.latitude,e.longitude),d.draw()))},!0),o.$watch("z",function(e,t){e!==t&&(d.z=e,d.draw())})}}}])}(),angular.module("ofApp").controller("MainCtrl",["$scope","Restangular",function(e,t){var o=t.all("plcs");e.plcs=o.getList()}]),angular.module("ofApp").controller("PlcsCtrl",["$rootScope","$scope","$location","$routeParams","Restangular","$timeout","$log","$anchorScroll",function(e,t,o,n,r,l,a,i){var s={latitude:9.968179612738837,longitude:-84.16628122329712},c=s,u="9.988002927,-84.20538052916";if(n.ll&&"string"==typeof n.ll){console.log("ll",n.ll);var g=n.ll.split(",");c={latitude:parseFloat(g[0]),longitude:parseFloat(g[1])}}angular.extend(t,{position:{coords:c},centerProperty:c,zoomProperty:18,markersProperty:[],clickedLatitudeProperty:null,clickedLongitudeProperty:null,eventsProperty:{click:function(){a.log("user defined event on map directive with scope",this)},dragend:function(e){var r=this.$parent.centerProperty,l=""+r.latitude+","+(""+r.longitude);console.log("ll",l),t.ll=l,o.ll=l,n.ll=e.ll}}}),t.itemMkrClick=function(e){if(console.log("itemMkrClick.index",e),t.selectedItemIndex=e,void 0!==t.items[e].pt){var n=t.items[e].pt;console.log("pt",n),t.ll=""+n[0]+","+(""+n[1])}o.hash("top"),i()};var d={ll:u,cngSlug:"crherbs",cngAreaSlug:"crherbsca",cngAreaTerrSlug:"crherbsca12",q:"",sort:"bdry,w",filter:"cngAreaTerr:crherbs",z:18,pp:5,pg:5};t.items=[],t.lastItemsWithInfo=null,t.maxId=null,t.q=n.q||d.q,t.ll=n.ll||d.ll,t.z=parseInt(n.z,10)||d.z,t.pp=n.pp||d.pp,t.pg=n.pg||d.pg,t.sort=n.sort||d.sort,t.args=d,t.cngs=[{slug:"crherbs",nam:"Belen Sur"}],t.cngAreas=[{bdry:"crherbs",slug:"crherbsca",nam:"Cariari"}],t.cngAreaTerrs=[{bdry:"crherbsca",slug:"crherbsca12",nam:"CA-12"}],n.sort||(n.sort=d.sort),e.returnRoute=o.$$url,t.location=o,t.routeParams=n,t.$watch("ll",function(e){n.ll=e,o.search("ll",e),t.ll=e}),t.$watch("z",function(e){o.search("z",e),t.z=parseInt(e,10)}),t.$watch("cngAreaTerrId",function(e){o.search("cngAreaTerrId",e),t.cngAreaTerrId=e}),t.$watch("routeParams",function(e){return angular.forEach(e,function(e,n){return"where"!==n?(t[n]=e,o.search(n,e)):void 0})},!0);var p=r.all("plcs");t.doClear=function(){t.q=t.location.q=t.routeParams.q=d.q,t.doSearch()},t.doSearch=function(){var e={},l=t.q,a={};"boolean"!=typeof n.cngAreaTerrId&&n.cngAreaTerrId&&(a.bdry=n.cngAreaTerrId);var i=l.match(/qp\w+/g);if(i){for(var s=[],c=0;i.length>c;++c)console.log(i[c]),s.push(i[c].substr(2));a.id={$in:s},l=l.replace(/qp\w+\s*/g,"")}l&&(a.dNam={$regex:l,$options:"i"}),a&&(e.where=JSON.stringify(a)),n.sort&&(e.sort=n.sort),p.getList(e).then(function(e){t.items=e._items;for(var n=e._items,l=0;n.length>l;++l){var a=n[l];a.mkrUpdate=function(e,t){var o=r.one("plcs",t.dat._id),n={pt:[e.latLng.lat(),e.latLng.lng()]},l=JSON.stringify({actions:{$set:{flds:n}}});console.log("customPUT",l),o.customPUT(void 0,void 0,void 0,l).then(function(e){console.log("put success",e)},function(){console.log("mkrUpdate Oops error from server :(")})},void 0!==a.pt&&t.markersProperty.push({latitude:a.pt[0],longitude:a.pt[1],draggable:!0,mkrNo:a.mkrNo,mkrState:a.mkrState,dat:a})}t.q&&o.search("q",t.q)},function(){console.log("Oops error from server :(")})},t.add=function(){var e="doc="+JSON.stringify(t.newItem),o=r.all("plcs");o.post(e).then(function(e){t.newItem._id=e.doc._id,t.items.push(t.newItem),t.newItem={}})},t.remove=function(e){var l=confirm("Are you absolutely sure you want to delete?");if(l){var a=t.items[e],i=r.one("plcs",a._id);i.remove().then(function(){t.items.splice(e,1)},function(){return console.log("Oops error from server :("),o.path("/plc/"+n.id)})}},t.insert=function(){return o.path("/plc/insert")},t.edit=function(e){var n=t.items[e];return o.path("/plc/"+n._id+"/edit")},t.view=function(e){var n=t.items[e];return o.path("/plc/"+n._id)},t.doSearch()}]).controller("PlcFormCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(e,t,o,n,r){var l="/plc/insert"===o.$$path;if(l)t.mode="Add New";else{t.mode="Update";var a=r.one("plcs",n.id);a.get().then(function(e){t.dNam=e.dNam,t.item={},t.item._id=e._id||null,t.item.bdry=e.bdry||"",t.item.nam=e.nam||"",t.item.namS=e.namS||"",t.item.addr=e.addr,t.item.desc=e.desc,t.item.tags=void 0!==e.tags?e.tags.join(","):"",void 0!==e.pt&&(t.item.lng=e.pt[0],t.item.lat=e.pt[1])},function(){console.log("Oops error from server :(")})}t.remove=function(e){var t=confirm("Are you absolutely sure you want to delete?");if(t){var l=r.one("plcs",e._id);l.remove().then(function(){return o.path("/plcs")},function(){return console.log("Oops error from server :("),o.path("/plc/"+n.id)})}},t.save=function(t){var o={};if(console.log("save"),l){o="doc="+JSON.stringify(t);var n=r.all("plcs");n.post(o).then(function(){window.location.href="#"+e.returnRoute},function(){console.log("Oops error from server :(")})}else t.tags=void 0!==t.tags&&t.tags>""?t.tags.split(","):[],void 0!==t.lng&&void 0!==t.lat&&(t.pt=[t.lng,t.lat],delete t.lat,delete t.lng),delete t._id,console.log("item",t),o=JSON.stringify({actions:{$set:{flds:t}}}),a.customPUT(void 0,void 0,void 0,o).then(function(){window.location.href="#"+e.returnRoute},function(){console.log("Oops error from server :(")})},t.abandonChanges=function(){return o.path("/plc/"+t.item._id)}}]).controller("PlcViewCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(e,t,o,n,r){var l=r.one("plcs",n.id);l.get().then(function(e){t.item=e,void 0!==e.pt&&(t.lng=e.pt[0],t.lat=e.pt[1])},function(){console.log("Oops error from server :(")}),t.remove=function(t){var o=confirm("Are you absolutely sure you want to delete?");if(o){var n=r.one("plcs",t._id);n.remove().then(function(){window.location.href="#"+e.returnRoute},function(){console.log("Oops error from server :("),window.location.href="#"+e.returnRoute})}},t.edit=function(e){return o.path("/plc/"+e._id+"/edit")}}]);