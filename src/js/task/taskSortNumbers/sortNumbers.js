import $ from 'jquery';
import sortable from 'jquery-ui/sortable';

export default class SortNumbers {
  constructor() {
    this.sortArr = [];
    this.sortedArr = [];
    this.initArrs();
    this.isAnswered = '';
    this.render();
  }

  initArrs() {
    for (let i = 0; i < 3; i++) {
      this.sortArr.push(Math.floor(Math.random() * 10));
    }

    this.sortedArr = this.sortArr.slice().sort((a, b) => a - b);
  }

  render() {
    let span = '';
    this.sortArr.forEach((elem) => {
      span += `
        <span class="ui-sortable-handle">${elem}</span>
        `;
    });

    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');

    qWrapper.innerHTML = `
      <div class="task">
        <p>Упорядочить по возрастанию перетягивая мышкой:</p>
        <div class="sort answer ui-sortable">
          ${span}
        </div>
        <p>или вводить последовательно без пробелов</p>
        <input autofocus required type="text" class="keyboardAnswer">
        <input type="submit" class="submitBtn" value="OK">
      </div>
    `;
    document.body.appendChild(qWrapper);

    $(() => {
      $('.sort').sortable();
    });

    document.querySelector('.task').addEventListener('click', (e) => {
      e.preventDefault();
      const submit = document.querySelector('.submitBtn');

      if (e.target === submit) {
        this.cheсkAnswer();
      }
    });
  }

  cheсkAnswer() {
    const keyboardAnswer = document.querySelector('.keyboardAnswer').value.trim();
    const response = [];
    const sort = document.querySelector('.sort');

    for (let i = 0; i < sort.childElementCount; i++) {
      response.push(sort.children[i].textContent);
    }

    const finishКeformedAnswer = response.join('');

    if (finishКeformedAnswer === this.sortedArr.join('')
      || keyboardAnswer === this.sortedArr.join('')) {
      this.isAnswered = true;
    } else {
      this.isAnswered = false;
    }

    document.body.querySelector('.qWrapper').remove();
  }
}
