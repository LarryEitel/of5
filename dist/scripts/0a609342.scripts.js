"use strict";angular.module("of5App",["restangular"]).constant("XCHGLAB_CONFIG",{API_KEY:"testkey"}).config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/plcs",{templateUrl:"views/plcs.html",controller:"PlcsCtrl"}).when("/plc/:id/edit",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl"}).when("/plc/insert",{templateUrl:"views/plc-form.html",controller:"PlcFormCtrl"}).when("/plc/:id",{templateUrl:"views/plc-view.html",controller:"PlcViewCtrl"}).otherwise({redirectTo:"/"})}]).config(["$httpProvider",function(e){e.defaults.headers.common.Authorization="Basic admin@orgtec.com:xxxxxx",e.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"}]).config(["RestangularProvider",function(e){e.setBaseUrl("http://exi.xchg.com/api"),e.setListTypeIsArray(!1),e.setResponseExtractor(function(e){return e})}]),angular.module("of5App").controller("MainCtrl",["$scope","Restangular",function(e,t){var r=t.all("plcs");e.plcs=r.getList()}]),angular.module("of5App").controller("PlcFormCtrl",["$scope","$location","$routeParams","Restangular",function(e,t,r,o){var n="/plc/insert"===t.$$path;if(n)console.log("Insert mode");else{console.log("Edit mode");var l=o.one("plcs",r.id);l.get().then(function(t){e.item=t,void 0!==t.pts&&(e.lat=t.pts[0],e.lng=t.pts[1])},function(){console.log("Oops error from server :(")})}e.remove=function(e){var n=confirm("Are you absolutely sure you want to delete?");if(n){var l=o.one("plcs",e._id);l.remove().then(function(){return t.path("/plcs")},function(){return console.log("Oops error from server :("),t.path("/plc/"+r.id)})}},e.save=function(e){var r="doc="+JSON.stringify(e);if(n){var l=o.all("plcs");l.post(r).then(function(e){return t.path("/plc/"+e.doc._id)})}},e.abandonChanges=function(){return t.path("/plc/"+e.item._id)}}]).controller("PlcsCtrl",["$scope","$location","$routeParams","Restangular",function(e,t,r,o){var n=o.all("plcs");n.getList({where:JSON.stringify({}),max_results:10}).then(function(t){e.items=t._items},function(){console.log("Oops error from server :(")}),e.remove=function(e){var n=confirm("Are you absolutely sure you want to delete?");if(n){var l=o.one("plcs",e._id);l.remove().then(function(){return t.path("/plcs")},function(){return console.log("Oops error from server :("),t.path("/plc/"+r.id)})}},e.insert=function(){return t.path("/plc/insert")},e.edit=function(e){return t.path("/plc/"+e._id+"/edit")},e.view=function(e){return t.path("/plc/"+e._id)}}]).controller("PlcViewCtrl",["$scope","$location","$routeParams","Restangular",function(e,t,r,o){var n=o.one("plcs",r.id);n.get().then(function(t){e.item=t,void 0!==t.pts&&(e.lat=t.pts[0],e.lng=t.pts[1])},function(){console.log("Oops error from server :(")}),e.remove=function(e){var n=confirm("Are you absolutely sure you want to delete?");if(n){var l=o.one("plcs",e._id);l.remove().then(function(){return t.path("/plcs")},function(){return console.log("Oops error from server :("),t.path("/plc/"+r.id)})}}}]);