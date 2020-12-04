import {Sprite} from './sprite.js';

export class Flow {
  id;
  sprites = [];
  path = [];
  parrentState;
  isMove = true;
  velocity;
  tick;

  constructor(_path, _velocity, _split = 0) {
    this.path = _path;
    this.velocity = 100/_velocity;
    this.tick = this.velocity;
  }
  addSprite = (_sprite) => {
    if(_sprite) {
      this.sprites.push(_sprite);
    }
  }
  addSprites = (_icon, _gutter, _amount) => {
    for(let i = 0; i < _amount; i++) {
      this.sprites.push(new Sprite(_icon, _gutter));
    }
  }
  addSpliters = (_spliter, _each) => {
    if(_each + 1 < this.sprites.length) {
      for (let i = 0; i < this.sprites.length; i+=_each + 1) {
        this.sprites.splice(i, 1, new Sprite(_spliter, this.sprites[1].gutter));
      }
    }
  }
  init = () => {
    console.log(`     flow ${this.id}.init()..`);
    console.log("         sprites.init()..");
    this.parrentState.innerHTML += `<div class="flows__item" id="${this.id}"></div>`;
    const flowItem = document.getElementById(this.id);

    if(this.path.length < 2) {
      alert('Задан слишком короткий путь!');
    } else {
      const first = { x: this.path[0].x, y: this.path[0].y };
      const second = { x: this.path[1].x, y: this.path[1].y };

      this.sprites.forEach((e, index) => {
        flowItem.innerHTML += `<span class="${e.icon}" id="${this.id}_${index}"></span>`;
        e.id = `${this.id}_${index}`;
        if(first.x > second.x) { 
          if(index == 0) {
            e.x = -e.gutter;
          } else {
            e.x = (e.gutter * (index - 1));
          }
          e.y = this.path[0].y;
          e.curDirection = 2; 
          e.direction = 2; 
        } else if(first.x < second.x) { 
          if(index == 0) {
            e.x = e.gutter;
          } else {
            e.x = -(e.gutter * (index - 1));
          }
          e.y = this.path[0].y;
          e.curDirection = 0; 
          e.direction = 0; 
        } else if(first.y > second.y) {
          if(index == 0) {
            e.y = -e.gutter;
          } else {
            e.y = (e.gutter * (index - 1));
          }
          e.x = this.path[0].x;
          e.curDirection = 3; 
          e.direction = 3; 
        } else if(first.y < second.y) { 
          if(index == 0) {
            e.y = e.gutter;
          } else {
            e.y = -(e.gutter * (index - 1));
          }
          e.x = this.path[0].x;
          e.curDirection = 1; 
          e.direction = 1; 
        } 
      });
    }
    console.log("         sprites.init() done");
    console.log(`     flow ${this.id}.init() done`);
  }
  getPrevPathStep = (_el) => {
    const prevSpriteStep = _el.pathStep - 1;
    if(prevSpriteStep < 0) {
      return false;
    } 
    return this.path[prevSpriteStep];
  }
  getNextPathStep = (_el) => {
    const nextSpriteStep = _el.pathStep + 1;
    if(nextSpriteStep >= (this.path.length)) {
      return false;
    }
    return this.path[nextSpriteStep];    
  }
  transform(_el, _rotate = 0, _mirror = false) {
    if(_mirror) {
      _el.el().style.transform = `translate(${_el.x}px, ${_el.y}px) rotate(${_rotate}deg)`;
    } else {
      _el.el().style.transform = `translate(${_el.x}px, ${_el.y}px) rotate(${_rotate}deg)`;
    }
  }
  move = () => {
    if(this.tick <= 0) {
      this.sprites.forEach((el, index) => {
        if(!this.getNextPathStep(el)) {
          this.isMove = false;
          el.pathStep = 0;
          el.x = this.path[0].x;
          el.y = this.path[0].y;
          el.curDirection = el.direction;
        } else {
          if(el.curDirection == 0) {
            if(this.getNextPathStep(el).x >= el.x) {
              if(el.x >= 0) {  
                this.transform(el);    
              }    
            } else {
              el.pathStep++;
              if(this.getNextPathStep(el).y >= el.y) {
                el.curDirection = 1;
              } else {
                el.curDirection = 3;
              }
            }
            el.x++;
          } else if(el.curDirection == 1) {
            if(this.getNextPathStep(el).y >= el.y) {
              if(el.y >= 0) {
                this.transform(el, 90);  
              } 
            } else {
              el.pathStep++;
              if(this.getNextPathStep(el).x >= el.x) {
                el.curDirection = 0;
              } else {
                el.curDirection = 2;
              }
            }
            el.y++;
          } else if(el.curDirection == 2) {
            if(this.getNextPathStep(el).x <= el.x) {
              if(el.x < 0) {
                this.transform(el, 180);  
              }  
            } else {
              el.pathStep++;
              if(this.getNextPathStep(el).y <= el.y) {
                el.curDirection = 3;
              } else {
                el.curDirection = 1;
              }
            }
            el.x--;
          } else if(el.curDirection == 3) {
            if(this.getNextPathStep(el).y <= el.y) {
              if(el.y < 0) {
                this.transform(el, 270);  
              } 
            } else {
              el.pathStep++;
              if(this.getNextPathStep(el).x <= el.x) {
                el.curDirection = 2;
              } else {
                el.curDirection = 0;
              }
            }
            el.y--;
          }
        }
      });
      this.tick = this.velocity;
    } 
    this.tick--;
  }
}