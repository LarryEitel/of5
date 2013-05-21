"use strict";angular.module("of5App",[]).constant("XCHGLAB_CONFIG",{API_KEY:"testkey"}).config(["$routeProvider",function(t){t.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/plcs",{templateUrl:"views/plcs.html",controller:"PlcsCtrl"}).when("/plc/:id/edit",{templateUrl:"views/plc-edit.html",controller:"PlcEditCtrl"}).when("/plc/:id",{templateUrl:"views/plc-view.html",controller:"PlcViewCtrl"}).otherwise({redirectTo:"/"})}]).factory("Plc",["xchglabResourceHttp",function(t){return t("plcs")}]).factory("User",["xchglabResourceHttp",function(t){return t("users")}]),angular.module("of5App").controller("MainCtrl",["$scope",function(){}]),angular.module("of5App").factory("xchglabResourceHttp",["XCHGLAB_CONFIG","$http",function(t,n){function r(r){var e=angular.extend({BASE_URL:"http://exi.xchg.com/api/"},t),i=e.BASE_URL+r,a={apiKey:e.API_KEY},a={};n.defaults.headers.common.Authorization="Basic admin@orgtec.com:xxxxxx";var o=function(t){return new s(t)},u=function(t){var n,r;if(null!=(null!=t?t._items:void 0)){for(r=[],n=0;t._items.length>n;)r.push(new s(t._items[n])),n++;t._items=r}return t},c=function(t,n,r,e){return t.then(function(t){var r=e(t.data);return(n||angular.noop)(r,t.status,t.headers,t.config),r},function(t){return(r||angular.noop)(void 0,t.status,t.headers,t.config),void 0})},l=function(t){return angular.isObject(t)&&!angular.equals(t,{})?{where:JSON.stringify(t)}:{}},s=function(t){angular.extend(this,t)};return s.query=function(t,r,e,o){var s=function(t){var n={sort:"sort",max_results:"max_results",fields:"fields",skip:"skip",page:"page"},r={};return t&&!angular.equals(t,{})&&angular.forEach(n,function(n,e){angular.isDefined(t[e])&&(r[n]=angular.isObject(t[e])?JSON.stringify(t[e]):t[e])}),r};angular.isFunction(r)&&(o=e,e=r,r={});var p=angular.extend({},a,l(t),s(r)),d=n.get(i,{params:p});return c(d,e,o,u)},s.all=function(t,n,r){return angular.isFunction(t)&&(r=n,n=t,t={}),s.query({},t,n,r)},s.count=function(t,r,e){var o=n.get(i,{params:angular.extend({},a,l(t),{c:!0})});return c(o,r,e,function(t){return t})},s.distinct=function(t,e,i,o){var u=n.post(dbUrl+"/runCommand",angular.extend({},e||{},{distinct:r,key:t}),{params:a});return c(u,i,o,function(t){return t.values})},s.getById=function(t,r,e){var u=n.get(i+"/"+t,{params:a});return c(u,r,e,o)},s.getByObjectIds=function(t,n,r){var e=[];return angular.forEach(t,function(t){e.push({$oid:t})}),s.query({_id:{$in:e}},n,r)},s.prototype.$id=function(){return this._id&&this._id.$oid?this._id.$oid:this._id?this._id:void 0},s.prototype.$save=function(t,r){var e=n.post(i,this,{params:a});return c(e,t,r,o)},s.prototype.$update=function(t,r){var e=n.put(i+"/"+this.$id(),angular.extend({},this,{_id:void 0}),{params:a});return c(e,t,r,o)},s.prototype.$remove=function(t,r){var e=n["delete"](i+"/"+this.$id(),{params:a});return c(e,t,r,o)},s.prototype.$saveOrUpdate=function(t,n,r,e){return this.$id()?this.$update(n,e):this.$save(t,r)},s}return r}]),angular.module("of5App").controller("PlcsCtrl",["$scope","$location","$routeParams","Plc",function(t,n,r,e){t.init=function(){e.query({},{max_results:5},function(n){t.plcs=n;try{t.plcs=n._items}catch(r){error=r,t.plcs=[]}})},t.init(),t.edit=function(t){return n.path("/plc/"+t._id+"/edit")},t.view=function(t){return n.path("/plc/"+t._id)}}]).controller("PlcViewCtrl",["$scope","$routeParams","Plc","User",function(t,n,r){t.init=function(){r.getById(n.id,function(n){t.plc=n,t.lat=n.pts[0],t.lng=n.pts[1]})},t.init()}]).controller("PlcEditCtrl",["$scope","$location","$routeParams","Plc","User",function(t,n,r,e){var i,a,o;return t.init=function(){e.getById(r.id,function(n){o=angular.copy(n),t.plc=n,t.lat=n.pts[0],t.lng=n.pts[1]})},t.init(),a=function(){return n.path("/plcs")},i=function(){throw Error("Something went wrong...")},t.abandonChanges=function(){return n.path("/plcs")},t.hasChanges=function(){return!angular.equals(t.plc,o)}}]);