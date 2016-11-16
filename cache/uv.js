var mini = (function() {
  var init;
  var store;
  var keys = [];
  return {
    new: function() {
      if (init == undefined) {
        store = new Map();
        init = true;
      }
    },
    get: function(k) {
      return store.get(k);
    },
    set: function(k, v) {
      if (store.get(k) == undefined) {
        keys.push(k);
      }
      store.set(k, v);
    },
    keys: function () {
      return keys;
    },
    clear: function() {
      store.clear();
    }
  }
})();

module.exports = mini;