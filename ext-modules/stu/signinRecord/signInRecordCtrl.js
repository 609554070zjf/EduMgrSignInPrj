/**
 * Created by Javon on 2017/8/28.
 */


"use strict";

angular.module("eduApp")
    .controller("signInRecordCtrl",["$scope","$rootScope","$location",function($scope,$rootScope,$location){
        // console.log($rootScope.route);
        (function () {
            console.log(sessionStorage.user);
            if(!sessionStorage.user){
                $location.path("/login");
            }
        })();


        if($rootScope.route){
            sessionStorage.signintime = $rootScope.route.signintime;
            sessionStorage.courseno = $rootScope.route.courseno;
        }

        var courseno = sessionStorage.courseno;
        var signintime = sessionStorage.signintime;

        console.log(courseno + "  " + signintime);
        getSignRecord(signintime,courseno);

        function getSignRecord(signintime,courseno){
            $.getJSON("http://localhost/v1/sign_record/" + signintime + "/null/" + courseno,
            function(json){
                console.log(json);
                $scope.$applyAsync(function(){
                    $scope.recordList = json;
                    $scope.coursename = json[0].coursename;
                    $scope.signintime = json[0].signintime;
                });

            });
        }

    }]);