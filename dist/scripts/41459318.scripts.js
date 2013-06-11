var bdysJson='{"bsbr08": {"pts": [[9.970634375109034, -84.16662862265946], [9.969907681451806, -84.16657379040629], [9.96918575418298, -84.16650864293284], [9.96943374126796, -84.16599287415393], [9.969851338243716, -84.16521112187816], [9.970192424609472, -84.1644953963647], [9.970381346368669, -84.16399504832715], [9.970414333758404, -84.16356338864574], [9.970860827824179, -84.16358807368938], [9.971522431696373, -84.1636944279533], [9.971865267262292, -84.16377292236123], [9.97160925842014, -84.16415504435048], [9.971549964164529, -84.1645948033377], [9.971502592657677, -84.16497758355433], [9.971482064948713, -84.16534208232451], [9.971453921969445, -84.1657601923639], [9.971431254046498, -84.16631665124032], [9.971410736324534, -84.1666766097517], [9.970634375109034, -84.16662862265946]]}, "bsbr06": {"pts": [[9.968973408638314, -84.16704810218715], [9.968834630162002, -84.16738249091311], [9.968687859338182, -84.16774137804002], [9.968576842974961, -84.16801182972485], [9.968357135937447, -84.16856601952634], [9.968235536849983, -84.1688600789591], [9.968290364601158, -84.1689382478004], [9.968185140827481, -84.16925035558872], [9.968071991033325, -84.16959979567874], [9.967896742305653, -84.17004978516898], [9.967619131169556, -84.1698935282033], [9.967423552934315, -84.16974591816535], [9.967035306551264, -84.16945708532839], [9.966685131806567, -84.16939843670873], [9.966378287697097, -84.1691726710474], [9.966023354857446, -84.16893273823939], [9.965734303225522, -84.16857025333104], [9.965613440668452, -84.16826787236042], [9.965819326733603, -84.16803068108251], [9.965957335661212, -84.16799686820771], [9.966182771570422, -84.16790301677798], [9.966307864428352, -84.16775732151905], [9.96656028368469, -84.16746657050498], [9.966602035273382, -84.1673851778044], [9.966674270744669, -84.16718030471891], [9.966646242740357, -84.16689545065421], [9.966659298405238, -84.16670404110766], [9.966688356310634, -84.16638654621703], [9.966646786420888, -84.1661875138058], [9.967314722075486, -84.16630549476103], [9.967907745506793, -84.16639133922605], [9.968658444907955, -84.16649284406267], [9.969173790522499, -84.16652434615186], [9.968973408638314, -84.16704810218715]]}}',data,bdys=JSON.parse(bdysJson);(function(t){t.userRoles={"public":1,user:2,admin:4},t.accessLevels={"public":7,anon:1,user:6,admin:4}})("undefined"==typeof exports?this.routingConfig={}:exports),function(){"use strict";var t,o,r,n,i,s=function(t,e){return function(){return t.apply(e,arguments)}};i=function(t){return t.lat+","+t.lng},n=function(t){var e;return e=t.split(","),{lat:e[0],lng:e[1]}},r=function(){function t(t,e,o){var r,n,i,l,a;for(this.map=t,this.pts=e,this.bdyData=o,this.click=s(this.click,this),this.show=s(this.show,this),this.gmaps=google.maps,this.coords=[],i=0,l=e.length;l>i;i++)n=e[i],this.coords.push(new this.gmaps.LatLng(n[0],n[1]));this.bdy=new this.gmaps.Polygon({paths:this.coords,strokeColor:"red",strokeOpacity:.8,strokeWeight:2,fillOpacity:0,clickable:!1}),r=this.map.mapTypeId||"hybrid",("cong"===(a=this.bdyData.typ)||"congArea"===a||"congAreaResidentialTerr"===a)&&this.bdy.setOptions(this.typOptions[this.bdyData.typ][r]),this.bdy.setMap(this.map)}return t.prototype.defaultOptions={normal:{fillColor:"blue",fillOpacity:0,strokeColor:"blue",strokeOpacity:.8,strokeWeight:2},hover:{fillOpacity:.1,strokeWeight:3}},t.prototype.typOptions={cong:{roadmap:{zIndex:4,fillColor:"black",fillOpacity:0,strokeColor:"black",strokeOpacity:.8,strokeWeight:3},hybrid:{zIndex:0,fillColor:"white",fillOpacity:0,strokeColor:"white",strokeOpacity:.8,strokeWeight:4},hover:{fillOpacity:.1,strokeWeight:3}},congArea:{roadmap:{zIndex:3,fillColor:"red",fillOpacity:0,strokeColor:"red",strokeOpacity:.8,strokeWeight:2},hybrid:{zIndex:3,fillColor:"red",fillOpacity:0,strokeColor:"red",strokeOpacity:.8,strokeWeight:3},hover:{fillOpacity:.1,strokeWeight:4}},congAreaResidentialTerr:{roadmap:{zIndex:0,fillColor:"blue",fillOpacity:0,strokeColor:"blue",strokeOpacity:.8,strokeWeight:2},hybrid:{zIndex:6,fillColor:"blue",fillOpacity:0,strokeColor:"blue",strokeOpacity:.8,strokeWeight:2},hover:{fillOpacity:.1,strokeWeight:3}}},t.prototype.render=function(){return console.log("render")},t.prototype.show=function(){},t.prototype.click=function(){return console.log("mkrClick")},t}(),t=function(){function t(t){this.onTypeChange=s(this.onTypeChange,this),this.onZoomChange=s(this.onZoomChange,this),this.updateLocation=s(this.updateLocation,this),this.onCenterChanged=s(this.onCenterChanged,this),this.resizeMapEl=s(this.resizeMapEl,this),this.onDragEnd=s(this.onDragEnd,this),this.setCenter=s(this.setCenter,this),this.onDragStart=s(this.onDragStart,this),this.removeMkrs=s(this.removeMkrs,this),this.addPlcMkr=s(this.addPlcMkr,this),this.addBdy=s(this.addBdy,this),this.onClick=s(this.onClick,this);var e;this.rootScope=t.rootScope,this.dragging=0,this.location=t.location,this.routeParams=t.routeParams,this.zoom=parseInt(this.location.search().z)||t.zoom,this.mapType=this.location.search().t||t.mapType,this.ll=this.location.search().ll||t.ll,this.center=this.ll?n(this.ll):t.center,this.routeParams.ll=this.ll,this.mapEl=$("#map"),this.mapTypes={m:"roadmap",h:"hybrid"},this.map=new google.maps.Map(this.mapEl[0],{zoom:this.zoom,center:new google.maps.LatLng(this.center.lat,this.center.lng),mapTypeId:this.mapTypes[this.mapType]}),e=google.maps.event.addListener,e(this.map,"center_changed",this.onCenterChanged),e(this.map,"maptypeid_changed",this.onTypeChange),e(this.map,"zoom_changed",this.onZoomChange),e(this.map,"dragstart",this.onDragStart),e(this.map,"dragend",this.onDragEnd),e(this.map,"click",this.onClick),this.rootScope.protocol=this.location.protocol(),this.rootScope.host=this.location.host(),this.rootScope.mapCenter=this.center,this.rootScope.mapZoom=this.zoom,this.rootScope.mapTypeId=this.mapTypeId}return t.prototype.onClick=function(t){var e,o;return console.log("onClick.@rootScope.selectedItemIndex",this.rootScope.selectedItemIndex),console.log("clicked at:",t,[t.latLng.lat(),t.latLng.lng()]),this.rootScope.selectedItemIndex>-1?(o=this.rootScope.selectedItem,o.pt=[t.latLng.lat(),t.latLng.lng()],this.addPlcMkr(this.map,o),e=JSON.stringify({actions:{$set:{flds:{pt:o.pt}}}}),o.patch(o._id,e),this.rootScope.selectedItemIndex=-1,this.rootScope.$$phase||this.rootScope.$apply()):void 0},t.prototype.addBdy=function(t,e){return new r(t,e.pts,e)},t.prototype.addPlcMkr=function(t,e){var r,n,i,s,l;return n=this.icon(e),s=e.pt[0],l=e.pt[1],r=!0,i={_id:e._id,id:e.id,mkrNo:e.mkrNo,dNam:e.dNam,patch:e.patch},new o(t,s,l,n,r,i)},t.prototype.removeMkrs=function(){return this.rootScope.items?angular.forEach(this.rootScope.items,function(t){return t.mapMkr?t.mapMkr.marker.setMap(null):void 0}):void 0},t.prototype.onDragStart=function(){return this.dragging=!0,!0},t.prototype.setCenter=function(){return console.log("setCenter",this.center)},t.prototype.onDragEnd=function(){return this.dragging=!1,this.onCenterChanged()},t.prototype.resizeMapEl=function(){},t.prototype.onCenterChanged=function(){var t;return t=this.map.getCenter(),this.center.lat=t.lat(),this.center.lng=t.lng(),this.dragging?void 0:(this.rootScope.mapCenter=this.center,this.ll=i(this.center),this.routeParams.ll=this.ll,this.updateLocation())},t.prototype.updateLocation=function(){return this.rootScope.$$phase||this.rootScope.$apply()},t.prototype.onZoomChange=function(){return this.rootScope.mapZoom=this.zoom=this.map.getZoom(),this.routeParams.z=this.zoom,this.updateLocation()},t.prototype.onTypeChange=function(){return this.mapTypeId=this.map.getMapTypeId(),this.rootScope.mapTypeId=this.mapTypeId[0],this.routeParams.t=this.mapTypeId[0],this.updateLocation()},t}(),o=function(){function t(t,e,o,r,n,i){this.map=t,this.lat=e,this.lng=o,this.icon=null!=r?r:null,this.draggable=null!=n?n:!0,this.itemData=null!=i?i:null,this.click=s(this.click,this),this.show=s(this.show,this),this.dragend=s(this.dragend,this),this.gmaps=google.maps,this.position=new this.gmaps.LatLng(this.lat,this.lng),this.marker=new this.gmaps.Marker({draggable:this.draggable,icon:this.icon}),this.gmaps.event.addListener(this.marker,"dragend",this.dragend),this.gmaps.event.addListener(this.marker,"click",this.click),this.marker.setPosition(this.position),this.marker.setMap(this.map)}return t.prototype.render=function(){return console.log("render"),this.show()},t.prototype.dragend=function(){var t;return confirm("Are you sure you want to move this marker?")?(t=JSON.stringify({actions:{$set:{flds:{pt:[e.latLng.lat(),e.latLng.lng()]}}}}),this.itemData.patch(this.itemData._id,t)):this.marker.setPosition(this.position)},t.prototype.show=function(){return this.marker.setPosition(this.position),this.marker.setMap(this.map)},t.prototype.click=function(){return console.log("mkrClick")},t}(),angular.module("ofApp",["restangular","ngCookies","ui.bootstrap"]),angular.module("ofApp").config(["$httpProvider",function(t){return t.defaults.headers.common.Authorization="Basic admin@orgtec.com:xxxxxx",t.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",t.defaults.headers.post["Content-Type"]}]),angular.module("ofApp").config(["RestangularProvider",function(t){return t.setBaseUrl("http://exi.xchg.com/api"),t.setListTypeIsArray(!1),t.setResponseExtractor(function(t,e,o){return"users"===o&&"getList"===e&&localStorage.setItem("lsuser",JSON.stringify(t._items[0])),t})}]),angular.module("ofApp").config(["$routeProvider","$locationProvider","$httpProvider",function(t,e,o){var r,n;return r=routingConfig.accessLevels,t.when("/plcs",{templateUrl:"views/plcs.html",controller:"PlcsCtrl",access:r.anon}),t.when("/plc/:id/edit",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl",access:r.anon}),t.when("/plc/insert",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl",access:r.anon}),t.when("/plc/:id",{templateUrl:"views/plc-view.html",controller:"PlcViewCtrl",access:r.anon}),t.when("/",{templateUrl:"views/partials/home.html",controller:"HomeCtrl",access:r.user}),t.when("/login",{templateUrl:"views/partials/login.html",controller:"LoginCtrl",access:r.anon}),t.when("/logout",{templateUrl:"views/partials/logout.html",controller:"LogoutCtrl",access:r.user}),t.when("/register",{templateUrl:"views/partials/register.html",controller:"RegisterCtrl",access:r.anon}),t.when("/private",{templateUrl:"/partials/private",controller:"PrivateCtrl",access:r.user}),t.when("/admin",{templateUrl:"/partials/admin",controller:"AdminCtrl",access:r.admin}),t.when("/404",{templateUrl:"views/partials/404.html",access:r["public"]}),t.otherwise({redirectTo:"/404"}),n=["$location","$q",function(t,e){var o,r;return r=function(t){return t},o=function(o){return 401===o.status?(t.path("/login"),e.reject(o)):e.reject(o)},function(t){return t.then(r,o)}}],o.responseInterceptors.push(n)}]),i=function(t){return t.lat+","+t.lng},n=function(t){var e;return e=t.split(","),{lat:e[0],lng:e[1]}},angular.module("ofApp").factory("GoogleMap",["$rootScope","$location","$routeParams",function(e,o,r){var n,s,l,a,c,p;return s={lat:9.993552791991132,lng:-84.20888416469096},n={lat:9.971365509675179,lng:-84.16658163070679},l=n,a=16,c={rootScope:e,location:o,routeParams:r,zoom:a,mapType:"h",ll:i(l),center:{lat:l.lat,lng:l.lng}},p=0,new t(c)}]),angular.module("ofApp").run(["$rootScope","$location","Auth",function(t,e,o){return t.$on("$routeChangeStart",function(r,n){return t.error=null,(o.authorize(n.access)?void 0:o.isLoggedIn())?void 0:e.path("/login")}),t.appInitialized=!0}])}.call(this),function(){"use strict";angular.module("ofApp").factory("Auth",["Restangular","$http","$rootScope","$cookieStore",function(t,e,o){var r,n;return r=routingConfig.accessLevels,n=routingConfig.userRoles,localStorage.getItem("lsuser")&&(o.user=JSON.parse(localStorage.getItem("lsuser"))),o.accessLevels=r,o.userRoles=n,{authorize:function(t,e){return void 0!==e?!0:!1},isLoggedIn:function(t){return void 0===t?t=o.user:void 0},register:function(t,o,r){return e.post("/register",t).success(o).error(r)},login:function(e,r){var n;return n=t.all("users"),n.getList({where:JSON.stringify({uNam:e.username})}).then(function(t){return t._items.length?(e=t._items[0],o.user=e,r(e)):void 0},function(){return $location.path("/")},function(){return o.error="Failed to login"})},logout:function(t,r){return e.post("/logout").success(function(){return o.user.uNam="",t()}).error(r)},accessLevels:r,userRoles:n}}])}.call(this),angular.module("ofApp").controller("AppCtrl",["$rootScope","$scope","$location","Auth",function(t,e,o,r){e.getUserRoleText=function(t){return _.invert(r.userRoles)[t]},e.logout=function(){r.logout(function(){o.path("/login")},function(){t.error="Failed to logout"})}}]),angular.module("ofApp").controller("LoginCtrl",["$rootScope","$scope","$location","Auth",function(t,e,o,r){t.activeNavItem="login",e.rememberme=!0,e.login=function(){localStorage.removeItem("lsuser"),r.login({username:e.username,password:e.password,rememberme:e.rememberme},function(){o.path("/")},function(){t.error="Failed to login"})}}]),angular.module("ofApp").controller("LogoutCtrl",["$rootScope","$location",function(t,e){localStorage.removeItem("lsuser"),delete t.user,e.path("/")}]),angular.module("ofApp").controller("HomeCtrl",["$rootScope",function(t){t.activeNavItem="home"}]),angular.module("ofApp").controller("RegisterCtrl",["$rootScope","$scope","$location","Auth",function(t,e,o,r){t.activeNavItem="register",e.role=routingConfig.userRoles.user,e.register=function(){r.register({username:e.username,password:e.password,role:e.role},function(e){t.user=e,o.path("/")},function(e){t.error=e})}}]),angular.module("ofApp").controller("PrivateCtrl",["$rootScope",function(t){t.activeNavItem="private"}]),angular.module("ofApp").controller("AdminCtrl",["$rootScope","$scope","Users",function(t,e,o){t.activeNavItem="admin",e.loading=!0,o.getAll(function(t){e.users=t,e.loading=!1},function(){t.error="Failed to fetch users.",e.loading=!1})}]),angular.module("ofApp").directive("accessLevel",["$rootScope","Auth",function(t,e){return{restrict:"A",link:function(o,r,n){var i=r.css("display");t.$watch("user.role",function(){e.authorize(n.accessLevel)?r.css("display",i):r.css("display","none")})}}}]).directive("autoFillableField",function(){return{restrict:"A",require:"?ngModel",link:function(t,e,o,r){setInterval(function(){""===e.val()&&r.$pristine||t.$apply(function(){r.$setViewValue(e.val())})},300)}}}),angular.module("ofApp").controller("MainCtrl",["$scope","Restangular",function(t,e){var o=e.all("plcs");t.plcs=o.getList()}]),function(){"use strict";var t,e,o,r,n,i=[].indexOf||function(t){for(var e=0,o=this.length;o>e;e++)if(e in this&&this[e]===t)return e;return-1};e=function(t){return t.lat+","+t.lng},t=function(t){var e;return e=t.split(","),{lat:e[0],lng:e[1]}},n="img/map/sprites/",o="img/map/markers/small/white/numbers/",r=19,angular.module("ofApp").controller("PlcsCtrl",["$rootScope","$scope","$location","$routeParams","Restangular","$timeout","$log","$anchorScroll","GoogleMap",function(t,i,s,l,a,c,p,u,d){var h,m,g,f,y,v,I;return f=d,y=google.maps,v=f.map,g={ll:"9.971365509675179,-84.16658163070679",cngSlug:"crherbs",cngAreaSlug:"br",cngAreaTerrSlug:"brr06",q:"",sort:"bdry,w",filter:"filtBdyId:crherbs",z:17,pp:5,pg:5},i.items=[],i.lastItemsWithInfo=null,i.maxId=null,i.q=l.q||g.q,i.ll=l.ll||g.ll,i.z=parseInt(l.z,10)||g.z,i.pp=l.pp||g.pp,i.pg=l.pg||g.pg,i.sort=l.sort||g.sort,i.args=g,t.filtBdyId=i.filtBdyId=null,t.editingBdy=!1,t.bdysLoaded=!1,t.selectedItemIndex=f.selectedItem=f.selectedItemIndex=-1,h=a.all("bdys"),m=a.all("plcs"),l.sort||(l.sort=g.sort),t.returnRoute=s.$$url,i.location=s,i.routeParams=l,t.filtBdyId=i.filtBdyId=l.filtBdyId,console.log("filtBdyId",t.filtBdyId),t.$watch("selectedItemIndex",function(e){return i.selectedItem=t.selectedItem,t.selectedItemIndex=i.selectedItemIndex=e}),f.icon=function(t){return i.mkrIcon2(t.mkrNo,t.mkrState)},i.itemMkrClick=function(o){var n;return t.selectedItemIndex=f.selectedItemIndex=i.selectedItemIndex=o,t.selectedItem=f.selectedItem=i.items[o],v.setZoom(r),i.items[o].pt&&(t.selectedItemIndex=f.selectedItemIndex=i.selectedItemIndex=-1,n=i.items[o].pt,i.ll=e(n),v.setCenter(new google.maps.LatLng(n[0],n[1]))),s.hash("top"),u()},i.doSearch=function(){var e,o,r,n,a,c,p;if(t.editingBdy)return console.log("currently editing a boundary"),void 0;if(console.log("doSearch"),e={},a=i.q,p={},"boolean"!=typeof l.filtBdyId&&l.filtBdyId&&(p.bdry=l.filtBdyId),c=a.match(/qp\w+/g)){for(n=[],r=0;c.length>r;)console.log(c[r]),n.push(c[r].substr(2)),++r;p.id={$in:n},a=a.replace(/qp\w+\s*/g,"")}return a&&(p.dNam={$regex:a,$options:"i"}),p&&(e.where=JSON.stringify(p)),l.sort&&(e.sort=l.sort),m.getList(e).then(function(e){var o,n,a,c;for(i.loadBdys(),f.removeMkrs(),c=e._items,r=n=0,a=c.length;a>n;r=++n)o=c[r],e._items[r].patch=i.patch,o.pt&&parseInt(l.z,10)>16&&(e._items[r].mapMkr=f.addPlcMkr(v,o));return t.items=i.items=e._items,i.q?s.search("q",i.q):void 0},o=function(){return console.log("Oops error from server :(")})},i.saveBdy=function(e){var o;return o=t.bdys[e],o.poly.setEditable(!1),t.editingBdy=i.editingBdy=!1},i.editBdy=function(e){var o;return console.log("editBdy key:",e),o=t.bdys[e],o.poly.setEditable(!0),t.editingBdy=i.editingBdy=!0},i.showBdyLabels=function(){var t,e,o,n,s,l,a,c,p;c=i.bdys,p=[];for(l in c)t=c[l],s=t.zoom,"congAreaResidentialTerr"===t.typ?(a="#98F5FF",e=12,o=t.nam.split("#")[1],s=15,r=17):"congArea"===t.typ?(a="#FF82AB",e=16,o=t.nam,s=14,r=17):"cong"===t.typ?(a="white",e=25,o=t.nam,s=13,r=17):(a="white",e=20,o=t.nam,s=1,r=20),p.push(n=new MapLabel({minZoom:s,maxZoom:r,strokeColor:a,text:o,position:new google.maps.LatLng(t.ptCenter[0],t.ptCenter[1]),map:v,fontSize:e}));return p},i.loadBdys=function(){var t;return h.getList({sort:"typ,slug"}).then(function(t){var e,o,r,n,s,l,a,c;for(o={},r=[],c=t._items,n=l=0,a=c.length;a>l;n=++l)s=c[n],e={slug:s.slug,nam:s.nam,typ:s.typ,ptCenter:[s.ptCenter[0],s.ptCenter[1]],zoom:18,mapTypeId:"hybrid"},e.zoom="congAreaResidentialTerr"===s.typ?18:"congArea"===s.typ?15:"cong"===s.typ?14:12,o[s.slug]=e,r.push({slug:s.slug,nam:s.nam});return i.bdys=o,i.filtBdys=r,i.showBdyLabels()},t=function(){return console.log("Oops error from server :(")})},i.loadBdyPolys=function(){var e;return h.getList().then(function(e){var o,r,n,i,s,l,a;for(r={},a=e._items,n=s=0,l=a.length;l>s;n=++s)i=a[n],o=i,o.bdyPoly=f.addBdy(v,o),r[i.slug]=o;return t.bdysLoaded=!0},e=function(){return console.log("Oops error from server :(")})},i.patch=function(t,e){var o,r;return o=a.one("plcs",t),o.customPUT(null,null,null,e).then(function(){return console.log("success!")},r=function(){return console.log("Oops error from server :(")})},i.$watch("z",function(t){return s.search("z",t),i.z=parseInt(t,10)}),i.$watch("filtBdyId",function(e){var o,r;return s.search("filtBdyId",e),t.filtBdyId=i.filtBdyId=e,e&&"string"==typeof e&&l.filtBdyId!==e?(o=i.bdys[e],r=o.ptCenter,v.setCenter(new google.maps.LatLng(r[0],r[1])),v.setZoom(o.zoom),v.setMapTypeId(o.mapTypeId),t.filtBdyId=i.filtBdyId=e,l.filtBdyId=e):void 0}),i.$watch("routeParams",function(e){return t.editingBdy?void 0:angular.forEach(e,function(t,e){return"where"!==e?(i[e]=t,s.search(e,t)):void 0})},!0),I={},i.doClear=function(){return i.q=i.location.q=i.routeParams.q=g.q,i.doSearch()},i.add=function(){var t;return t="doc="+JSON.stringify(i.newItem),m=a.all("plcs"),m.post(t).then(function(t){return i.newItem._id=t.doc._id,i.items.push(i.newItem),i.newItem={}})},i.remove=function(t){var e,o,r,n;return o=confirm("Are you absolutely sure you want to delete?"),o?(n=i.items[t],e=a.one("plcs",n._id),e.remove().then(function(){return i.items.splice(t,1)},r=function(){return console.log("Oops error from server :("),s.path("/plc/"+l.id)})):void 0},i.insert=function(){return s.path("/plc/insert")},i.edit=function(t){var e;return e=i.items[t],s.path("/plc/"+e._id+"/edit")},i.view=function(t){var e;return e=i.items[t],s.path("/plc/"+e._id)},i.mkrIcon=function(t,e){var o,r,i,s,l,a,c;return null==e&&(e=0),s=["new","try_1","try_1_contacted","try_2","try_2_contacted","try_3","try_3_contacted"],r=null,i=null,l=null,a=null,c=null,10>t?(l=n+"sprite_1.png",i=12,a=(t-1)*i,c=e*r):100>t?(l=n+"sprite_2.png",i=16,a=(t-10)*i,c=e*r):(l=n+"sprite_3.png",i=20,a=(t-100)*i,c=e*r),c&&(c+=1),t&&e>-1&&(o=new google.maps.MarkerImage(l,new google.maps.Size(i,12),new google.maps.Point(a,c))),o},i.mkrIcon2=function(t,e){var r,n,i,s;return null==e&&(e=0),n=o+t+".png",i=12,s=10>t?12:100>t?14:20,r=new google.maps.MarkerImage(n,new google.maps.Size(s,i),new google.maps.Point(0,0))},i.doSearch(),i.loadBdyPolys()}]),angular.module("ofApp").controller("PlcFormCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(t,e,o,r,n){var i,s,l;return l="/plc/insert"===o.$$path,l?e.mode="Add New":(e.mode="Update",i=n.one("plcs",r.id),i.get().then(function(t){return e.dNam=t.dNam,e.item={},e.item._id=t._id||null,e.item.bdry=t.bdry||"",e.item.nam=t.nam||"",e.item.namS=t.namS||"",e.item.addr=t.addr,e.item.desc=t.desc,e.item.tags=void 0!==t.tags?t.tags.join(","):"",void 0!==t.pt?(e.item.lng=t.pt[0],e.item.lat=t.pt[1]):void 0},s=function(){return console.log("Oops error from server :(")})),e.remove=function(t){var e;return e=confirm("Are you absolutely sure you want to delete?"),e?(i=n.one("plcs",t._id),i.remove().then(function(){return o.path("/plcs")},s=function(){return console.log("Oops error from server :("),o.path("/plc/"+r.id)})):void 0},e.save=function(e){var o,r;return r={},console.log("save"),l?(r="doc="+JSON.stringify(e),o=n.all("plcs"),o.post(r).then(function(){return window.location.href="#"+t.returnRoute},s=function(){return console.log("Oops error from server :(")})):(e.tags="undefined"!==e.tags&&e.tags>""?e.tags.split(","):[],"undefined"!==e.lng&&"undefined"!==e.lat&&(e.pt=[e.lng,e.lat],delete e.lat,delete e.lng),delete e._id,console.log("item",e),r=JSON.stringify({actions:{$set:{flds:e}}}),i.customPUT(null,null,null,r).then(function(){return window.location.href="#"+t.returnRoute},s=function(){return console.log("Oops error from server :(")}))},e.abandonChanges=function(){return o.path("/plc/"+e.item._id)}}]),angular.module("ofApp").controller("PlcViewCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(t,e,o,r,n){var s,l;return s=n.one("plcs",r.id),s.get().then(function(t){return e.item=t,i.call(t,"pt")>=0?(e.lng=t.pt[0],e.lat=t.pt[1]):void 0},l=function(){return console.log("Oops error from server :(")}),e.remove=function(e){var o;return o=confirm("Are you absolutely sure you want to delete?"),o?(s=n.one("plcs",e._id),s.remove().then(function(){return window.location.href="#"+t.returnRoute},l=function(){return console.log("Oops error from server :("),window.location.href="#"+t.returnRoute})):void 0},e.edit=function(t){return o.path("/plc/"+t._id+"/edit")}}])}.call(this);