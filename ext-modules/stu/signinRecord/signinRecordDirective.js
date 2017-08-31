/**
 * Created by Javon on 2017/8/28.
 */


"use strict";

angular.module("eduApp")
    .directive("signInRecord",function(){
       return {
           restrict:"AE",
           scope:{

           },
           replace:true,
           controller:"signInRecordCtrl",
           templateUrl:"ext-modules/stu/signinRecord/signInRecordTmpl.html",
           link:function(scope,el,attrs,ctrl){

           }
       }
    });

