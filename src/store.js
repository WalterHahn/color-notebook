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
  },

  getJSON: (key) => {
    const val = storage.getItem(key);
    return (val) ? JSON.parse(val) : null;
  },

  setJSON: (key, val) => {
    storage.setItem(key, JSON.stringify(val));
  }
}

export default store;
