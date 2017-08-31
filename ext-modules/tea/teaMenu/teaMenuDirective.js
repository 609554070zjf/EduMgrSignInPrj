/**
 * Created by joeyang ong on 2017/7/21.
 */

angular.module("teaMenu")
    .directive("teaMenu",function(){
        return {
           restrict:"AE",
           controller: 'teaMenuController',
           templateUrl:"ext-modules/tea/teaMenu/teaMenuTemplate.html",
           transclude:true,
           replace:true
        };
    })
