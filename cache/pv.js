var mini = (function() {
  var init;
  var store;
  var keys = [];
  return {
    new: function(k, v) {
      if (init == undefined) {
        store = new Map();
        init = true;
        this.set(k, v);
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