var bdysJson='{"bsbr08": {"pts": [[9.970634375109034, -84.16662862265946], [9.969907681451806, -84.16657379040629], [9.96918575418298, -84.16650864293284], [9.96943374126796, -84.16599287415393], [9.969851338243716, -84.16521112187816], [9.970192424609472, -84.1644953963647], [9.970381346368669, -84.16399504832715], [9.970414333758404, -84.16356338864574], [9.970860827824179, -84.16358807368938], [9.971522431696373, -84.1636944279533], [9.971865267262292, -84.16377292236123], [9.97160925842014, -84.16415504435048], [9.971549964164529, -84.1645948033377], [9.971502592657677, -84.16497758355433], [9.971482064948713, -84.16534208232451], [9.971453921969445, -84.1657601923639], [9.971431254046498, -84.16631665124032], [9.971410736324534, -84.1666766097517], [9.970634375109034, -84.16662862265946]]}, "bsbr06": {"pts": [[9.968973408638314, -84.16704810218715], [9.968834630162002, -84.16738249091311], [9.968687859338182, -84.16774137804002], [9.968576842974961, -84.16801182972485], [9.968357135937447, -84.16856601952634], [9.968235536849983, -84.1688600789591], [9.968290364601158, -84.1689382478004], [9.968185140827481, -84.16925035558872], [9.968071991033325, -84.16959979567874], [9.967896742305653, -84.17004978516898], [9.967619131169556, -84.1698935282033], [9.967423552934315, -84.16974591816535], [9.967035306551264, -84.16945708532839], [9.966685131806567, -84.16939843670873], [9.966378287697097, -84.1691726710474], [9.966023354857446, -84.16893273823939], [9.965734303225522, -84.16857025333104], [9.965613440668452, -84.16826787236042], [9.965819326733603, -84.16803068108251], [9.965957335661212, -84.16799686820771], [9.966182771570422, -84.16790301677798], [9.966307864428352, -84.16775732151905], [9.96656028368469, -84.16746657050498], [9.966602035273382, -84.1673851778044], [9.966674270744669, -84.16718030471891], [9.966646242740357, -84.16689545065421], [9.966659298405238, -84.16670404110766], [9.966688356310634, -84.16638654621703], [9.966646786420888, -84.1661875138058], [9.967314722075486, -84.16630549476103], [9.967907745506793, -84.16639133922605], [9.968658444907955, -84.16649284406267], [9.969173790522499, -84.16652434615186], [9.968973408638314, -84.16704810218715]]}}',data,bdys=JSON.parse(bdysJson);(function(t){t.userRoles={"public":1,user:2,admin:4},t.accessLevels={"public":7,anon:1,user:6,admin:4}})("undefined"==typeof exports?this.routingConfig={}:exports),function(){"use strict";var t,e,o,r,n,s=function(t,e){return function(){return t.apply(e,arguments)}};n=function(t){return t.lat+","+t.lng},r=function(t){var e;return e=t.split(","),{lat:e[0],lng:e[1]}},o=function(){function t(t,e,o){var r,n,i;for(this.map=t,this.pts=e,this.bdyData=null!=o?o:null,this.click=s(this.click,this),this.show=s(this.show,this),this.gmaps=google.maps,this.coords=[],n=0,i=e.length;i>n;n++)r=e[n],this.coords.push(new this.gmaps.LatLng(r[0],r[1]));this.bdy=new this.gmaps.Polygon({paths:this.coords,strokeColor:"red",strokeOpacity:.8,strokeWeight:2}),this.bdy.setMap(this.map),console.log(this.bdy)}return t.prototype.render=function(){return console.log("render")},t.prototype.show=function(){},t.prototype.click=function(){return console.log("mkrClick")},t}(),t=function(){function t(t){this.onTypeChange=s(this.onTypeChange,this),this.onZoomChange=s(this.onZoomChange,this),this.updateLocation=s(this.updateLocation,this),this.onCenterChanged=s(this.onCenterChanged,this),this.resizeMapEl=s(this.resizeMapEl,this),this.onDragEnd=s(this.onDragEnd,this),this.setCenter=s(this.setCenter,this),this.onDragStart=s(this.onDragStart,this),this.removeMkrs=s(this.removeMkrs,this),this.addPlcMkr=s(this.addPlcMkr,this),this.addBdy=s(this.addBdy,this),this.onClick=s(this.onClick,this);var e;this.rootScope=t.rootScope,this.dragging=0,this.location=t.location,this.routeParams=t.routeParams,this.zoom=parseInt(this.location.search().z)||t.zoom,this.mapType=this.location.search().t||t.mapType,this.ll=this.location.search().ll||t.ll,this.center=this.ll?r(this.ll):t.center,this.routeParams.ll=this.ll,this.mapEl=$("#map"),this.mapTypes={m:"roadmap",h:"hybrid"},this.map=new google.maps.Map(this.mapEl[0],{zoom:this.zoom,center:new google.maps.LatLng(this.center.lat,this.center.lng),mapTypeId:this.mapTypes[this.mapType]}),e=google.maps.event.addListener,e(this.map,"center_changed",this.onCenterChanged),e(this.map,"maptypeid_changed",this.onTypeChange),e(this.map,"zoom_changed",this.onZoomChange),e(this.map,"dragstart",this.onDragStart),e(this.map,"dragend",this.onDragEnd),e(this.map,"click",this.onClick),this.rootScope.protocol=this.location.protocol(),this.rootScope.host=this.location.host(),this.rootScope.mapCenter=this.center,this.rootScope.mapZoom=this.zoom,this.rootScope.mapTypeId=this.mapTypeId}return t.prototype.onClick=function(t){var e,o;return console.log("onClick.@rootScope.selectedItemIndex",this.rootScope.selectedItemIndex),console.log("clicked at:",t,[t.latLng.lat(),t.latLng.lng()]),this.rootScope.selectedItemIndex>-1?(o=this.rootScope.selectedItem,o.pt=[t.latLng.lat(),t.latLng.lng()],this.addPlcMkr(this.map,o),e=JSON.stringify({actions:{$set:{flds:{pt:o.pt}}}}),o.patch(o._id,e),this.rootScope.selectedItemIndex=-1,this.rootScope.$$phase||this.rootScope.$apply()):void 0},t.prototype.addBdy=function(t,e){return console.log("addBdy"),new o(t,e.pts,e)},t.prototype.addPlcMkr=function(t,o){var r,n,s,i,a;return n=this.icon(o),i=o.pt[0],a=o.pt[1],r=!0,s={_id:o._id,id:o.id,mkrNo:o.mkrNo,dNam:o.dNam,patch:o.patch},new e(t,i,a,n,r,s)},t.prototype.removeMkrs=function(){return this.rootScope.items?angular.forEach(this.rootScope.items,function(t){return t.mapMkr?t.mapMkr.marker.setMap(null):void 0}):void 0},t.prototype.onDragStart=function(){return this.dragging=!0,!0},t.prototype.setCenter=function(){return console.log("setCenter",this.center)},t.prototype.onDragEnd=function(){return this.dragging=!1,this.onCenterChanged()},t.prototype.resizeMapEl=function(){},t.prototype.onCenterChanged=function(){var t;return t=this.map.getCenter(),this.center.lat=t.lat(),this.center.lng=t.lng(),this.dragging?void 0:(this.rootScope.mapCenter=this.center,this.ll=n(this.center),this.routeParams.ll=this.ll,this.updateLocation())},t.prototype.updateLocation=function(){return this.rootScope.$$phase||this.rootScope.$apply()},t.prototype.onZoomChange=function(){return this.rootScope.mapZoom=this.zoom=this.map.getZoom(),this.routeParams.z=this.zoom,this.updateLocation()},t.prototype.onTypeChange=function(){return this.mapTypeId=this.map.getMapTypeId(),this.rootScope.mapTypeId=this.mapTypeId[0],this.routeParams.t=this.mapTypeId[0],this.updateLocation()},t}(),e=function(){function t(t,e,o,r,n,i){this.map=t,this.lat=e,this.lng=o,this.icon=null!=r?r:null,this.draggable=null!=n?n:!0,this.itemData=null!=i?i:null,this.click=s(this.click,this),this.show=s(this.show,this),this.dragend=s(this.dragend,this),this.gmaps=google.maps,this.position=new this.gmaps.LatLng(this.lat,this.lng),this.marker=new this.gmaps.Marker({draggable:this.draggable,icon:this.icon}),this.gmaps.event.addListener(this.marker,"dragend",this.dragend),this.gmaps.event.addListener(this.marker,"click",this.click),this.marker.setPosition(this.position),this.marker.setMap(this.map)}return t.prototype.render=function(){return console.log("render"),this.show()},t.prototype.dragend=function(t){var e;return e=JSON.stringify({actions:{$set:{flds:{pt:[t.latLng.lat(),t.latLng.lng()]}}}}),this.itemData.patch(this.itemData._id,e)},t.prototype.show=function(){return this.marker.setPosition(this.position),this.marker.setMap(this.map)},t.prototype.click=function(){return console.log("mkrClick")},t}(),angular.module("ofApp",["restangular","ngCookies","ui.bootstrap"]),angular.module("ofApp").config(["$httpProvider",function(t){return t.defaults.headers.common.Authorization="Basic admin@orgtec.com:xxxxxx",t.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",t.defaults.headers.post["Content-Type"]}]),angular.module("ofApp").config(["RestangularProvider",function(t){return t.setBaseUrl("http://exi.xchg.com/api"),t.setListTypeIsArray(!1),t.setResponseExtractor(function(t,e,o){return"users"===o&&"getList"===e&&localStorage.setItem("lsuser",JSON.stringify(t._items[0])),t})}]),angular.module("ofApp").config(["$routeProvider","$locationProvider","$httpProvider",function(t,e,o){var r,n;return r=routingConfig.accessLevels,t.when("/plcs",{templateUrl:"views/plcs.html",controller:"PlcsCtrl",access:r.anon}),t.when("/plc/:id/edit",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl",access:r.anon}),t.when("/plc/insert",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl",access:r.anon}),t.when("/plc/:id",{templateUrl:"views/plc-view.html",controller:"PlcViewCtrl",access:r.anon}),t.when("/",{templateUrl:"views/partials/home.html",controller:"HomeCtrl",access:r.user}),t.when("/login",{templateUrl:"views/partials/login.html",controller:"LoginCtrl",access:r.anon}),t.when("/logout",{templateUrl:"views/partials/logout.html",controller:"LogoutCtrl",access:r.user}),t.when("/register",{templateUrl:"views/partials/register.html",controller:"RegisterCtrl",access:r.anon}),t.when("/private",{templateUrl:"/partials/private",controller:"PrivateCtrl",access:r.user}),t.when("/admin",{templateUrl:"/partials/admin",controller:"AdminCtrl",access:r.admin}),t.when("/404",{templateUrl:"views/partials/404.html",access:r["public"]}),t.otherwise({redirectTo:"/404"}),n=["$location","$q",function(t,e){var o,r;return r=function(t){return t},o=function(o){return 401===o.status?(t.path("/login"),e.reject(o)):e.reject(o)},function(t){return t.then(r,o)}}],o.responseInterceptors.push(n)}]),n=function(t){return t.lat+","+t.lng},r=function(t){var e;return e=t.split(","),{lat:e[0],lng:e[1]}},angular.module("ofApp").factory("GoogleMap",["$rootScope","$location","$routeParams",function(e,o,r){var s,i,a,l,c,u;return i={lat:9.993552791991132,lng:-84.20888416469096},s={lat:9.971365509675179,lng:-84.16658163070679},a=s,l=16,c={rootScope:e,location:o,routeParams:r,zoom:l,mapType:"h",ll:n(a),center:{lat:a.lat,lng:a.lng}},u=0,new t(c)}]),angular.module("ofApp").run(["$rootScope","$location","Auth",function(t,e,o){return t.$on("$routeChangeStart",function(r,n){return t.error=null,(o.authorize(n.access)?void 0:o.isLoggedIn())?void 0:e.path("/login")}),t.appInitialized=!0}])}.call(this),function(){"use strict";angular.module("ofApp").factory("Auth",["Restangular","$http","$rootScope","$cookieStore",function(t,e,o){var r,n;return r=routingConfig.accessLevels,n=routingConfig.userRoles,localStorage.getItem("lsuser")&&(o.user=JSON.parse(localStorage.getItem("lsuser"))),o.accessLevels=r,o.userRoles=n,{authorize:function(t,e){return void 0!==e?!0:!1},isLoggedIn:function(t){return void 0===t?t=o.user:void 0},register:function(t,o,r){return e.post("/register",t).success(o).error(r)},login:function(e,r){var n;return n=t.all("users"),n.getList({where:JSON.stringify({uNam:e.username})}).then(function(t){return t._items.length?(e=t._items[0],o.user=e,r(e)):void 0},function(){return $location.path("/")},function(){return o.error="Failed to login"})},logout:function(t,r){return e.post("/logout").success(function(){return o.user.uNam="",t()}).error(r)},accessLevels:r,userRoles:n}}])}.call(this),angular.module("ofApp").controller("AppCtrl",["$rootScope","$scope","$location","Auth",function(t,e,o,r){e.getUserRoleText=function(t){return _.invert(r.userRoles)[t]},e.logout=function(){r.logout(function(){o.path("/login")},function(){t.error="Failed to logout"})}}]),angular.module("ofApp").controller("LoginCtrl",["$rootScope","$scope","$location","Auth",function(t,e,o,r){t.activeNavItem="login",e.rememberme=!0,e.login=function(){localStorage.removeItem("lsuser"),r.login({username:e.username,password:e.password,rememberme:e.rememberme},function(){o.path("/")},function(){t.error="Failed to login"})}}]),angular.module("ofApp").controller("LogoutCtrl",["$rootScope","$location",function(t,e){localStorage.removeItem("lsuser"),delete t.user,e.path("/")}]),angular.module("ofApp").controller("HomeCtrl",["$rootScope",function(t){t.activeNavItem="home"}]),angular.module("ofApp").controller("RegisterCtrl",["$rootScope","$scope","$location","Auth",function(t,e,o,r){t.activeNavItem="register",e.role=routingConfig.userRoles.user,e.register=function(){r.register({username:e.username,password:e.password,role:e.role},function(e){t.user=e,o.path("/")},function(e){t.error=e})}}]),angular.module("ofApp").controller("PrivateCtrl",["$rootScope",function(t){t.activeNavItem="private"}]),angular.module("ofApp").controller("AdminCtrl",["$rootScope","$scope","Users",function(t,e,o){t.activeNavItem="admin",e.loading=!0,o.getAll(function(t){e.users=t,e.loading=!1},function(){t.error="Failed to fetch users.",e.loading=!1})}]),angular.module("ofApp").directive("accessLevel",["$rootScope","Auth",function(t,e){return{restrict:"A",link:function(o,r,n){var s=r.css("display");t.$watch("user.role",function(){e.authorize(n.accessLevel)?r.css("display",s):r.css("display","none")})}}}]).directive("autoFillableField",function(){return{restrict:"A",require:"?ngModel",link:function(t,e,o,r){setInterval(function(){""===e.val()&&r.$pristine||t.$apply(function(){r.$setViewValue(e.val())})},300)}}}),angular.module("ofApp").controller("MainCtrl",["$scope","Restangular",function(t,e){var o=e.all("plcs");t.plcs=o.getList()}]),function(){"use strict";var t,e,o,r;e=function(t){return t.lat+","+t.lng},t=function(t){var e;return e=t.split(","),{lat:e[0],lng:e[1]}},r="img/map/sprites/",o=19,angular.module("ofApp").controller("PlcsCtrl",["$rootScope","$scope","$location","$routeParams","Restangular","$timeout","$log","$anchorScroll","GoogleMap",function(t,n,s,i,a,l,c,u,p){var d,h,m,g,f,v;return m=p,g=google.maps,f=m.map,h={ll:"9.971365509675179,-84.16658163070679",cngSlug:"crherbs",cngAreaSlug:"br",cngAreaTerrSlug:"br06",q:"",sort:"bdry,w",filter:"cngAreaTerr:crherbs",z:17,pp:5,pg:5},n.items=[],n.lastItemsWithInfo=null,n.maxId=null,n.q=i.q||h.q,n.ll=i.ll||h.ll,console.log("ll",n.ll),n.z=parseInt(i.z,10)||h.z,n.pp=i.pp||h.pp,n.pg=i.pg||h.pg,n.sort=i.sort||h.sort,n.args=h,t.selectedItemIndex=m.selectedItem=m.selectedItemIndex=-1,t.bdys=n.bdys={crherbsbr06:{slug:"crherbsbr06",cPt:{lat:9.968153195552807,lng:-84.16725754737854},zoom:18,mapTypeId:"hybrid",nam:"Bosques Doña Rosa #06",pts:[[9.970634375109034,-84.16662862265946],[9.969907681451806,-84.16657379040629],[9.96918575418298,-84.16650864293284],[9.96943374126796,-84.16599287415393],[9.969851338243716,-84.16521112187816],[9.970192424609472,-84.1644953963647],[9.970381346368669,-84.16399504832715],[9.970414333758404,-84.16356338864574],[9.970860827824179,-84.16358807368938],[9.971522431696373,-84.1636944279533],[9.971865267262292,-84.16377292236123],[9.97160925842014,-84.16415504435048],[9.971549964164529,-84.1645948033377],[9.971502592657677,-84.16497758355433],[9.971482064948713,-84.16534208232451],[9.971453921969445,-84.1657601923639],[9.971431254046498,-84.16631665124032],[9.971410736324534,-84.1666766097517]]},crherbsbr08:{slug:"crherbsbr08",cPt:{lat:9.970424700092135,lng:-84.1655137742861},zoom:18,mapTypeId:"hybrid",nam:"Bosques Doña Rosa #08",pts:[[9.968973408638314,-84.16704810218715],[9.968834630162002,-84.16738249091311],[9.968687859338182,-84.16774137804002],[9.968576842974961,-84.16801182972485],[9.968357135937447,-84.16856601952634],[9.968235536849983,-84.1688600789591],[9.968290364601158,-84.1689382478004],[9.968185140827481,-84.16925035558872],[9.968071991033325,-84.16959979567874],[9.967896742305653,-84.17004978516898],[9.967619131169556,-84.1698935282033],[9.967423552934315,-84.16974591816535],[9.967035306551264,-84.16945708532839],[9.966685131806567,-84.16939843670873],[9.966378287697097,-84.1691726710474],[9.966023354857446,-84.16893273823939],[9.965734303225522,-84.16857025333104],[9.965613440668452,-84.16826787236042],[9.965819326733603,-84.16803068108251],[9.965957335661212,-84.16799686820771],[9.966182771570422,-84.16790301677798],[9.966307864428352,-84.16775732151905],[9.96656028368469,-84.16746657050498],[9.966602035273382,-84.1673851778044],[9.966674270744669,-84.16718030471891],[9.966646242740357,-84.16689545065421],[9.966659298405238,-84.16670404110766],[9.966688356310634,-84.16638654621703],[9.966646786420888,-84.1661875138058],[9.967314722075486,-84.16630549476103],[9.967907745506793,-84.16639133922605],[9.968658444907955,-84.16649284406267],[9.969173790522499,-84.16652434615186]]}},n.cngAreaTerrs=[{slug:"crherbsbr06",nam:"br06-Bosques Doña Rosa 06"},{slug:"crherbsbr08",nam:"br08-Bosques Doña Rosa 08"}],i.sort||(i.sort=h.sort),t.returnRoute=s.$$url,n.location=s,n.routeParams=i,t.$watch("selectedItemIndex",function(e){return n.selectedItem=t.selectedItem,t.selectedItemIndex=n.selectedItemIndex=e}),m.icon=function(t){return n.mkrIcon(t.mkrNo,t.mkrState)},n.itemMkrClick=function(r){var i;return t.selectedItemIndex=m.selectedItemIndex=n.selectedItemIndex=r,t.selectedItem=m.selectedItem=n.items[r],f.setZoom(o),n.items[r].pt&&(t.selectedItemIndex=m.selectedItemIndex=n.selectedItemIndex=-1,i=n.items[r].pt,n.ll=e(i),f.setCenter(new google.maps.LatLng(i[0],i[1]))),s.hash("top"),u()},n.doSearch=function(){var e,o,r,a,l,c,u;if(e={},l=n.q,u={},"boolean"!=typeof i.cngAreaTerrId&&i.cngAreaTerrId&&(u.bdry=i.cngAreaTerrId),c=l.match(/qp\w+/g)){for(a=[],r=0;c.length>r;)console.log(c[r]),a.push(c[r].substr(2)),++r;u.id={$in:a},l=l.replace(/qp\w+\s*/g,"")}return l&&(u.dNam={$regex:l,$options:"i"}),u&&(e.where=JSON.stringify(u)),i.sort&&(e.sort=i.sort),d.getList(e).then(function(e){var o,i,a,l;for(m.removeMkrs(),l=e._items,r=i=0,a=l.length;a>i;r=++i)o=l[r],e._items[r].patch=n.patch,o.pt&&(console.log("adding pt"),e._items[r].mapMkr=m.addPlcMkr(f,o));return t.items=n.items=e._items,n.q?s.search("q",n.q):void 0},o=function(){return console.log("Oops error from server :(")}),n.loadBdys()},n.loadBdys=function(){var t,e,o,r;console.log("loadBdys"),o=n.bdys,r=[];for(e in o)t=o[e],r.push(m.addBdy(f,t));return r},n.patch=function(t,e){var o,r;return o=a.one("plcs",t),o.customPUT("undefined","undefined","undefined",e).then(function(){return console.log("success!")},r=function(){return console.log("Oops error from server :(")})},n.$watch("z",function(t){return s.search("z",t),n.z=parseInt(t,10)}),n.$watch("cngAreaTerrId",function(t){var e,o;return s.search("cngAreaTerrId",t),n.cngAreaTerrId=t,t&&"string"==typeof t&&i.cngAreaTerrId!==t?(e=n.bdys[t],o=e.cPt,f.setCenter(new google.maps.LatLng(o.lat,o.lng)),f.setZoom(e.zoom),f.setMapTypeId(e.mapTypeId),n.cngAreaTerrId=t,i.cngAreaTerrId=t):void 0}),n.$watch("routeParams",function(t){return angular.forEach(t,function(t,e){return"where"!==e?(n[e]=t,s.search(e,t)):void 0})},!0),d=a.all("plcs"),v={},n.doClear=function(){return n.q=n.location.q=n.routeParams.q=h.q,n.doSearch()},n.add=function(){var t;return t="doc="+JSON.stringify(n.newItem),d=a.all("plcs"),d.post(t).then(function(t){return n.newItem._id=t.doc._id,n.items.push(n.newItem),n.newItem={}})},n.remove=function(t){var e,o,r,l;return o=confirm("Are you absolutely sure you want to delete?"),o?(l=n.items[t],e=a.one("plcs",l._id),e.remove().then(function(){return n.items.splice(t,1)},r=function(){return console.log("Oops error from server :("),s.path("/plc/"+i.id)})):void 0},n.insert=function(){return s.path("/plc/insert")},n.edit=function(t){var e;return e=n.items[t],s.path("/plc/"+e._id+"/edit")},n.view=function(t){var e;return e=n.items[t],s.path("/plc/"+e._id)},n.mkrIcon=function(t,e){var o,n,s,i,a,l,c;return null==e&&(e=0),i=["new","try_1","try_1_contacted","try_2","try_2_contacted","try_3","try_3_contacted"],n=void 0,s=void 0,a=void 0,l=void 0,c=void 0,10>t?(a=r+"sprite_1.png",s=12,l=(t-1)*s,c=e*n):100>t?(a=r+"sprite_2.png",s=16,l=(t-10)*s,c=e*n):(a=r+"sprite_3.png",s=20,l=(t-100)*s,c=e*n),c&&(c+=1),t&&"undefined"!==e&&(o=new google.maps.MarkerImage(a,new google.maps.Size(s,12),new google.maps.Point(l,c))),o},n.doSearch()}]),angular.module("ofApp").controller("PlcFormCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(t,e,o,r,n){var s,i,a;return a="/plc/insert"===o.$$path,a?e.mode="Add New":(e.mode="Update",s=n.one("plcs",r.id),s.get().then(function(t){return e.dNam=t.dNam,e.item={},e.item._id=t._id||null,e.item.bdry=t.bdry||"",e.item.nam=t.nam||"",e.item.namS=t.namS||"",e.item.addr=t.addr,e.item.desc=t.desc,e.item.tags=void 0!==t.tags?t.tags.join(","):"",void 0!==t.pt?(e.item.lng=t.pt[0],e.item.lat=t.pt[1]):void 0},i=function(){return console.log("Oops error from server :(")})),e.remove=function(t){var e;return e=confirm("Are you absolutely sure you want to delete?"),e?(s=n.one("plcs",t._id),s.remove().then(function(){return o.path("/plcs")},i=function(){return console.log("Oops error from server :("),o.path("/plc/"+r.id)})):void 0},e.save=function(e){var o,r;return r={},console.log("save"),a?(r="doc="+JSON.stringify(e),o=n.all("plcs"),o.post(r).then(function(){return window.location.href="#"+t.returnRoute},i=function(){return console.log("Oops error from server :(")})):(e.tags="undefined"!==e.tags&&e.tags>""?e.tags.split(","):[],"undefined"!==e.lng&&"undefined"!==e.lat&&(e.pt=[e.lng,e.lat],delete e.lat,delete e.lng),delete e._id,console.log("item",e),r=JSON.stringify({actions:{$set:{flds:e}}}),s.customPUT("undefined","undefined","undefined",r).then(function(){return window.location.href="#"+t.returnRoute},i=function(){return console.log("Oops error from server :(")}))},e.abandonChanges=function(){return o.path("/plc/"+e.item._id)}}]),angular.module("ofApp").controller("PlcViewCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(t,e,o,r,n){var s,i;return s=n.one("plcs",r.id),s.get().then(function(t){return e.item=t,"undefined"!==t.pt?(e.lng=t.pt[0],e.lat=t.pt[1]):void 0},i=function(){return console.log("Oops error from server :(")}),e.remove=function(e){var o;return o=confirm("Are you absolutely sure you want to delete?"),o?(s=n.one("plcs",e._id),s.remove().then(function(){return window.location.href="#"+t.returnRoute},i=function(){return console.log("Oops error from server :("),window.location.href="#"+t.returnRoute})):void 0},e.edit=function(t){return o.path("/plc/"+t._id+"/edit")}}])}.call(this);