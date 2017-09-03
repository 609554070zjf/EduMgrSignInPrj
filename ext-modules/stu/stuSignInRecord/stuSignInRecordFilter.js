/**
 * Created by Javon on 2017/8/29.
 */


angular.module("stu")
    .filter("combineSearch",function(){
        console.log("filter is invoked!");
        var yearOrCourseNameFilter = function(data,year,coursename){
            var record = new Array();
            for(var i = 0; i < data.length; i++){
                if(year && coursename){
                    if((data[i].year == year) && (data[i].coursename.includes(coursename))){
                        record.push(data[i]);
                    }
                }
                else if((data[i].year == year) || (data[i].coursename.includes(coursename))){
                    record.push(data[i]);
                }
            }
            return record;
        };
        return yearOrCourseNameFilter;
    });