import {State} from './state.js';

export class Engine {
  states = [];
  interval = null;
  constructor() {
    
  }
  addState = (_state) => {
    if(_state.id) {
      this.states.push(_state);
    }
  }
  init = () => {
    console.log("engine.init()..");
    this.states.forEach(e => {
      e.init();
    }); 
    console.log("engine.init() done");
  }
  render = (_speed) => {
    console.log("engine.render()..");
    this.interval = setInterval(() => {
      this.states.forEach(e => {
        if(e.move() == false) clearInterval(this.interval);
      }); 
    }, 100/_speed);
  }
  stop = () => {
    console.log("engine.stop()");
    clearInterval(this.interval);
  }
}