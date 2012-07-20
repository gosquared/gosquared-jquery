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
})(jQuery);