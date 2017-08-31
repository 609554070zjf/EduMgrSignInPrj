/**
 * Created by Javon on 2017/8/30.
 */


"use strict";

angular.module("teaFramework")
    .controller("teaNewStuCtrl",['$scope','Upload',
        function ($scope,Upload) {
            $scope.newStuSex = "M";
            $scope.newStuState = "1";


            $scope.saveStu = function() {
                if ($scope.form.file.$valid && $scope.file) {
                    console.log($scope.file);
                    $scope.upload($scope.file);
                    $scope.cleanForm();
                }

            };

            // upload on file select or drop
            $scope.upload = function (file) {
                Upload.upload({
                    url: 'http://localhost/v1/fileUpload',
                    data: {
                        file: file,
                        stuno :$scope.newStuNo,
                        stuname: $scope.newStuName,
                        sex:$scope.newStuSex,
                        password:$scope.newStuPassword,
                        state:$scope.newStuState
                    }
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };

            $scope.cleanForm = function(){
                $scope.newStuNo = null;
                $scope.newStuName = null;
                $scope.newStuSex = "M";
                $scope.newStuPassword = null;
                $scope.newStuState = "1";
                $scope.file = null;
            };


        }]);