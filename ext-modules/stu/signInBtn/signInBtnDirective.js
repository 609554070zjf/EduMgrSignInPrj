/**
 * Created by Javon on 2017/8/26.
 */

"use strict";

angular.module("stu")
    .directive("signInBtn",function(){
        return{
            restrict:"AE",
            replace:true,
            require:"^stuMain",
            controller:"signInBtnCtrl",
            templateUrl:"ext-modules/stu/signInBtn/signInBtnTemplate.html",
            link:function (scope,el,attrs,ctrl) { //ctrl 获取的是require中控制器的this方法/属性
                var isSignIned = false;
                // console.log(ctrl.courseList);
                // console.log(scope.$parent.normalCnt);

                // var beginTime = "23:50";
                // var endTime = "23:40";
                var stuno = sessionStorage.user;
                var stuname = sessionStorage.username;
                console.log(stuname);

                var beginTime = scope.course.begintime;
                var endTime = scope.course.endtime;
                //scope.signState = 0;// -1:未开始，0:待签到，1:已签到（正常），2：已签到（迟到），3：缺勤

                var courseBeginTime = scope.setCourseTime(beginTime);
                var courseEndTime = scope.setCourseTime(endTime);


                //点击签到按钮触发的事件
                scope.signIn = function(){
                    var date = new Date();
                    var dateStr = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                    var hourseStr = date.getHours()+":"+date.getMinutes();
                    var dateTime = date.getTime();

                    if(isSignIned){
                        var doc = {
                                url:"/signRecordByCourse",
                                courseno: scope.course.courseno,
                                signintime: dateStr
                            };
                        ctrl.setRoute(doc);
                        return;
                    }
                    else isSignIned = true;

                    //当前点击的button对象
                    var thisBtn = el;
                    if(dateTime >= (courseBeginTime.getTime()-15*60*1000) && dateTime <= courseBeginTime.getTime()){
                        // console.log("正常");
                        scope.signState = 1;
                        // thisBtn.attr("disabled","disabled");
                        scope.state = "已签到（正常），签到时间："+hourseStr;
                        addSignCnt(stuno,"s");
                    }
                    else if(dateTime > courseBeginTime.getTime() && dateTime <= (courseBeginTime.getTime()+60*60*1000)){
                        // console.log("迟到");
                        // thisBtn.attr("disabled","disabled");
                        scope.signState = 2;
                        scope.state = "已签到（迟到），签到时间："+hourseStr;
                        addSignCnt(stuno,"l");
                    }
                    else{
                        // console.log("缺勤");
                        return;
                    }
                    saveSignRecord(stuno,stuname,dateStr,hourseStr,scope.signState);
                };

                getSignRecord(stuno,scope.course.courseno);
                getInitSignCnt(stuno);

                //初始化签到按钮状态
                function init(){

                    var date = new Date();
                    var dateStr = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                    scope.today = dateStr;
                    var dateTime = date.getTime();
                    if(dateTime < (courseBeginTime.getTime()-15*60*1000)){ //签到未开始
                        // el.attr("disabled","disabled");
                        scope.signState = -1;
                        scope.state = "签到未开始";
                    }
                    else if(dateTime >= (courseBeginTime.getTime()+60*60*1000)){ //签到以结束（缺勤）
                        // el.attr("disabled","disabled");
                        scope.state = "缺勤";
                        scope.signState = 3;
                        scope.$parent.$applyAsync(function() {
                            scope.$parent.absenceCnt += 1;
                        });
                        saveSignRecord(stuno,stuname,dateStr,null,scope.signState);
                        addSignCnt(stuno,"a");
                        isSignIned = true;
                    }
                    else{
                        scope.signState = 0;
                        // el.removeAttr("disabled");
                        scope.state = "待签到";
                    }
                }


                /**
                 * 增加数据库考勤次数
                 * @param stuno
                 * @param state
                 */
                function addSignCnt(stuno,state){
                    $.getJSON("http://localhost/v1/stu/signin/"+stuno+"/"+state,function(json){
                        updateSignCntTitle(json[0]);
                    });
                }

                /**
                 * 修改页面考勤次数
                 * @param signin
                 */
                function updateSignCntTitle(signin){

                    scope.$parent.$applyAsync(function() {
                        scope.$parent.absenceCnt = signin.absencecnt;
                        scope.$parent.normalCnt = signin.normalcnt;
                        scope.$parent.lateCnt = signin.latecnt;
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

                /**
                 * 获取已签到记录
                 * @param stuno
                 * @param courseno
                 */
                function getSignRecord(stuno,courseno){
                    var date = new Date();
                    var dateStr = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                    scope.today = dateStr;
                    // console.log("dateStr:"+dateStr);
                    $.getJSON("http://localhost/v1/sign_record/"+ dateStr +"/" +stuno + "/" + courseno,function(json){
                        // console.log(json[0]);
                        if(json[0]){    //有查询到签到记录的情况
                            isSignIned = true;
                            if(json[0].state === 2){
                                // el.attr("disabled","disabled");
                                scope.signState = json[0].state;
                                scope.state = "已签到（迟到），签到时间："+json[0].signtime;
                            }
                            else if(json[0].state === 1){
                                // el.attr("disabled","disabled");
                                scope.signState = json[0].state;
                                scope.state = "已签到（正常），签到时间："+json[0].signtime;
                            }
                            else if(json[0].state === 3){
                                // el.attr("disabled","disabled");
                                scope.signState = json[0].state;
                                scope.state = "未签到（缺勤）";
                            }
                        }
                        else{ //没有查询到签到记录的情况：还未签到（包含缺勤，初始化未签到状态/缺勤状态
                            init();
                        }
                    });
                }

                /**
                 * 保存签到记录
                 * @param stuno
                 * @param stuname
                 * @param dateStr
                 * @param hourStr
                 * @param state
                 */
                function saveSignRecord(stuno,stuname,dateStr,hourStr,state){
                    $.post("http://localhost/v1/sign_record/record",
                        {
                            "stuno" : stuno,
                            "stuname" : stuname,
                            "courseno" : scope.course.courseno,
                            "coursename" : scope.course.coursename,
                            "signintime" : dateStr,
                            "signtime" : hourStr,
                            "begintime": scope.course.begintime,
                            "endtime" : scope.course.endtime,
                            "state" : state
                        },function(data){
                            console.log(data);
                        });
                }

            }
        }
    });