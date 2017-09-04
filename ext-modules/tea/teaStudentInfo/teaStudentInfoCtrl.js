/**
 * Created by Javon on 2017/9/4.
 */

"use strict";

angular.module("teaFramework")
    .controller("teaStudentInfoCtrl",["$scope","$rootScope",function($scope,$rootScope){

            $scope.student = $rootScope.infoStudent;

            $.getJSON("http://localhost/v1/stu/signin/"+$scope.student.stuno,function(json){
                $scope.$applyAsync(function(){
                    $scope.signInCnt = json[0];
                });

            });

            $scope.backToStuMgr = function(){
                $rootScope.$broadcast('br-menu-item-selected-event',{ route: "teaStudentMgr" });
            }
    }]);