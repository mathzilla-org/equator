var MQ1 = getInterface(1);
for (var key in MQ1) (function(key, val) {
  if (typeof val === 'function') {
    Equator[key] = function() {
      insistOnInterVer();
      return val.apply(this, arguments);
    };
    Equator[key].prototype = val.prototype;
  }
  else Equator[key] = val;
}(key, MQ1[key]));

}());
