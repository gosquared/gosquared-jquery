(function(b){b.fn.track=function(a){return this.each(function(){var c=b(this);"string"==typeof a&&(a={name:a});if("object"!==typeof a||!a.name||"string"!==typeof a.name)console.log("Please provide an object containing at least a name");else{if("object"!==typeof a.params||"string"!==typeof a.params)a.params={};b.isArray(a.events)&&(a.events=a.events.join(" "));if(!a.events||"string"!==typeof a.events)a.events="click";c.on(a.events,function(c){b.isFunction(a.beforeSend)&&a.beforeSend(c);GoSquared||
(window.GoSquared={});GoSquared.q||(GoSquared.q=[]);GoSquared.q.push(["TrackEvent",a.name,a.params]);b.isFunction(a.afterSend)&&a.afterSend(c)})}})};var f={},h=function(a,c,e){e=b.isFunction(c)?[{},c]:[c||{},e||function(){}];c=e[0];var d=e=e[1];b.ajax({url:"https://api.gosquared.com/v2/"+a,timeout:c.timeout||f.timeout||2E3,data:b.extend({},f,c),success:function(a){d(null,a)},error:function(a){a=b.parseJSON(a.responseText);d(a)},type:"GET",dataType:"json"})},g="aggregateStats campaigns concurrents engagement functions geo ignoredVisitors organics overview pages referrers reportPreferences sites time timeSeries visitors".split(" ");
b.GoSquared=function(a){f=a;return this};for(var d=0;d<g.length;d++)b.GoSquared[g[d]]=h.bind(this,g[d])})(jQuery);
