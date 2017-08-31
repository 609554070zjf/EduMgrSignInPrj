/**
 * Created by joeyang ong on 2017/7/21.
 */

angular.module("teaMenu")
    .directive("teaMenuItem",function(){
        return {
            restrict:"AE",
            require:"^teaMenu",
            scope:{
              label:"@",
              icon:"@",
              route:"@"
            },
            templateUrl:"ext-modules/tea/teaMenu/teaMenuItemTemplate.html",
            replace:true,
            link: function (scope,el,attrs,ctrl) {

                // console.log(ctrl);

                scope.isActive = function(){
                    // console.log(el);
                    if(el === ctrl.getActiveElement())
                        return true;
                    else
                        return false;
                };

                scope.isVertical = function(){
                    //如果el位于br-subitem-section之下，说明在一个menugruop中
                    return ctrl.isVertical() || el.parents(".br-subitem-section").length>0;
                };

                el.on("click",function(event){
                    // console.log(ctrl);
                    event.stopPropagation();
                    event.preventDefault();
                    scope.$apply(function () {
                        //console.log(ctrl);
                        ctrl.setActiveElement(el);
                        ctrl.setRoute(scope.route);
                    });
                });
            }
        };
    })

