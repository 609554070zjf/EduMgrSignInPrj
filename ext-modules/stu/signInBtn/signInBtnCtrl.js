/**
 * Created by Javon on 2017/8/26.
 */


"use strict"

angular.module("stu")
    .controller("signInBtnCtrl",["$scope","$rootScope",function($scope,$rootScope){

        /**
         * 用于设置课程开始和结束时间
         * @param hourAndMinute 小时:分钟
         * @returns {Date}  当天的时间
         */
         $scope.setCourseTime = function(hourAndMinute){
            if(hourAndMinute.split(":").length < 2){
                console.log("input time is not valiable!");
                return;
            }
            var courseTime = new Date();
            courseTime.setHours(hourAndMinute.split(":")[0]);
            courseTime.setMinutes(hourAndMinute.split(":")[1]);
            courseTime.setSeconds(0);
            return courseTime;
        }

    }]);