'use strict';

angular.module('ofApp')
  .directive('accessLevel', ['$rootScope', 'Auth', function ($rootScope, Auth) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var prevDisp = element.css('display');
        $rootScope.$watch('user.role', function (role) {
          if (!Auth.authorize(attrs.accessLevel)) {
            element.css('display', 'none');
          } else {
            element.css('display', prevDisp);
          }
        });
      }
    };
  }])


// a hack: http://plnkr.co/edit/CHrBAVU9Ycl2ex2DRr6R
// https://github.com/angular/angular.js/issues/1460
  .directive('autoFillableField', function () {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        setInterval(function () {
          if (!(element.val() === '' && ngModel.$pristine)) {
            scope.$apply(function () {
              ngModel.$setViewValue(element.val());
            });
          }
        }, 300);
      }
    };
  })

;
