import { Color } from './colors';

import './styles/app.scss';

var template = require('./templates/index.pug');

var colors = [];
for (var i = 0; i < 5; i++)
  colors.push(new Color().randomize().hex())

document.getElementById('app').innerHTML = template({
  title: 'randum-colors',
  colors: colors
});

Array.from(document.getElementsByClassName('color')).forEach((color) => {
  color.onclick = (e) => {
    var hex = new Color().randomize().hex();
    color.style.background = hex;
    color.children[0].value = hex;
  }
});

Array.from(document.getElementsByTagName('input')).forEach((input) => {
  input.onclick = (e) => {
    e.stopPropagation();
  }
});
