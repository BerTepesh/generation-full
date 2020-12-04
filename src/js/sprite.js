export class Sprite {
  id;
  icon;
  gutter;
  pathStep = 0;
  curDirection;
  direction;
  x = 0;
  y = 0;
  constructor(_icon, _gutter) {
    this.icon = _icon;
    this.gutter = _gutter;
  }
  el = () => {
    return document.getElementById(this.id);
  }
}