var storage = window.localStorage;

var store = {
  clr: () => {
    storage.clear();
  },

  del: (key) => {
    storage.removeItem(key);
  },

  get: (key) => {
    return storage.getItem(key);
  },

  set: (key, val) => {
    storage.setItem(key, val);
  }
}

export default store;
