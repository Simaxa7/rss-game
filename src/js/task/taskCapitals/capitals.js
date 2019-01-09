import { arrayRandomNumber } from '../../utils/utils';
import dataCapitals from './data/dataCapitals';

export default class Capital {
  constructor() {
    this.currentCapital = dataCapitals[arrayRandomNumber(dataCapitals)];
    this.isAnswered = '';
    this.cheatСode = '1';
    this.render();
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');

    qWrapper.innerHTML = `
      <div class='task'>
        <img src=${this.currentCapital.img}>
        <p>Столица:</p>
        <form>
          <input autofocus required type='text' class='answer'>
          <input type='submit' class='submitBtn' value='OK'>
        </form>
      </div>
    `;
    document.body.appendChild(qWrapper);

    document.querySelector('.task').addEventListener('click', (e) => {
      e.preventDefault();
      const submit = document.querySelector('.submitBtn');
      const getUserAnswer = document.querySelector('.answer')
        .value.trim()
        .toLowerCase();

      if (e.target === submit) {
        if (getUserAnswer === this.currentCapital.capital
          || getUserAnswer === this.cheatСode) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        qWrapper.remove();
      }
    });
  }
}
