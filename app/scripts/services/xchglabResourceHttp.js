'use strict';

// angular.module('of5App')
//   .factory('xchglabResourceHttp', function () {
//     // Service logic
//     // ...

//     var meaningOfLife = 42;

//     // Public API here
//     return {
//       someMethod: function () {
//         return meaningOfLife;
//       }
//     };
//   });


angular.module('of5App')
  .factory('xchglabResourceHttp', ['XCHGLAB_CONFIG', '$http', function (XCHGLAB_CONFIG, $http) {

    function XchglabResourceFactory(resource) {

        var config = angular.extend({
            BASE_URL: "http://exi.xchg.com/api/"
        }, XCHGLAB_CONFIG);

        var endpoint = config.BASE_URL + resource;
        var defaultParams = {apiKey: config.API_KEY};
        var defaultParams = {};
        $http.defaults.headers.common['Authorization'] = 'Basic admin@orgtec.com:xxxxxx';

        var resourceRespTransform = function (data) {
            return new Resource(data);
        };

        var resourcesArrayRespTransform = function (data) {
            var i, items;

            if ((data != null ? data._items : void 0) != null) {
                items = [];
                i = 0;
                while (i < data['_items'].length) {
                    items.push(new Resource(data['_items'][i]));
                    i++;
                }
                data['_items'] = items;
            }
            return data;
        };

        var promiseThen = function (httpPromise, successcb, errorcb, fransformFn) {
            return httpPromise.then(function (response) {
                var result = fransformFn(response.data);
                (successcb || angular.noop)(result, response.status, response.headers, response.config);
                return result;
            }, function (response) {
                (errorcb || angular.noop)(undefined, response.status, response.headers, response.config);
                return undefined;
            });
        };

        var preparyQueryParam = function (queryJson) {
            return angular.isObject(queryJson) && !angular.equals(queryJson, {}) ? {'where': JSON.stringify(queryJson)} : {};
        };

        var Resource = function (data) {
            angular.extend(this, data);
        };

        Resource.query = function (queryJson, options, successcb, errorcb) {

            var prepareOptions = function (options) {

                var optionsMapping = {sort: 'sort', max_results: 'max_results', fields: 'fields', skip: 'skip', page: 'page'};
                var optionsTranslated = {};

                if (options && !angular.equals(options, {})) {
                    angular.forEach(optionsMapping, function (targetOption, sourceOption) {
                        if (angular.isDefined(options[sourceOption])) {
                            if (angular.isObject(options[sourceOption])) {
                                optionsTranslated[targetOption] = JSON.stringify(options[sourceOption]);
                            } else {
                                optionsTranslated[targetOption] = options[sourceOption];
                            }
                        }
                    });
                }
                return optionsTranslated;
            };

            if (angular.isFunction(options)) {
                errorcb = successcb;
                successcb = options;
                options = {};
            }

            var requestParams = angular.extend({}, defaultParams, preparyQueryParam(queryJson), prepareOptions(options));

            //endpoint += preparyQueryParam(queryJson);
            // var httpPromise = $http.get(endpoint);
            var httpPromise = $http.get(endpoint, {params:requestParams});


            return promiseThen(httpPromise, successcb, errorcb, resourcesArrayRespTransform);
        };

        Resource.all = function (options, successcb, errorcb) {
            if (angular.isFunction(options)) {
                errorcb = successcb;
                successcb = options;
                options = {};
            }
            return Resource.query({}, options, successcb, errorcb);
        };

        Resource.count = function (queryJson, successcb, errorcb) {
            var httpPromise = $http.get(endpoint, {
                params: angular.extend({}, defaultParams, preparyQueryParam(queryJson), {c: true})
            });
            return promiseThen(httpPromise, successcb, errorcb, function (data) {
                return data;
            });
        };

        Resource.distinct = function (field, queryJson, successcb, errorcb) {
            var httpPromise = $http.post(dbUrl + '/runCommand', angular.extend({}, queryJson || {}, {
                distinct: resource,
                key: field}), {
                params: defaultParams
            });
            return promiseThen(httpPromise, successcb, errorcb, function (data) {
                return data.values;
            });
        };

        Resource.getById = function (id, successcb, errorcb) {
            var httpPromise = $http.get(endpoint + '/' + id, {params: defaultParams});
            return promiseThen(httpPromise, successcb, errorcb, resourceRespTransform);
        };

        Resource.getByObjectIds = function (ids, successcb, errorcb) {
            var qin = [];
            angular.forEach(ids, function (id) {
                qin.push({$oid: id});
            });
            return Resource.query({_id: {$in: qin}}, successcb, errorcb);
        };

        //instance methods

        Resource.prototype.$id = function () {
            if (this._id && this._id.$oid) {
                return this._id.$oid;
            } else if (this._id) {
                return this._id;
            }
        };

        Resource.prototype.$save = function (successcb, errorcb) {
            var httpPromise = $http.post(endpoint, this, {params: defaultParams});
            return promiseThen(httpPromise, successcb, errorcb, resourceRespTransform);
        };

        Resource.prototype.$update = function (successcb, errorcb) {
            var httpPromise = $http.put(endpoint + "/" + this.$id(), angular.extend({}, this, {_id: undefined}), {params: defaultParams});
            return promiseThen(httpPromise, successcb, errorcb, resourceRespTransform);
        };

        Resource.prototype.$remove = function (successcb, errorcb) {
            var httpPromise = $http['delete'](endpoint + "/" + this.$id(), {params: defaultParams});
            return promiseThen(httpPromise, successcb, errorcb, resourceRespTransform);
        };

        Resource.prototype.$saveOrUpdate = function (savecb, updatecb, errorSavecb, errorUpdatecb) {
            if (this.$id()) {
                return this.$update(updatecb, errorUpdatecb);
            } else {
                return this.$save(savecb, errorSavecb);
            }
        };

        return Resource;
    }

    return XchglabResourceFactory;
}]);
