(function(c,q){function r(a,d,b,n,e){c.ajax({url:"https://api.gosquared.com/"+a+"/"+d+"/"+b,timeout:n.timeout||k.timeout||2E3,data:c.extend({},k,n),success:function(a){e(null,a)},error:function(a){a=c.parseJSON(a.responseText);e(a)},type:"GET",dataType:"json"})}function s(a,d,e,b,f){c.isFunction(b)&&(f=b,b={});r(a,d,e,b||{},f||function(){})}c.fn.track=function(a){return this.each(function(){var b=c(this);"string"==typeof a&&(a={name:a});if("object"===typeof a&&a.name&&"string"===typeof a.name){if("object"!==
typeof a.params||"string"!==typeof a.params)a.params={};c.isArray(a.events)&&(a.events=a.events.join(" "));a.events&&"string"===typeof a.events||(a.events="click");b.on(a.events,function(b){c.isFunction(a.beforeSend)&&a.beforeSend(b);q._gs("event",a.name,a.params);c.isFunction(a.afterSend)&&a.afterSend(b)})}})};var k={},h={account:{def:"v1",v1:["alertPreferences","ignoredVisitors","reportPreferences","sites"]},now:{def:"v3",v3:"aggregateStats campaigns concurrents engagement geo overview pages sources timeSeries visitors".split(" ")},
trends:{def:"v2",v2:"aggregate browser country event language organisation os page path1 screenDimensions sources".split(" ")}},l=c.GoSquared=function(a){k=a;return this},d;for(d in h){var f=l[d];f||(f=l[d]={});for(var b in h[d])if("def"!==b){var m=f[b];m||(m=f[b]={});for(var g=h[d][b],e=0;e<g.length;e++){var p=m[g[e]]=c.proxy(s,this,d,b,g[e]);b===h[d].def&&(f[g[e]]=p,l[g[e]]=p)}}}})(jQuery,window);
