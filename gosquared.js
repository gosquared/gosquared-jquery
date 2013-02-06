(function($) {

  $.fn.track = function(p) {
    if (typeof p != 'object') return 'Please provide an object - required events and name'
    p.params = (typeof p.params == 'object') ? p.params : {};
    if ((typeof p.events != 'string') || (typeof p.name != 'string')) return 'Please provide at least one event and a name as a string';
    this.on(p.events, function(e) {
      if ($.isFunction(p.beforeSend)) p.beforeSend(e);
      console.log(p.name + ' sent off with params ' + p.params);
      if (!GoSquared) GoSquared = {};
      if (!GoSquared.q) GoSquared.q = [];
      GoSquared.q.push('TrackEvent', p.name, p.params);
      if ($.isFunction(p.afterSend)) p.afterSend(e);
      return true;
    });
  };

  var opts = {};

  // makes sure the opts and the callbacks are right
  var parse = function(opts,cb) {
    if ($.isFunction(opts)) {
      // opts is the callback
      return [{},opts];
    }
    return [opts || {},cb || function(){}];
  };

  var defaultFunction = function(func,params,cb) {
    var o = parse(params,cb); params = o[0]; cb = o[1];
    get(func,params,cb);
  };

  var defaultFunctions = [
    "aggregateStats",
    "campaigns",
    "concurrents",
    "engagement",
    "functions",
    "geo",
    "ignoredVisitors",
    "organics",
    "overview",
    "pages",
    "referrers",
    "reportPreferences",
    "sites",
    "time",
    "timeSeries",
    "visitors"
  ];

  var get = function(endpoint, params, cb) {

    $.ajax({
      url: 'https://api.gosquared.com/v2/'+endpoint,
      timeout: params.timeout || opts.timeout || 2000,
      data: $.extend({},opts,params),
      success: function(data) {
        cb(null,data);
      },
      error: function(xhr) {
        var responseText = $.parseJSON(xhr.responseText);
        cb(responseText);
      },
      type: 'GET',
      dataType: 'json'
    });

  };

  $.GoSquared = function(config) {
    opts = config;
    return this;
  };

  for (var i = 0; i< defaultFunctions.length; i++) {
    $.GoSquared[defaultFunctions[i]] = defaultFunction.bind(this,defaultFunctions[i]);
  }

  
})(jQuery);