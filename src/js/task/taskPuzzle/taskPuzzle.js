import { arrayRandomNumber } from '../../utils/utils';
import dataTaskPuzzle from './data/dataTaskPuzzle';

export default class Puzzle {
  constructor() {
    this.currentTask = dataTaskPuzzle[arrayRandomNumber(dataTaskPuzzle)];
    this.render();
    this.isAnswered = '';
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');

    qWrapper.innerHTML = `
      <div class='task'>
        <p>Отгадайте загадку: ${this.currentTask.puzzle}</p>
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
    const getUserAnswer = document.querySelector('.answer').value.trim().toLowerCase();

    if (getUserAnswer === this.currentTask.answer) {
      this.isAnswered = true;
    } else {
      this.isAnswered = false;
    }
    document.querySelector('.qWrapper').remove();
  }
}
