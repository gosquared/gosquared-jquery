(function($,window) {

  // Fill in _gs function in case it hasn't been set yet
  var gs = '_gs';
  window[gs] = window[gs] || function(){ (window[gs]['q'] = window[gs]['q'] || []).push(arguments) };


  $.fn['track'] = function(p) {
    return this.each(function() {
      var pName = typeof p === 'object' ? p.name : p;

      if(!pName) return;

      var pParams = p['params'] || {};

      var events = p['events'];

      if ($.isArray(events)) {
        events = events.join(' ');
      }

      if (!events || typeof events !== 'string'){
        events = 'click';
      }

      $(this).on(events, function(e) {
        if ($.isFunction(p['beforeSend'])) p['beforeSend'](e);

        window[gs]('event', pName, pParams);

        if ($.isFunction(p['afterSend'])) p['afterSend'](e);
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
    $['GoSquared'][defaultFunctions[i]] = $.proxy(defaultFunction,this,defaultFunctions[i]);
  }


})(jQuery,window);
