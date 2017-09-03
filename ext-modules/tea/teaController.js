/**
 * Created by Javon on 2017/8/30.
 */

angular.module("tea")
    .controller("teaCtrl",["$scope","$location",function($scope,$location){
        (function () {
            // console.log("123"+sessionStorage.user);
            console.log(!sessionStorage.user);
            if(!sessionStorage.user){
                $location.path("/login");
            }
        })();

    }]);