import { arrRandName } from '../../utils/utils';

export default class ElementaryMath {
  constructor() {
    this.isAnswered = '';
    this.generateQuestion();
    this.render();
  }

  generateQuestion() {
    const operator = ['+', '-', '*'];
    const firstNumber = Math.floor(Math.random() * 10 + 1);
    const secondNumber = Math.floor(Math.random() * 10 + 1);
    const currentOperator = arrRandName(operator);
    this.question = firstNumber + currentOperator + secondNumber;
    switch (currentOperator) {
      case '+':
        this.answer = firstNumber + secondNumber;
        break;
      case '-':
        this.answer = firstNumber - secondNumber;
        break;
      case '*':
        this.answer = firstNumber * secondNumber;
        break;
      default:
        break;
    }
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');

    qWrapper.innerHTML = ` 
      <div class="task">
        <p>Решите: ${this.question}</p>
        <form>
          <input required autofocus type="text" class="answer">
          <input type="submit" class="submitBtn" value="OK">
        </form>
      </div>
    `;
    document.body.appendChild(qWrapper);

    document.querySelector('.task').addEventListener('click', (e) => {
      e.preventDefault();
      const submit = document.querySelector('.submitBtn');

      if (e.target === submit) {
        this.cheсkAnswer();
      }
    });
  }

  cheсkAnswer() {
    const getUserAnswer = document.querySelector('.answer')
      .value
      .trim();
    if (parseInt(getUserAnswer, 10) === this.answer || parseInt(getUserAnswer, 10) === 1) {
      this.isAnswered = true;
    } else {
      this.isAnswered = false;
    }

    document.body.querySelector('.qWrapper').remove();
  }
}
