/**
 * Created by Javon on 2017/9/2.
 */


"use strict";

angular.module("teaFramework")
    .controller("teaNewCourseCtrl",["$scope",function($scope){
        $scope.isVisable = false;

        $scope.classday = -1;

        $scope.week = [
            {key:-1,value:"---请选择---"},
            {key:0,value:"星期日"},
            {key:1,value:"星期一"},
            {key:2,value:"星期二"},
            {key:3,value:"星期三"},
            {key:4,value:"星期四"},
            {key:5,value:"星期五"},
            {key:6,value:"星期六"}
        ];

        /**
         * 添加课程
         */
        $scope.saveCourse = function(){
            if(!validate()){
               return;
            }

            var course = {
                "_id":$scope.newCourseNo,
                "courseno":$scope.newCourseNo,
                "coursename":$scope.newCourseName,
                "teaname":$scope.newCourseTeaName,
                "begintime":$scope.newCourseBeginTime,
                "endtime":$scope.newCourseEndTime,
                "classday":$scope.classday
            };

            console.log(course);
            $.post("http://localhost/v1/course",course,function(date){
                    if(date.success){
                        $scope.cleanForm();
                    }
                    else{
                        alert("添加失败，请重试！");
                        return;
                    }
            });

        }

         $scope.cleanForm = function(){
            $scope.newCourseNo = null;
            $scope.newCourseName = null;
            $scope.newCourseTeaName = null;
            $scope.newCourseBeginTime = null;
            $scope.newCourseEndTime = null;
            $scope.classday = -1;
        }

        /**
         * 输入校验
         * @returns {boolean}
         */
        function validate(){
            var begintime = $scope.newCourseBeginTime;
            var endtime = $scope.newCourseEndTime;
            if(!checkTime(begintime) || !checkTime(endtime)){
                return false;
            }
            // console.log($scope.classday);
            if($scope.classday === -1){
                $scope.$applyAsync(function() {
                    $scope.errormsg = "请选择上课日期！";
                });
                return false;
            }
            return true;
        }

        /**
         * 校验上课时间和下课时间
         * @param time
         * @returns {boolean}
         */
        function checkTime(time){
            var timeSplit = time.split(":");
            if(timeSplit[0].length != 2 || timeSplit[1].length != 2){
                $scope.$applyAsync(function() {
                    $scope.errormsg = "日期格式不正确";
                });
                return false;
            }
            var hour = time.split(":")[0];
            var minute = time.split(":")[1];
            // console.log(hour+",,"+minute);
            if(isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23
                || minute < 0 || minute >= 60){
                $scope.$applyAsync(function() {
                    $scope.errormsg = "日期格式不正确";
                });
                return false;
            }else{
                return true;
            }
        }

        var pageSize = 10;
        $scope.pageNo = 1;
        $scope.initUrl = "http://localhost/v1/loadCourses?page=1&pagesize="+pageSize;
        $scope.isFirst = true;
        $scope.isLast = false;

        loadCourses($scope.initUrl,1);

        $scope.toggleNewCourse = function(){
            $scope.isVisable = !$scope.isVisable;
        };

        function loadCourses(url,pageNo){
            checkFistOrLast(pageNo);
            if(pageNo < 1 || pageNo > $scope.totalPage){
                return;
            }
            $scope.$applyAsync(function() {
                $scope.pageNo = pageNo;
            });
            // console.log($scope.pageNo);
            $.getJSON(url,
                function(json,textStatus, xhr){
                    $scope.totalPage = parseInt(xhr.getResponseHeader("X-Total-Page"));
                    var link = xhr.getResponseHeader("link");
                    $scope.linkObj = linkToObj(link);
                    $scope.$applyAsync(function() {
                        $scope.courseList = json;
                    });
                });
        }

        $scope.loadPage = function(url,pageNo){
            loadCourses(url,pageNo);
        };


        $scope.toPageByPageNo = function(pageNo){
            if(pageNo < 1 || pageNo > $scope.totalPage){
                alert("输入的页码不正确，页码范围：[ 1-"+ $scope.totalPage +"]");
                $scope.pageNum = "";
                return;
            }
            var url = "http://localhost/v1/loadCourses?page="+pageNo+"&pagesize="+pageSize;
            loadCourses(url,pageNo);
        };


        function linkToObj(link){
            var linkArray = link.split(",");

            var linkObj = {
                next:"#",
                last:"#"
            };
            var n = linkArray[0].split(";")[0];
            var nextAddr = n.substring(1,n.length-1);
            linkObj.next = nextAddr;

            var l = linkArray[1].split(";")[0];
            var lastAddr = l.substring(1,n.length-1);
            linkObj.last = lastAddr;
            return linkObj;
        }

        function checkFistOrLast(pageno){
            if(pageno === 1 ){
                $scope.isFirst = true;
            }
            else{
                $scope.isFirst = false;
            }

            if(pageno === $scope.totalPage){
                $scope.isLast = true;
            }
            else{
                $scope.isLast = false;
            }
        }

    }]);