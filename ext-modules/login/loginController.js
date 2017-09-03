/**
 * Created by Javon on 2017/8/26.
 */


"use strict";

angular.module("login")
    .controller("loginCtrl",["$scope","$location",function($scope,$location){
        $scope.isLogined = false;
        $scope.errormsg = "";

        $scope.loginCheck = function(){
            var username = $scope.username;
            var password = $scope.password;
            var identify = $scope.identify;

            if(!$scope.username){
                $scope.errormsg = "用户名不能为空";
                return;
            }
            if(!$scope.password){
                $scope.errormsg = "密码不能为空";
                return ;
            }
            if($scope.identify === "1") {
                $.getJSON("http://localhost/v1/stu/"+$scope.username, function(json){
                    if(json.result) {
                        var user = json.result;
                        console.log(user);
                        if(user.state === 0){ //停学判断
                            $scope.$applyAsync(function() {
                                $scope.errormsg = "您当前已停学，无法登录！";
                            });
                            return;
                        }
                        else if(user.stuno === username && user.password === password){
                            console.log("登录成功");
                            $scope.$applyAsync(function() {
                                $scope.errormsg = "";
                                $scope.isLogined = "true";
                            });
                            sessionStorage.user = user.stuno;
                            sessionStorage.username = user.stuname;
                            $location.path("/stuMain");
                            return ;
                        }
                    }
                    $scope.$applyAsync(function() {
                        $scope.errormsg = "用户名或密码或身份错误！";
                    });
                });
            }
            else if($scope.identify === "0"){
                $.getJSON("http://localhost/v1/tea/"+$scope.username, function(json){
                    if(json.result) {
                        var user = json.result;
                        console.log(user);
                        if(user.teano === username && user.password === password){
                            $scope.$applyAsync(function() {
                                $scope.errormsg = "";
                                $scope.isLogined = "true";
                            });
                            console.log("登录成功");
                            sessionStorage.user = user.teano;
                            sessionStorage.username = user.teaname;
                            $location.path("/teaMain");
                            return ;
                        }
                    }
                    $scope.$applyAsync(function() {
                        $scope.errormsg = "用户名或密码或身份错误！";
                    });
                });
            }
        }


    }]);