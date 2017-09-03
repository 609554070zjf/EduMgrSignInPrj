/**
 * Created by Javon on 2017/8/29.
 */


"use strict";

angular.module("stu")
    .controller("stuSignInRecordCtrl",["$scope","$location","$filter",
        function($scope,$location,$filter){
            $(function () {
                getSignInRecordByStuNo();
            });

            $scope.stuno = sessionStorage.user;
            var records = null;

            function getSignInRecordByStuNo() {

                var stuno = sessionStorage.user;
                // console.log(stuno);
                $.getJSON("http://localhost/v1/sign_record/null/" + stuno + "/null",
                    function(json){
                        for(var i = 0; i< json.length; i++){
                            var year = json[i].signintime.split("-")[0];
                            json[i].year = year;
                        }
                        records = json;
                        $scope.$applyAsync(function(){
                            $scope.recordList = json;
                        });
                });
            }

            $scope.combineSearch = function(){
                if($scope.qryYear){
                    if($scope.qryYear.toString().length!=4){
                        alert("请输入年份的4位数字，格式：yyyy");
                        return;
                    }
                }

                if($scope.qryYear || $scope.qryCourseName){
                    $scope.recordList = $filter("combineSearch")(records,$scope.qryYear,$scope.qryCourseName);
                }
                else{
                    $scope.recordList = records;
                }
            }

    }]);