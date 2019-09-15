import {
  getColors,
  getColor,
  ping,
  putColor,
  updateColor,
  useLocalStorage
} from './repo';

import './styles/app.scss';

document.getElementById('app').innerHTML = require('./templates/index.pug')({
  title: 'color-notebook'
});

function toggleEditor(color) {
  if (color) {
    document.getElementById('currentTitle').innerText = color.name;
    document.getElementById('colorIdInput').value = color.color_id;
    document.getElementById('hexInput').value = '#' + color.hex;
    document.getElementById('nameInput').value = color.name;
  }
  document.getElementById('editor').classList.toggle('hidden');
}

function loadColors() {
  getColors()
    .then((colors) => {
      document.getElementById('colors').innerHTML = require('./templates/colors.pug')({
        colors: colors
      });

      [...document.querySelectorAll('.color')].forEach(function(item) {
          item.addEventListener('click', (e) => {
            const colorId = e.target.dataset.color_id;
            if (colorId)
              toggleEditor(getColor(colorId));
          });
      });

      document.getElementById('newColor').addEventListener('click', () => {
        putColor('new', '000000')
          .then(() => { loadColors(); })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

document.getElementById('closeEditor').addEventListener('click', (e) => {
  e.preventDefault();
  toggleEditor();
});

document.getElementById('editorForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const colorId = document.getElementById('colorIdInput').value;
  const hex = document.getElementById('hexInput').value;
  const name = document.getElementById('nameInput').value;
  updateColor(colorId, name, hex.slice(1, hex.length))
    .then(() => {
      loadColors().finally(() => toggleEditor());
    })
    .catch(() => {
      toggleEditor();
    })
});

ping()
  .catch((err) => {
    console.log(err);
    useLocalStorage();
  })
  .finally(() => {
    loadColors();
  });
