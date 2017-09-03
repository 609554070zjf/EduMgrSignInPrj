/**
 * Created by Javon on 2017/8/31.
 */

"use strict";

angular.module("teaFramework")
    .controller("teaStudentCtrl",["$scope",function($scope){

        var pageSize = 8;
        $scope.pageNo = 1;
        $scope.initUrl = "http://localhost/v1/loadStudents?page=1&pagesize="+pageSize;
        // $scope.initUrl = "http://localhost/v1/loadStudents?page="+pageNo+"&pagesize="+pageSize;

        $scope.isFirst = true;
        $scope.isLast = false;
        loadStudents($scope.initUrl,1);



        function loadStudents(url,pageNo){
            // console.log("pageNo:"+pageNo);
            // console.log("totalPage:"+$scope.totalPage);
            checkFistOrLast(pageNo);

            if(pageNo < 1 || pageNo > $scope.totalPage){
                return;
            }

            $scope.$applyAsync(function() {
                $scope.pageNo = pageNo;
            });
            console.log($scope.pageNo);
            // console.log(url);
            //http://localhost/v1/loadStudents?page=1&pagesize=10
          $.getJSON(url,
                function(json,textStatus, xhr){
                    $scope.totalPage = parseInt(xhr.getResponseHeader("X-Total-Page"));
                    var link = xhr.getResponseHeader("link");
                    // console.log(link);
                    //<http://localhost/v1/loadStudents?page=1&pagesize=10>;rel='next',
                    // <http://localhost/v1/loadStudents?page=1&pagesize=10>;rel='last'

                    $scope.linkObj = linkToObj(link);

                    // console.log($scope.linkObj);
                    // console.log(totalPage);
                    // console.log(json);

                    $scope.$applyAsync(function() {
                        $scope.studentList = json;
                    });
                });
        }


        $scope.loadPage = function(url,pageNo){
            loadStudents(url,pageNo);
        };


        $scope.toPageByPageNo = function(pageNo){
            if(pageNo < 1 || pageNo > $scope.totalPage){
                alert("输入的页码不正确，页码范围：[ 1-"+ $scope.totalPage +"]");
                $scope.pageNum = "";
                return;
            }
           var url = "http://localhost/v1/loadStudents?page="+pageNo+"&pagesize="+pageSize;
           loadStudents(url,pageNo);
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
            // console.log("nextAddr : "+nextAddr);

            var l = linkArray[1].split(";")[0];
            var lastAddr = l.substring(1,n.length-1);
            linkObj.last = lastAddr;
            // console.log("lastAddr : "+lastAddr);
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


        $scope.preUpdate = function(student){
            $scope.updateStuNo = student.stuno;
            $scope.updateStuName = student.stuname;
            $scope.updateStuPassword = student.password;
            $scope.updateStuState = student.state.toString();
            $scope.updateStuSex = student.sex;
        };

        $scope.updateStu = function(){
            var student = {
                 stuno : $scope.updateStuNo,
                 stuname : $scope.updateStuName,
                 password : $scope.updateStuPassword,
                 state : parseInt($scope.updateStuState),
                 sex : $scope.updateStuSex
            };
            console.log(student);
            $.ajax({
                url:"http://localhost/v1/stu/"+student.stuno,
                type:"PUT",
                data:student,
                success:function(date){
                    console.log(date);
                    if(!date.success){
                        alert("修改失败！");
                        return;
                    }
                    $('#updateModal').modal('hide');
                    loadStudents($scope.initUrl,1);
                }
            });
        };

        $scope.preDelete = function(student){
            $scope.delete_stuno = student.stuno;
            $scope.delete_stuname = student.stuname;
        };

        $scope.removeStu = function(stuno){
            $.ajax({
                url:"http://localhost/v1/stu/"+stuno,
                type:"DELETE",
                success:function(date){
                    console.log(date);
                    if(!date.success){
                        alert("删除失败！");
                        return;
                    }
                    $('#deleteModal').modal('hide');
                    loadStudents($scope.initUrl,1);
                }
            });
        }

    }]);