/**
 * Created by joeyang ong on 2017/7/25.
 */
"use strict";

angular.module('teaMenu').controller('teaMenuController',
    ['$scope', '$rootScope',
        function ($scope, $rootScope) {

            $scope.isVertical = true;
            $scope.openMenuScope = null;

            $scope.toggleMenuOrientation = function(){
                $scope.isVertical = !$scope.isVertical;
                // console.log($scope.isVertical);
            };

            this.isVertical = function(){
                return $scope.isVertical;
            };

            this.getActiveElement = function(){
                return $scope.activeElement;
            };

            this.setActiveElement = function (el) {
                $scope.activeElement = el;
            };

            this.setRoute = function (route) {
                // console.log("11"+route);
                $rootScope.$broadcast('br-menu-item-selected-event',{ route: route });
            };

            this.setOpenMenuScope = function (scope) {
                $scope.openMenuScope = scope;
            };

            angular.element(document).bind('click', function (e) {

                if ($scope.openMenuScope && !$scope.isVertical) {
                    // console.log(e.target.parentNode);
                    if ($(e.target).parent().hasClass('ps-selectable-item'))
                        return;
                    $scope.$apply(function () {
                        $scope.openMenuScope.closeMenu();
                    });
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

        }
    ]);
