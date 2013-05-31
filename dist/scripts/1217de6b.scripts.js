"use strict";angular.module("of5App",["restangular","ui.bootstrap","ui.keypress"]).constant("XCHGLAB_CONFIG",{API_KEY:"testkey"}).config(["$routeProvider",function(r){r.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/plcs",{templateUrl:"views/plcs.html",controller:"PlcsCtrl"}).when("/plc/:id/edit",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl"}).when("/plc/insert",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl"}).when("/plc/:id",{templateUrl:"views/plc-view.html",controller:"PlcViewCtrl"}).otherwise({redirectTo:"/"})}]).config(["$httpProvider",function(r){r.defaults.headers.common.Authorization="Basic admin@orgtec.com:xxxxxx",r.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"}]).config(["RestangularProvider",function(r){r.setBaseUrl("http://exi.xchg.com/api"),r.setListTypeIsArray(!1),r.setResponseExtractor(function(r){return r})}]),angular.module("of5App").controller("MainCtrl",["$scope","Restangular",function(r,e){var o=e.all("plcs");r.plcs=o.getList()}]),angular.module("of5App").controller("PlcsCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(r,e,o,t,n){var c={cngSlug:"crherbs",cngAreaSlug:"crherbsca",cngAreaTerrSlug:"crherbsca12",q:"",sort:"bdry,w",filter:"cngAreaTerr:crherbs",pp:5,pg:5};e.items=[],e.lastItemsWithInfo=null,e.maxId=null,e.q=t.q||c.q,e.pp=t.pp||c.pp,e.pg=t.pg||c.pg,e.sort=t.sort||c.sort,e.args=c,e.cngs=[{slug:"crherbs",nam:"Belen Sur"}],e.cngAreas=[{bdry:"crherbs",slug:"crherbsca",nam:"Cariari"},{bdry:"crherbs",slug:"crherbsla",nam:"Los Arcos"}],e.cngAreaTerrs=[{bdry:"crherbsca",slug:"crherbsca01",nam:"CA-01 (bogus)"},{bdry:"crherbsca",slug:"crherbsca12",nam:"CA-12"},{bdry:"crherbsla",slug:"crherbsla01",nam:"LA-01 (bogus)"},{bdry:"crherbsla",slug:"crherbsla02",nam:"LA-02 (bogus)"}],t.sort||(t.sort=c.sort),r.returnRoute=o.$$url,e.location=o,e.routeParams=t,e.$watch("cngAreaTerrId",function(r){o.search("cngAreaTerrId",r),e.cngAreaTerrId=r}),e.$watch("routeParams",function(r){return angular.forEach(r,function(r,t){return"where"!==t?(e[t]=r,o.search(t,r)):void 0})},!0);var a=n.all("plcs");e.doClear=function(){e.q=e.location.q=e.routeParams.q=c.q,e.cngId=e.location.cngId=e.routeParams.cngId=c.cngId,e.cngAreaId=e.location.cngAreaId=e.routeParams.cngAreaId=c.cngAreaId,e.cngAreaTerrId=e.location.cngAreaTerrId=e.routeParams.cngAreaTerrId=c.cngAreaTerrId,e.doSearch()},e.doSearch=function(){var r={},n={};e.q&&(n.dNam={$regex:e.q,$options:"i"}),"boolean"!=typeof t.cngAreaTerrId&&t.cngAreaTerrId&&(n.bdry=t.cngAreaTerrId),n&&(r.where=JSON.stringify(n)),t.sort&&(r.sort=t.sort),a.getList(r).then(function(r){e.items=r._items,e.q&&o.search("q",e.q)},function(){console.log("Oops error from server :(")})},e.add=function(){var r="doc="+JSON.stringify(e.newItem),o=n.all("plcs");o.post(r).then(function(r){e.newItem._id=r.doc._id,e.items.push(e.newItem),e.newItem={},e.myForm.$setPristine(),e.myForm.$pristine=!0})},e.remove=function(r){var c=confirm("Are you absolutely sure you want to delete?");if(c){var a=e.items[r],l=n.one("plcs",a._id);l.remove().then(function(){e.items.splice(r,1)},function(){return console.log("Oops error from server :("),o.path("/plc/"+t.id)})}},e.insert=function(){return o.path("/plc/insert")},e.edit=function(r){var t=e.items[r];return o.path("/plc/"+t._id+"/edit")},e.view=function(r){var t=e.items[r];return o.path("/plc/"+t._id)},e.doSearch()}]).controller("PlcFormCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(r,e,o,t,n){var c="/plc/insert"===o.$$path;if(c)e.mode="Add New";else{e.mode="Update";var a=n.one("plcs",t.id);a.get().then(function(r){e.dNam=r.dNam,e.item={},e.item._id=r._id||null,e.item.bdry=r.bdry||"",e.item.nam=r.nam||"",e.item.namS=r.namS||"",e.item.addr=r.addr,e.item.desc=r.desc,e.item.tags=void 0!==r.tags?r.tags.join(","):"",void 0!==r.pt&&(e.item.lng=r.pt[0],e.item.lat=r.pt[1])},function(){console.log("Oops error from server :(")})}e.remove=function(r){var e=confirm("Are you absolutely sure you want to delete?");if(e){var c=n.one("plcs",r._id);c.remove().then(function(){return o.path("/plcs")},function(){return console.log("Oops error from server :("),o.path("/plc/"+t.id)})}},e.save=function(e){var o={};if(console.log("save"),c){o="doc="+JSON.stringify(e);var t=n.all("plcs");t.post(o).then(function(){window.location.href="#"+r.returnRoute},function(){console.log("Oops error from server :(")})}else e.tags=void 0!==e.tags&&e.tags>""?e.tags.split(","):[],void 0!==e.lng&&void 0!==e.lat&&(e.pt=[e.lng,e.lat],delete e.lat,delete e.lng),delete e._id,console.log("item",e),o=JSON.stringify({actions:{$set:{flds:e}}}),a.customPUT(void 0,void 0,void 0,o).then(function(){window.location.href="#"+r.returnRoute},function(){console.log("Oops error from server :(")})},e.abandonChanges=function(){return o.path("/plc/"+e.item._id)}}]).controller("PlcViewCtrl",["$rootScope","$scope","$location","$routeParams","Restangular",function(r,e,o,t,n){var c=n.one("plcs",t.id);c.get().then(function(r){e.item=r,void 0!==r.pt&&(e.lng=r.pt[0],e.lat=r.pt[1])},function(){console.log("Oops error from server :(")}),e.remove=function(e){var o=confirm("Are you absolutely sure you want to delete?");if(o){var t=n.one("plcs",e._id);t.remove().then(function(){window.location.href="#"+r.returnRoute},function(){console.log("Oops error from server :("),window.location.href="#"+r.returnRoute})}},e.edit=function(r){return o.path("/plc/"+r._id+"/edit")}}]);