/**
 * Created by Javon on 2017/8/29.
 */


"use strict";

angular.module("stu")
    .directive("stuSignInRecord",function(){
        return {
            restrict:"AE",
            scope:{

            },
            replace:true,
            controller:"stuSignInRecordCtrl",
            templateUrl:"ext-modules/stu/stuSignInRecord/stuSignInRecordTempl.html",
            link:function(scope,el,attrs,ctrl){

            }
        }
    });