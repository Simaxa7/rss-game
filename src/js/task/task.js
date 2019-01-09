import Capital from './taskCapitals/capitals';
import ElementaryMath from './taskElementaryMath/elementaryMath';
import SortNumbers from './taskSortNumbers/sortNumbers';
import SquareFigure from './taskSquareFigure/squareFigure';
import ConvertBinary from './taskConvertBinary/convertBinary';

import WhatIsSaid from './taskWhatIsSaid/whatIsSaid';
import Puzzle from './taskPuzzle/taskPuzzle';

export default class Task {
  constructor() {
    this.currentTask = '';
    this.flex = 'flex';
  }

  chooseTask() {
    const selectedTask = Math.floor(Math.random() * 7);
    switch (selectedTask) {
      case 0:
        this.currentTask = new Capital();
        break;
      case 1:
        this.currentTask = new SortNumbers();
        break;
      case 2:
        this.currentTask = new ElementaryMath();
        break;
      case 3:
        this.currentTask = new SquareFigure();
        break;
      case 4:
        this.currentTask = new ConvertBinary();
        break;
      case 5:
        this.currentTask = new WhatIsSaid();
        break;
      case 6:
        this.currentTask = new Puzzle();
        break;
      default:
        break;
    }
  }

  show() {
    document.body.querySelector('.qWrapper').style.display = this.flex;
  }
}
