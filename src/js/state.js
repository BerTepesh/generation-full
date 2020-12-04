import {Flow} from './flow.js';

export class State {
  flows = [];
  id;
  constructor(_id) {
    if(document.getElementById(_id)) {
      this.id = _id;
    } else {
      console.log(`state ${this.id}.init() flow not found`);
    }
  }
  addFlow(_flow) {
    if(_flow) {
      this.flows.push(_flow);
    }
  }
  init() {
    console.log(`   state ${this.id}.init()..`);
    this.flows.forEach((e, index) => {
      e.id = `${this.id}_${index}`;
      e.parrentState = document.getElementById(this.id);
      e.init();
    });
    console.log(`   state ${this.id}.init() done`);
  }
  move() {
    this.flows.forEach(e => {
      e.move();
    });
  }
}