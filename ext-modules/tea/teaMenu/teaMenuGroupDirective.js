/**
 * Created by joeyang ong on 2017/8/1.
 */

"use strict";

angular.module("teaMenu")
    .directive("teaMenuGroup",function(){
        return {
           restrict:"AE",
           require:"^teaMenu",
           transclude:true,
           scope:{
              label:"@",
              icon:"@"
           },
           templateUrl:"ext-modules/tea/teaMenu/teaMenuGroupTemplate.html",
           link:function(scope,el,attrs,ctrl){

               // console.log("menu-group el:"+el);

               scope.isOpen = false;

               scope.closeMenu = function () {
                   scope.isOpen = false;
               };

               scope.isVertical = function(){
                   return ctrl.isVertical() || el.parents('.br-subitem-section').length > 0;
               };

               scope.toggleSubMenu = function () {
                   scope.isOpen = !scope.isOpen;

                   if (el.parents('.br-subitem-section').length == 0)
                       scope.setSubmenuPosition();

                   ctrl.setOpenMenuScope(scope);

               };

               scope.setSubmenuPosition = function () {
                   // console.log(el);
                   var pos = el.offset();
                   $('.br-subitem-section').css({ 'left': pos.left + 20, 'top': 36 });
               };

           }
        };
    })

