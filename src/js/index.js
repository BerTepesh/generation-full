import {Engine} from './engine.js';
import {State} from './state.js';
import {Flow} from './flow.js';

//Пути
const reciclePath = [{x: 0, y: 0}, {x: 174, y: 0}],
      wastePath = [{x: 0, y: 0}, {x: 144, y: 0}, {x: 144, y: 210}],
      couplesPath = [{x: 19, y: 0},{x: 19, y: 99}, {x: 157, y: 99},{x: 157,y: 175}],
      gasPath = [{x: 21, y: 0},{x: 21, y: -209}, { x: 170, y: -209}],
      condensatePath = [{x: 0, y: 0}, {x: 0, y: -96}, {x: 135, y: -96},{x: 135, y: -155}],
      couplesPath2 = [{x: 0, y: 0}, {x: -275, y: 0}],
      electricityPath = [{x: 0, y: 0}, {x: 195, y: 0}],
      ashPath = [{x: 0, y: -13},{x: 195, y: -13}],
      slagPath = [{x: 0, y: 0},{x: 350, y: 0}];

//Создание потоков
//path, velocity(0-100)
const recicleFlow = new Flow(reciclePath, 70),
      wasteFlow = new Flow(wastePath, 40),
      couplesFlow = new Flow(couplesPath, 50),
      gasFlow = new Flow(gasPath, 40),
      condensateFlow = new Flow(condensatePath, 30),
      couplesFlow2 = new Flow(couplesPath2, 20),
      electricityFlow = new Flow(electricityPath, 30),
      ashFlow = new Flow(ashPath, 30),
      slagFlow = new Flow(slagPath, 40);

//Наполнение потоков спрайтами
//icon, gutter, amount
recicleFlow.addSprites('icon-recicle-flow', 30, 6);
couplesFlow.addSprites('icon-couples', 40, 8);
couplesFlow2.addSprites('icon-couples', 35, 8, 8);
electricityFlow.addSprites('icon-flash-other', 25, 8);
ashFlow.addSprites('icon-filter-tube', 25, 8);
wasteFlow.addSprites('icon-recicle-flow', 30, 12);
gasFlow.addSprites('icon-smoke', 30, 12);
slagFlow.addSprites('icon-burn-flow', 35, 10);
condensateFlow.addSprites('icon-condensate', 30, 11);

//Добавление разделителей
//icon, each
recicleFlow.addSpliters('split', 2);
wasteFlow.addSpliters('split split_waste', 2);
gasFlow.addSpliters('split split_gas', 2);

// Создание позиции
const recicleState = new State('recicle'),
      bunkerState = new State('bunker'),
      burnState = new State('burn'),
      capacitorState = new State('capacitor'),
      turboState = new State('turbo'),
      filterState = new State('filter');

// Добавление потоков в позиции
recicleState.addFlow(recicleFlow);
bunkerState.addFlow(wasteFlow);
burnState.addFlow(couplesFlow);
burnState.addFlow(gasFlow);
burnState.addFlow(slagFlow);
capacitorState.addFlow(condensateFlow);
turboState.addFlow(couplesFlow2);
turboState.addFlow(electricityFlow);
filterState.addFlow(ashFlow);

// Создание движка
const engine = new Engine();

// Доавление позиции в движок
engine.addState(recicleState);
engine.addState(bunkerState);
engine.addState(burnState);
engine.addState(capacitorState);
engine.addState(turboState);
engine.addState(filterState);

// Инициализация движка
engine.init();

// Рендер (скорость 0 - 100)
engine.render(20);

// console.log(condensateFlow.sprites);



