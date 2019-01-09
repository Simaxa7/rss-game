import dataWhatIsSaid from './data/dataWhatIsSaid';
import { arrayRandomNumber } from '../../utils/utils';

export default class WhatIsSaid {
  constructor() {
    this.currentWord = dataWhatIsSaid[arrayRandomNumber(dataWhatIsSaid)].word;
    this.synth = window.speechSynthesis;
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = 'en-US';
    this.speech.text = this.currentWord;
    this.render();
  }

  render() {
    const qWrapper = document.createElement('div');
    qWrapper.classList.add('qWrapper');

    qWrapper.innerHTML = `
      <div class='task'>
        <button class="playBtn">Play</button>
        <p>Напишите услышанное слово</p>
        <form>
          <input required type='text' class='answer'>
          <input type='submit' class='submitBtn' value='OK'>
        </form>
      </div>
    `;
    document.body.appendChild(qWrapper);

    document.querySelector('.task').addEventListener('click', (e) => {
      const getUserAnswer = document.querySelector('.answer').value.trim().toLowerCase();
      e.preventDefault();
      this.cheсkAnswer();
      if (e.target === document.querySelector('.playBtn')) {
        this.synth.speak(this.speech);
      }

      if (e.target === document.querySelector('.submitBtn')) {
        if (getUserAnswer === this.currentWord) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
        document.querySelector('.qWrapper').remove();
      }
    });
  }
}
