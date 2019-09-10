import randum from 'randum';

randum.int('color-part', 0, 255);

function hexValue(component) {
  const hex = component.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export class Color {
  constructor(r,g,b,a) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
    this.a = a || 0;
  }

  randomize() {
    this.r = randum.get('color-part');
    this.g = randum.get('color-part');
    this.b = randum.get('color-part');
    this.a = 1; 

    return this;
  }

  hex() {
    return "#" + hexValue(this.r) + hexValue(this.g) + hexValue(this.b);
  }
}
