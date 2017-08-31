/**
 * Created by Javon on 2017/8/30.
 */


angular.module("tea")
    .directive("teaMain",function(){
        return {
            restrict:"AE",
            replace:true,
            templateUrl:"ext-modules/tea/teaMainTemplate.html",
            controller:"teaCtrl"
        }
    });