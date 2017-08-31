/**
 * Created by Javon on 2017/8/26.
 */


"use strict";

angular.module("stu")
    .controller("stuCtrl",["$scope","$rootScope","$location","$window",function($scope,$rootScope,$location,$window){

        (function () {
            console.log("123"+sessionStorage.user);
            console.log(!sessionStorage.user);
            if(!sessionStorage.user){
                $location.path("/login");
            }
        })();


        $scope.lateCnt = 0;
        $scope.absenceCnt = 0;
        $scope.normalCnt = 0;
        $scope.username = sessionStorage.username;

        this.lateCnt = $scope.lateCnt;
        this.absenceCnt = $scope.absenceCnt;
        this.normalCnt = $scope.normalCnt;
        this.courseList = getTodayCourses($scope);

        $scope.quitSys = function(){
            if($window.confirm("您确定要退出系统吗?")){
                sessionStorage.user = "";
                $location.path("/login");
            }

        };

        $scope.loadSignInRecordSelf = function(){
            $location.path("/signRecordByStuno");
        };



        $("[data-toggle='tooltip']").tooltip();
        getInitSignCnt(sessionStorage.user);

        /**
         * 根据星期几来查找课程列表
         * @param day
         */
        function getTodayCourses($scope){
            var day = new Date().getDay();
            var courseList = null;
            // $.ajaxSettings.async = false;
            $.ajaxSetup({async:false});
            $.getJSON("http://localhost/v1/course/"+day+"/null",function (json) {
                // setCourseList(json);
                $scope.$applyAsync(function() {
                    $scope.courses = json;
                });
                courseList = json;
            });
            return courseList;
        }


        this.setRoute = function (route) {
            $rootScope.route = route;
            $rootScope.$broadcast('signin-btn-event',route);
        };


        /**
         * 修改页面考勤次数
         * @param signin
         */
        function updateSignCntTitle(signin){

            $scope.$applyAsync(function() {
                $scope.absenceCnt = signin.absencecnt;
                $scope.normalCnt = signin.normalcnt;
                $scope.lateCnt = signin.latecnt;
            });
        }

        /**
         * 从数据库读取考勤次数用于初始化
         * @param stuno
         */
        function getInitSignCnt(stuno){
            $.getJSON("http://localhost/v1/stu/signin/"+stuno,function(json){
                updateSignCntTitle(json[0]);
            });
        }

    }]);