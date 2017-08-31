/**
 * Created by Javon on 2017/8/26.
 */


"use strict"

angular.module("stu")
    .directive("stuMain",function(){
        return {
            restrict:"AE",
            replace:true,
            scope:{

            },
            controller:"stuCtrl",
            templateUrl:"ext-modules/stu/stuMainTemplate.html",
            link:function(scope,el,attrs,ctrl) {

            }
        }
});