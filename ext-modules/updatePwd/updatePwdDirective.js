/**
 * Created by Javon on 2017/8/29.
 */


"use strict";

angular.module("eduApp")
    .directive("updatePassword",function(){
        return{
            restrict:"AE",
            replace:true,
            scope:{

            },
            controller:"updatePwdCtrl",
            templateUrl:"ext-modules/updatePwd/updatePwdTempl.html",
            link:function(scope,el,attrs,ctrl){

            }
        }
    });