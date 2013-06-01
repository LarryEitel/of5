"use strict";angular.module("ofApp",["restangular","ui.bootstrap","google-maps"]).constant("XCHGLAB_CONFIG",{API_KEY:"testkey"}).config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/plcs",{templateUrl:"views/plcs.html",controller:"PlcsCtrl"}).when("/plc/:id/edit",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl"}).when("/plc/insert",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl"}).when("/plc/:id",{templateUrl:"views/plc-view.html",controller:"PlcViewCtrl"}).otherwise({redirectTo:"/"})}]).config(["$httpProvider",function(e){e.defaults.headers.common.Authorization="Basic admin@orgtec.com:xxxxxx",e.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"}]).config(["RestangularProvider",function(e){e.setBaseUrl("http://exi.xchg.com/api"),e.setListTypeIsArray(!1),e.setResponseExtractor(function(e){return e})}]).run(function(e){var n;n=e,n.navBarHeight=40}),function(){function e(e,n){return 1e-6>Math.abs(e-n)}var n=function(){function n(n){var r=null,o=[],a=[],i=[],l=angular.extend({},t,n),s=this,c=null;this.center=n.center,this.zoom=l.zoom,this.draggable=l.draggable,this.dragging=!1,this.selector=l.container,this.markers=[],this.options=l.options,this.draw=function(){if(null!==s.center)if(null===r)r=new google.maps.Map(s.selector,angular.extend(s.options,{center:s.center,zoom:s.zoom,draggable:s.draggable,mapTypeId:google.maps.MapTypeId.ROADMAP})),google.maps.event.addListener(r,"dragstart",function(){s.dragging=!0}),google.maps.event.addListener(r,"idle",function(){s.dragging=!1}),google.maps.event.addListener(r,"drag",function(){s.dragging=!0}),google.maps.event.addListener(r,"zoom_changed",function(){s.zoom=r.getZoom(),s.center=r.getCenter()}),google.maps.event.addListener(r,"center_changed",function(){s.center=r.getCenter()}),a.length&&angular.forEach(a,function(e){google.maps.event.addListener(r,e.on,e.handler)});else{google.maps.event.trigger(r,"resize");var n=r.getCenter();e(n.lat(),s.center.lat())&&e(n.lng(),s.center.lng())||r.setCenter(s.center),r.getZoom()!==s.zoom&&r.setZoom(s.zoom)}},this.fit=function(){if(r&&o.length){var e=new google.maps.LatLngBounds;angular.forEach(o,function(n){e.extend(n.getPosition())}),r.fitBounds(e)}},this.on=function(e,n){a.push({on:e,handler:n})},this.addMarker=function(e,n,t,a,i,l,u,g,d,p){if(null===s.findMarker(e,n)){var m,f,h,v,w,b="img/map/sprites/";10>a?(h=b+"sprite_1.png",f=12,v=(a-1)*f,w=i*m):100>a?(h=b+"sprite_2.png",f=16,v=(a-10)*f,w=i*m):(h=b+"sprite_3.png",f=20,v=(a-100)*f,w=i*m),w&&(w+=1),a&&void 0!==i&&(t=new google.maps.MarkerImage(h,new google.maps.Size(f,12),new google.maps.Point(v,w),new google.maps.Point(0,0)));var y=new google.maps.Marker({position:new google.maps.LatLng(e,n),map:r,draggable:p,icon:t});if(null!==l){var $=new google.maps.InfoWindow({content:l});google.maps.event.addListener(y,"click",function(){null!==c&&c.close(),$.open(r,y),c=$})}return o.unshift(y),s.markers.unshift({lat:e,lng:n,draggable:!1,icon:t,infoWindowContent:l,label:u,url:g,thumbnail:d}),y}},this.findMarker=function(n,t){for(var r=0;o.length>r;r++){var a=o[r].getPosition();if(e(a.lat(),n)&&e(a.lng(),t))return o[r]}return null},this.findMarkerIndex=function(n,t){for(var r=0;o.length>r;r++){var a=o[r].getPosition();if(e(a.lat(),n)&&e(a.lng(),t))return r}return-1},this.addInfoWindow=function(e,n,t){var r=new google.maps.InfoWindow({content:t,position:new google.maps.LatLng(e,n)});return i.push(r),r},this.hasMarker=function(e,n){return null!==s.findMarker(e,n)},this.getMarkerInstances=function(){return o},this.removeMarkers=function(e){var n=this;angular.forEach(e,function(e){var t=e.getPosition(),r=t.lat(),a=t.lng(),i=n.findMarkerIndex(r,a);o.splice(i,1),n.markers.splice(i,1),e.setMap(null)})}}var t={zoom:8,draggable:!1,container:null};return n}(),t=angular.module("google-maps",[]);t.directive("googleMap",["$log","$timeout","$filter",function(t,r){var o=function(e){var n=e.map;self.addInfoWindow=function(e,t,r){n.addInfoWindow(e,t,r)}};return o.$inject=["$scope","$element"],{restrict:"ECA",priority:100,transclude:!0,template:'<div class="angular-google-map" ng-transclude></div>',replace:!1,scope:{center:"=center",markers:"=markers",latitude:"=latitude",longitude:"=longitude",zoom:"=zoom",refresh:"&refresh",windows:"=windows",events:"=events"},controller:o,link:function(o,a,i){if(!angular.isDefined(o.center)||!angular.isDefined(o.center.latitude)||!angular.isDefined(o.center.longitude))return t.error("angular-google-maps: could not find a valid center property"),void 0;if(!angular.isDefined(o.zoom))return t.error("angular-google-maps: map zoom property not set"),void 0;angular.element(a).addClass("angular-google-map");var l={options:{}};i.options&&(l.options=angular.fromJson(i.options));var s=new n(angular.extend(l,{container:a[0],center:new google.maps.LatLng(o.center.latitude,o.center.longitude),draggable:"true"===i.draggable,zoom:o.zoom}));if(s.on("drag",function(){var e=s.center;r(function(){o.$apply(function(){o.center.latitude=e.lat(),o.center.longitude=e.lng()})})}),s.on("zoom_changed",function(){o.zoom!==s.zoom&&r(function(){o.$apply(function(){o.zoom=s.zoom})})}),s.on("center_changed",function(){var e=s.center;r(function(){o.$apply(function(){s.dragging||(o.center.latitude=e.lat(),o.center.longitude=e.lng())})})}),angular.isDefined(o.events))for(var c in o.events)o.events.hasOwnProperty(c)&&angular.isFunction(o.events[c])&&s.on(c,function(){o.events[c].apply(o,[s,c,arguments])});"true"===i.markClick&&function(){var e=null;s.on("click",function(n){if(null===e){if(e={latitude:n.latLng.lat(),longitude:n.latLng.lng()},void 0!==o.$parent.selectedItemIndex){var t=o.$parent.items[o.$parent.selectedItemIndex];void 0===t.pt&&(t.pt=[e.longitude,e.latitude],o.markers.push(e))}r(function(){e&&(o.latitude=e.latitude,o.longitude=e.longitude),o.$apply()})}e=null})}(),o.map=s,angular.isUndefined(o.refresh())?s.draw():o.$watch("refresh()",function(e,n){e&&!n&&s.draw()}),o.$watch("markers",function(n){r(function(){angular.forEach(n,function(e){s.hasMarker(e.latitude,e.longitude,e.draggable)||s.addMarker(e.latitude,e.longitude,e.icon,e.mkrNo,e.mkrState,e.infoWindow,e.label,e.url,e.thumbnail,e.draggable)});var t=[];angular.forEach(s.getMarkerInstances(),function(n){for(var r=n.getPosition(),a=r.lat(),i=r.lng(),l=!1,s=0;o.markers.length>s;s++){var c=o.markers[s];e(c.latitude,a)&&e(c.longitude,i)&&(l=!0)}l||t.push(n)}),"true"===i.fit&&n&&n.length>1&&s.fit()})},!0),o.$watch("center",function(e,n){e!==n&&(s.dragging||(s.center=new google.maps.LatLng(e.latitude,e.longitude),s.draw()))},!0),o.$watch("zoom",function(e,n){e!==n&&(s.zoom=e,s.draw())})}}}])}(),angular.module("ofApp").controller("MainCtrl",["$scope","Restangular",function(e,n){var t=n.all("plcs");e.plcs=t.getList()}]),angular.module("ofApp").controller("PlcsCtrl",["$rootScope","$scope","$location","$routeParams","Restangular","$timeout","$log","$anchorScroll",function(e,n,t,r,o,a,i,l){var s={latitude:9.988002927,longitude:-84.20538052916},c=s;angular.extend(n,{position:{coords:c},centerProperty:c,zoomProperty:13,markersProperty:[{latitude:c.latitude,longitude:c.longitude,draggable:!0,mkrNo:6,mkrState:0}],clickedLatitudeProperty:null,clickedLongitudeProperty:null,eventsProperty:{click:function(e,n,t){i.log("user defined event on map directive with scope",this),i.log("user defined event: "+n,e,t)}}}),n.itemMkrClick=function(e){if(n.selectedItemIndex=e,void 0!==n.items[e].pt){var r=n.items[e].pt;n.position.coords={latitude:r[1],longitude:r[0]}}t.hash("top"),l()};var u={ll:s,cngSlug:"crherbs",cngAreaSlug:"crherbsca",cngAreaTerrSlug:"crherbsca12",q:"",sort:"bdry,w",filter:"cngAreaTerr:crherbs",pp:5,pg:5};n.items=[],n.lastItemsWithInfo=null,n.maxId=null,n.q=r.q||u.q,n.pp=r.pp||u.pp,n.pg=r.pg||u.pg,n.sort=r.sort||u.sort,n.args=u,n.cngs=[{slug:"crherbs",nam:"Belen Sur"}],n.cngAreas=[{bdry:"crherbs",slug:"crherbsca",nam:"Cariari"},{bdry:"crherbs",slug:"crherbsla",nam:"Los Arcos"}],n.cngAreaTerrs=[{bdry:"crherbsca",slug:"crherbsca01",nam:"CA-01 (bogus)"},{bdry:"crherbsca",slug:"crherbsca12",nam:"CA-12"},{bdry:"crherbsla",slug:"crherbsla01",nam:"LA-01 (bogus)"},{bdry:"crherbsla",slug:"crherbsla02",nam:"LA-02 (bogus)"}],r.sort||(r.sort=u.sort),e.returnRoute=t.$$url,n.location=t,n.routeParams=r,n.$watch("cngAreaTerrId",function(e){t.search("cngAreaTerrId",e),n.cngAreaTerrId=e}),n.$watch("routeParams",function(e){return angular.forEach(e,function(e,r){return"where"!==r?(n[r]=e,t.search(r,e)):void 0})},!0);var g=o.all("plcs");n.doClear=function(){n.q=n.location.q=n.routeParams.q=u.q,n.doSearch()},n.doSearch=function(){var e={},o={};n.q&&(o.dNam={$regex:n.q,$options:"i"}),"boolean"!=typeof r.cngAreaTerrId&&r.cngAreaTerrId&&(o.bdry=r.cngAreaTerrId),o&&(e.where=JSON.stringify(o)),r.sort&&(e.sort=r.sort),g.getList(e).then(function(e){n.items=e._items,n.q&&t.search("q",n.q)},function(){console.log("Oops error from server :(")})},n.add=function(){var e="doc="+JSON.stringify(n.newItem),t=o.all("plcs");t.post(e).then(function(e){n.newItem._id=e.doc._id,n.items.push(n.newItem),n.newItem={},n.myForm.$setPristine(),n.myForm.$pristine=!0})},n.remove=function(e){var a=confirm("Are you absolutely sure you want to delete?");if(a){var i=n.items[e],l=o.one("plcs",i._id);l.remove().then(function(){n.items.splice(e,1)},function(){return console.log("Oops error from server :("),t.path("/plc/"+r.id)})}},n.insert=function(){return t.path("/plc/insert")},n.edit=function(e){var r=n.items[e];return t.path("/plc/"+r._id+"/edit")},n.view=function(e){var r=n.items[e];return t.path("/plc/"+r._id)},n.doSearch()}]).controller("PlcFormCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(e,n,t,r,o){var a="/plc/insert"===t.$$path;if(a)n.mode="Add New";else{n.mode="Update";var i=o.one("plcs",r.id);i.get().then(function(e){n.dNam=e.dNam,n.item={},n.item._id=e._id||null,n.item.bdry=e.bdry||"",n.item.nam=e.nam||"",n.item.namS=e.namS||"",n.item.addr=e.addr,n.item.desc=e.desc,n.item.tags=void 0!==e.tags?e.tags.join(","):"",void 0!==e.pt&&(n.item.lng=e.pt[0],n.item.lat=e.pt[1])},function(){console.log("Oops error from server :(")})}n.remove=function(e){var n=confirm("Are you absolutely sure you want to delete?");if(n){var a=o.one("plcs",e._id);a.remove().then(function(){return t.path("/plcs")},function(){return console.log("Oops error from server :("),t.path("/plc/"+r.id)})}},n.save=function(n){var t={};if(console.log("save"),a){t="doc="+JSON.stringify(n);var r=o.all("plcs");r.post(t).then(function(){window.location.href="#"+e.returnRoute},function(){console.log("Oops error from server :(")})}else n.tags=void 0!==n.tags&&n.tags>""?n.tags.split(","):[],void 0!==n.lng&&void 0!==n.lat&&(n.pt=[n.lng,n.lat],delete n.lat,delete n.lng),delete n._id,console.log("item",n),t=JSON.stringify({actions:{$set:{flds:n}}}),i.customPUT(void 0,void 0,void 0,t).then(function(){window.location.href="#"+e.returnRoute},function(){console.log("Oops error from server :(")})},n.abandonChanges=function(){return t.path("/plc/"+n.item._id)}}]).controller("PlcViewCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(e,n,t,r,o){var a=o.one("plcs",r.id);a.get().then(function(e){n.item=e,void 0!==e.pt&&(n.lng=e.pt[0],n.lat=e.pt[1])},function(){console.log("Oops error from server :(")}),n.remove=function(n){var t=confirm("Are you absolutely sure you want to delete?");if(t){var r=o.one("plcs",n._id);r.remove().then(function(){window.location.href="#"+e.returnRoute},function(){console.log("Oops error from server :("),window.location.href="#"+e.returnRoute})}},n.edit=function(e){return t.path("/plc/"+e._id+"/edit")}}]);