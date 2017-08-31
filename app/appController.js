/**
 * Created by Javon on 2017/8/26.
 */
"use strict";


angular.module("eduApp")
    .controller("eduCtrl",["$scope","$rootScope","$location",function($scope,$rootScope,$location){
            $scope.$on("signin-btn-event",function(evt, data){
                // console.log(data);
                // // console.log($rootScope);
                // $scope.date = data;
                $location.path(data.url);
            });

    }]);