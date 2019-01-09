import { arrayRandomNumber } from '../../utils/utils';
import dataSquareFigure from './data/dataSquareFigure';

export default class SquareFigure {
  constructor() {
    this.currentFigure = dataSquareFigure[arrayRandomNumber(dataSquareFigure)];
    this.isAnswered = '';
    this.cheatСode = '1';
    this.currentNumberForTask = Math.floor(Math.random() * 10 + 1);
    this.render();
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');

    qWrapper.innerHTML = `
      <div class='task'>
        <img src=${this.currentFigure.figureImg}>
        <p>Фигура:${this.currentFigure.description}</p>
        <p>Найти площадь этой фигуры</p>
        <p>если известно что ${this.currentFigure.param}: ${this.currentNumberForTask}</p>
        <form>
          <input autofocus required type='text' class='answer'>
          <input type='submit' class='submitBtn' value='OK'>
        </form>
      </div>
    `;
    document.body.appendChild(qWrapper);

    document.querySelector('.submitBtn').addEventListener('click', (e) => {
      e.preventDefault();
      const submit = document.querySelector('.submitBtn');
      if (e.target === submit) {
        this.cheсkAnswer();
      }
    });
  }

  cheсkAnswer() {
    let answerCalculate;

    switch (this.currentFigure.param) {
      case 'radius':
        answerCalculate = 3.14 * Math.pow(this.currentNumberForTask, 2) / 2;
        break;
      case 'sideSquare':
        answerCalculate = Math.pow(this.currentNumberForTask, 2);
        break;
      case 'sideTriangle':
        answerCalculate = Math.pow(this.currentNumberForTask, 2) / 2;
        break;
      default:
        break;
    }
    const getUserAnswer = document.querySelector('.answer').value.trim();

    if (parseInt(getUserAnswer, 10) === answerCalculate) {
      this.isAnswered = true;
    } else {
      this.isAnswered = false;
    }
    document.querySelector('.qWrapper').remove();
  }
}
