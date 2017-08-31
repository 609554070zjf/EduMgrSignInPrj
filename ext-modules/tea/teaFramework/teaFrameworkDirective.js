/**
 * Created by joeyang ong on 2017/7/21.
 */

angular.module("teaFramework")
       .directive("teaFramework",function() {

           return {
               restrict: 'AE',
               scope: {
                   appTitle: "@",
                   subTitle: "@",
                   logoImg: "@"
               },
               controller:"teaFrameworkController",
               replace: true,
               transclude: true,
               templateUrl: 'ext-modules/tea/teaFramework/teaFrameworkTemplate.html'
           }

       });