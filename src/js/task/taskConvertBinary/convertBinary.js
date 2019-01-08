export default class ConvertBinary {
  constructor() {
    this.currentNumberForTask = Math.floor(Math.random() * 10);
    this.isAnswered = '';
    this.render();
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');

    qWrapper.innerHTML = `
      <div class='task'>
        <p>${this.currentNumberForTask} в двоичной СС будет выглядеть как?</p>
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
    const getUserAnswer = document.querySelector('.answer').value.trim();
    if (parseInt(getUserAnswer, 2) === this.currentNumberForTask) {
      this.isAnswered = true;
    } else {
      this.isAnswered = false;
    }
    document.querySelector('.qWrapper').remove();
  }
}
