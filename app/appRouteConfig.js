/**
 * Created by Javon on 2017/8/12.
 */


"use strict";

angular.module("eduApp")
    .config(["$routeProvider",function($routeProvider){
        var routes = [
            {
                url:"/signRecordByCourse",
                config:{
                    template:"<sign-in-record></sign-in-record>"
                }
            },
            {
                url:"/login",
                config:{
                    template:"<login btn-style='primary'></login>"
                }
            },
            {
                url:"/stuMain",
                config:{
                    template:"<stu-main></stu-main>"
                }
            },
            {
                url:"/signRecordByStuno",
                config:{
                    template:"<stu-sign-in-record></stu-sign-in-record>"
                }
            },
            {
                url:"/updatePwd",
                config:{
                    template:"<update-password></update-password>"
                }
            },
            {
                url:"/teaMain",
                config:{
                    template:"<tea-main></tea-main>"
                }
            }
        ];

        //绑定了路由信息到angular-route
        routes.forEach(function(route){
            $routeProvider.when(route.url,route.config);
        });

        $routeProvider.otherwise({redirectTo:"/login"});
    }]);