/*
 GoSquared jQuery Plugin v2.0.0
  Copyright 2013 GoSquared - MIT License
  https://github.com/gosquared/gosquared-jquery
*/
(function(e,g){function s(a,c,d,b,h){e.ajax({url:"https://api.gosquared.com/"+a+"/"+c+"/"+d,timeout:b.timeout||n.timeout||2E3,data:e.extend({},n,b),success:function(a){h(null,a)},error:function(a){a=e.parseJSON(a.responseText);h(a)},type:"GET",dataType:"json"})}function t(a,c,d,b,h){e.isFunction(b)&&(h=b,b={});s(a,c,d,b||{},h||function(){})}g._gs=g._gs||function(){(g._gs.q=g._gs.q||[]).push(arguments)};e.fn.track=function(a){return this.each(function(){var c="object"===typeof a?a.name:a;if(c){var d=
a.params||{},b=a.events;e.isArray(b)&&(b=b.join(" "));b&&"string"===typeof b||(b="click");e(this).on(b,function(b){e.isFunction(a.beforeSend)&&a.beforeSend(b);g._gs("event",c,d);e.isFunction(a.afterSend)&&a.afterSend(b)})}})};var n={},m={account:{def:"v1",v1:["alertPreferences","ignoredVisitors","reportPreferences","sites"]},now:{def:"v3",v3:"aggregateStats campaigns concurrents engagement geo overview pages sources timeSeries visitors".split(" ")},trends:{def:"v2",v2:"aggregate browser country event language organisation os page path1 screenDimensions sources".split(" ")}},
p=e.GoSquared=function(a){n=a;return this},c;for(c in m){var k=p[c];k||(k=p[c]={});for(var d in m[c])if("def"!==d){var q=k[d];q||(q=k[d]={});for(var l=m[c][d],f=0;f<l.length;f++){var r=q[l[f]]=e.proxy(t,this,c,d,l[f]);d===m[c].def&&(k[l[f]]=r,p[l[f]]=r)}}}})(jQuery,window);
