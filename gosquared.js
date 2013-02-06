(function($,window) {

  $.fn['track'] = function(p) {
    return this.each(function() {
      var self = $(this);

      if (typeof p == 'string') {
        p = {
          'name': p
        };
      }
      if (typeof p !== 'object' || !p['name'] || typeof p['name'] !== 'string') {
        return;
      }

      if (typeof p['params'] !== 'object' || typeof p['params'] !== 'string') {
        p['params'] = {};
      }

      if ($.isArray(p['events'])) {
        p['events'] = p['events'].join(' ');
      }
      if (!p['events'] || typeof p['events'] !== 'string') {
        p['events'] = 'click';
      }

      self.on(p['events'], function(e) {
        if ($.isFunction(p['beforeSend'])) p['beforeSend'](e);
        var gs = window['GoSquared'];
        if (!window['GoSquared']) window['GoSquared'] = {};
        if (!window['GoSquared']['q']) window['GoSquared']['q'] = [];
        window['GoSquared']['q']['push'](['TrackEvent', p['name'], p['params']]);
        if ($.isFunction(p['beforeSend'])) p['afterSend'](e);
      });
    });
  };

  // stores the options, such as site_token
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
      timeout: params['timeout'] || opts['timeout'] || 2000,
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

  $['GoSquared'] = function(config) {
    opts = config;
    return this;
  };

  for (var i = 0; i< defaultFunctions.length; i++) {
    $['GoSquared'][defaultFunctions[i]] = defaultFunction.bind(this,defaultFunctions[i]);
  }

  
})(jQuery,window);