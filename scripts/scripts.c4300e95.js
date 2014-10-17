"use strict";angular.module("checkgroup",[]).controller("checkgroupController",["$scope",function(a){var b=[],c=[],d=[],e=this;this.checkedValue=[],this.multiple=!1,this.model=null,this.last=0,this.index=-1,this.registerCheck=function(a){var f=[];switch(a.checkType){case"all":e.multiple&&(f=c);break;case"none":e.multiple&&(f=d);break;default:f=b}a.$on("$destroy",function(){var b=f.indexOf(a);0>b||(f.splice(b,1),e.index--,e.last--)}),f.push(a),(++e.index===e.last||a.$last)&&e.updateValue()},this.uncheckOthers=function(a){var c=angular.isArray(a);angular.forEach(b,function(b){if(c){var d=a.indexOf(b);b.isChecked=d>=0}else b.isChecked=angular.equals(b,a)})},this.groupCheck=function(a,b){e.multiple&&angular.forEach(a,function(a){a.isChecked=b})},this.checkAll=function(a){this.groupCheck(b,a)},this.updateValue=function(){var f=0;e.checkedValue=[],angular.forEach(b,function(a){return a.isChecked?!e.multiple&&e.checkedValue.length>0?void(a.isChecked=!1):void e.checkedValue.push(a.value):void 0}),f=e.checkedValue.length,!e.multiple&&0===f&&b.length>0&&(e.checkedValue.push(b[0].value),b[0].isChecked=!0,f=1),e.groupCheck(c,f===b.length),e.groupCheck(d,0===f),a[e.model]=e.checkedValue}}]).directive("checkgroup",function(){return{restrict:"AE",controller:"checkgroupController",compile:function(){return{pre:function(a,b,c,d){d.last=b.find("check").length+b.find("[check]").length-1},post:function(a,b,c,d){d.multiple=c.checkMultiple||!1,d.model=c.checkgroup}}}}}).directive("check",function(){return{restrict:"EA",scope:{value:"@"},transclude:!0,require:"^checkgroup",templateUrl:"templates/check.html",link:function(a,b,c,d){switch(a.isChecked=angular.isDefined(c.checked),a.checkType=c.checkType,c.checkType){case"all":a.toggleCheck=function(){d.checkAll(!a.isChecked),d.updateValue()};break;case"none":a.toggleCheck=function(){d.checkAll(a.isChecked),d.updateValue()};break;default:a.toggleCheck=function(){d.multiple?a.isChecked=!a.isChecked:d.uncheckOthers(a),d.updateValue()}}d.registerCheck(a)}}}),angular.module("angularCheckgroupSample",["checkgroup"]),angular.module("angularCheckgroupSample").controller("demoController",["$scope",function(a){a.demoRadio1=[]}]);