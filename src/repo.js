import { repo_url } from './config';
import store from './store';
import axios from 'axios';

var doUseLocalStorage = false;

var cache = [];

/**
 * populates default storage with default colors
 * @return {Array} - default colors
 */
function populateLocalColors() {
  var colors = [
    { hex: "FF0000", name: "red" },
    { hex: "00FF00", name: "green" },
    { hex: "0000FF", name: "blue" }
  ];

  store.setJSON('colors', colors);
  return colors;
}

/**
 * get colors from local storage
 * @return {Array}
 */
function getLocalStorage() {
  var colors = store.getJSON('colors') || populateLocalColors();
  for (var i in colors)
    colors[i]['color_id'] = i;
  return colors;
}

/**
 * puts color into local storage
 * @param {string} name 
 * @param {string} hex 
 */
function putLocalStorage(name, hex) {
  var colors = store.getJSON('colors');
  colors.push({ name: name, hex: hex });
  store.setJSON('colors', colors);
}

/**
 * patch color in local storage
 * @param {number} colorId 
 * @param {string} name 
 * @param {string} hex 
 */
function patchLocalStorage(colorId, name, hex) {
  var colors = store.getJSON('colors');
  colors[colorId] = { name: name, hex: hex };
  store.setJSON('colors', colors);
}

/**
 * delete color in local storage
 * @param {number} colorId 
 */
function deleteLocalStorage(colorId) {
  var colors = store.getJSON('colors');
  colors.splice(colorId, 1);
  store.setJSON('colors', colors);
}

/**
 * use local storage instead of external API
 * @return {null}
 */
export const useLocalStorage = () => {
  doUseLocalStorage = true;
}

/**
 * determine health of endpoint
 * @return {Promise}
 */
export const ping = () => {
  return new Promise((resolve, reject) => {
    axios.get(repo_url + '/ping')
      .then((res) => {
        if (res.status === 200)
          return resolve(1);

        reject('Unhealthy endpoint');
      })
      .catch((err) => {
        reject(err);
      })
  })
}

/**
 * returns color from cache at index
 * @param {number} colorId
 * @return {Object}
 */
export const getColor = (colorId) => {
  console.log(cache);
  for (var i in cache)
    if (cache[i]['color_id'] == colorId)
      return cache[i];
  return null;
}

/**
 * gets all color in repository
 * @return {Promise}
 */
export const getColors = () => {
  return new Promise((resolve, reject) => {
    try {
      if (doUseLocalStorage) {
        cache = getLocalStorage();
        return resolve(cache);
      }
    
      axios.get(repo_url)
        .then((res) => {
          if (res.status === 200 && res.data instanceof Array) {
            var colors = res.data;
            cache = colors;
            return resolve(colors);
          }
          
          if (res.data && res.data.error)
            return reject(res.data.error);
          
          reject('Error getting colors');
        })
        .catch((err) => {
          reject(err);
        });
    } catch(err) {
      reject(err);
    }
  });
}

/**
 * puts color into repository
 * @param {string} name
 * @param {string} hex
 * @return {Promise}
 */
export const putColor = (name, hex) => {
  return new Promise((resolve, reject) => {
    try {
      if (doUseLocalStorage) {
        putLocalStorage(name, hex);
        return resolve(1);
      }

      axios.put(repo_url, { name: name, hex: hex })
        .then((res) => {
          if (res.status === 200)
            return resolve(1);

          if (res.data && res.data.error)
            return reject(res.data.error);

          return reject('Error putting color');
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * patches colors in repository
 * @param {number} colorId
 * @param {string} name
 * @param {string} hex
 * @return {Promise}
 */
export const updateColor = (colorId, name, hex) => {
  return new Promise((resolve, reject) => {
    try {
      if (doUseLocalStorage) {
        patchLocalStorage(colorId, name, hex);
        return resolve(1);
      }

      axios.patch(repo_url, { color_id: colorId, name: name, hex: hex })
        .then((res) => {
          if (res.status === 200)
            resolve(1);

          if (res.data && res.data.error)
            return reject(res.data.error);

          return reject('Error patching color');
        })
        .catch((err) => {
          reject(err);
        })
    } catch (err) {
      reject(err);
    }
  })
}

/**
 * deletes color from repository
 * @param {number} colorId
 * @return {Promise}
 */
export const deleteColor = (colorId) => {
  return new Promise((resolve, reject) => {
    try {
      if (doUseLocalStorage) {
        deleteLocalStorage(colorId);
        return resolve(1);
      }

      axios.delete(repo_url, { color_id, colorId })
        .then((res) => {
          if (res.status === 200)
            return resolve(1);

          if (res.data && res.data.error)
            return reject(res.data.error);

          return reject('Error deleting color');
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  })
}