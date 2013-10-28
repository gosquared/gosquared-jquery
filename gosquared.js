(function($,window) {

  // EVENT TRACKING FUNCTIONALITY
  $.fn['track'] = function(p) {
    return this.each(function() {
      var self = $(this);

      // allow us to only call track with a string of the event name
      if (typeof p == 'string') {
        p = {
          'name': p
        };
      }

      // invalid arguments
      if (typeof p !== 'object' || !p['name'] || typeof p['name'] !== 'string') {
        return;
      }

      // check params is an object or string, {} if not
      if (typeof p['params'] !== 'object' || typeof p['params'] !== 'string') {
        p['params'] = {};
      }

      // join events array if specified
      if ($.isArray(p['events'])) {
        p['events'] = p['events'].join(' ');
      }

      // default to click event
      if (!p['events'] || typeof p['events'] !== 'string') {
        p['events'] = 'click';
      }

      self.on(p['events'], function(e) {

        // if beforeSend is specified, call it
        if ($.isFunction(p['beforeSend'])) p['beforeSend'](e);

        // track the event
        window['_gs']('event', p['name'], p['params']);

        // if afterSend is specified, call it
        if ($.isFunction(p['afterSend'])) p['afterSend'](e);
      });
    });
  };



  // API FUNCTIONALITY

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

  var defaultFunction = function(namespace, version, func, params, cb) {
    if ($.isFunction(params)) {
      // params is the callback
      cb = params;
      params = {};
    }

    get(namespace, version, func, params || {}, cb || function(){});
  };

  var functions = {
    'account': {
      'def': 'v1',
      'v1': [
        "alertPreferences",
        "ignoredVisitors",
        "reportPreferences",
        "sites"
      ]
    },
    'now': {
      'def': 'v3',
      'v3': [
        "aggregateStats",
        "campaigns",
        "concurrents",
        "engagement",
        "geo",
        "overview",
        "pages",
        "sources",
        "timeSeries",
        "visitors"
      ]
    },
    'trends': {
      'def': 'v2',
      'v2': [
        "aggregate",
        "browser",
        "country",
        "event",
        "language",
        "organisation",
        "os",
        "page",
        "path1",
        "screenDimensions",
        "sources"
      ]
    }
  };

  var get = function(namespace, version, endpoint, params, cb) {

    $.ajax({
      url: 'https://api.gosquared.com/' + namespace + '/' + version + '/' + endpoint,
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

  var g = $['GoSquared'] = function(config) {
    opts = config;
    return this;
  };

  for (var namespace in functions) {

    var n = g[namespace];

    // ensure object exists
    if (!n) n = g[namespace] = {};

    for (var version in functions[namespace]) {
      if (version === 'def') continue;

      var v = n[version];

      // ensure version object exists
      if (!v) v = n[version] = {};

      var fncs = functions[namespace][version];

      for (var i = 0; i < fncs.length; i++) {
        var f = v[fncs[i]] = $.proxy(defaultFunction, this, namespace, version, fncs[i]);

        // is this the default version?
        if (version === functions[namespace]['def']) {

          // set it on the namespace (e.g. $.GoSquared.now.concurrents)
          n[fncs[i]] = f;

          // set it on the root (e.g. $.GoSquared.concurrents)
          g[fncs[i]] = f;
        }

      }

    }
  }

})(jQuery,window);
