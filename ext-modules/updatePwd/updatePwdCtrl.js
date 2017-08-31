/**
 * Created by Javon on 2017/8/29.
 */


"use strict";

angular.module("eduApp")
    .controller("updatePwdCtrl",["$scope","$location",function($scope,$location){

        (function () {
            console.log(sessionStorage.user);
            if(!sessionStorage.user){
                $location.path("/login");
            }
        })();


        var user = sessionStorage.user;
        $scope.userno = user;
        var identify = null;
        var doc = {};
        if(user.substring(0, 1) === "s") {
            doc.stuno = user;
            identify = "stu";
        }
        else if(user.substring(0, 1) === "t"){
            doc.teano = user;
            identify = "stu";
        }


        $scope.updatePwd = function(){
            doc.password = $scope.newPwd1;

            if(validate()){
                $.post("http://localhost/v1/updatepwd/"+identify,doc,
                    function(data){
                        console.log(data.success);
                        if(data.success){
                            alert("密码修改成功！");
                            $location.path("/stuMain");
                        }
                    });
            }

        };

        function validate(){
            if(!$scope.password){
                $scope.$applyAsync(function() {
                    $scope.errormsg = "请输入原密码";
                });
                return false;
            }
            if(!$scope.newPwd1){
                $scope.$applyAsync(function() {
                    $scope.errormsg = "请输入新密码！";
                });
                return false;
            }
            if(!$scope.newPwd2){
                $scope.$applyAsync(function() {
                    $scope.errormsg = "请再次输入新密码！";
                });
                return false;
            }


            if($scope.newPwd1 !== $scope.newPwd2){
                $scope.$applyAsync(function() {
                    $scope.errormsg = "新密码两次输入不相同！";
                });
                return false;
            }

            var flag;
            console.log(identify+"<>"+user);
            $.ajaxSetup({async:false});
            $.getJSON("http://localhost/v1/"+identify+"/"+user,function(json){
                // console.log(json);
                // console.log($scope.password +",,,"+json.password);
                if($scope.password === json.result.password){
                    flag = true;
                }else{
                    $scope.$applyAsync(function() {
                        $scope.errormsg = "原密码输入错误！";
                    });
                    flag = false;
                }
            });
            return flag;
        }

    }]);