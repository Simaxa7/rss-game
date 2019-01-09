import { magicBook, background } from './helpers';
import Personage from './characters/personage';
import Spell from './spell/spell';
import Task from './task/task';
import { pushLocalStorage } from './utils/utils';

const keys = {
  W: 87,
  E: 69,
  R: 82,
  T: 84,
  Y: 89,
  Enter: 13,
  SPACE: 32,
  leftArrow: 37,
  rightArrow: 39,
};

let isModalOpen = false;
let isTaskQuestionOpen = false;
export default class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.player;
    this.monster;
    this.monsterKilled = 0;
    this.spell = new Spell();
    this.task = new Task();
    this.loop;
    this.initCanvas();
    this.setTextStyle();
    this.onKeyEnter = false;
  }

  initNps(optionsPlayer, optionsMonster) {
    this.player = new Personage(optionsPlayer);
    this.monster = new Personage(optionsMonster);
  }

  initCanvas() {
    document.body.appendChild(this.canvas);
    this.canvas.width = 1100;
    this.canvas.height = 700;
  }

  setTextStyle() {
    this.context.font = '30px arial';
    this.context.textAlign = 'center';
  }

  drawBackground() {
    this.context.drawImage(
      background,
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
    this.context.fillStyle = '#fff';
    this.context.font = '30px arial';
    this.context.fillText(`Монстров убито: ${this.monsterKilled}`, `${this.canvas.width / 2}`, 50);
  }

  spellBook() {
    const startX = `${this.canvas.width * 0.05}`;
    this.context.drawImage(magicBook, startX, 300, 100, 100);
    this.canvas.onclick = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (y >= 320 && y <= 400 && x >= 90 && x <= 165 && !isModalOpen) {
        this.spell.show();
        this.task.chooseTask();
        isModalOpen = true;
      }
    };
  }

  render() {
    this.drawBackground();
    this.spellBook();
    this.monster.render();
    this.player.render();
  }

  gameLoop() {
    this.loop = requestAnimationFrame(() => {
      this.gameLoop();
    });
    this.render();
    this.checkState();
  }

  keyControl(key) {
    if (key.keyCode === keys.SPACE && !isModalOpen) {
      this.spell.show();
      this.task.chooseTask();
      isModalOpen = true;
      isTaskQuestionOpen = true;
    }

    if (isTaskQuestionOpen) {
      const gameSpell = this.spell;
      if (key.keyCode === keys.rightArrow) {
        gameSpell.selectedSpell = 'hit';
        gameSpell.isSpellSelected = true;
        gameSpell.hide();
        this.onKeyEnter = true;
        isTaskQuestionOpen = false;
      }
      if (key.keyCode === keys.leftArrow) {
        gameSpell.selectedSpell = 'health';
        gameSpell.isSpellSelected = true;
        gameSpell.hide();
        this.onKeyEnter = true;
        isTaskQuestionOpen = false;
      }
    }
  }

  checkState() {
    if (this.spell.isSpellSelected) {
      this.spell.isSpellSelected = false;
      this.task.show();
    }
    if (this.task.currentTask.isAnswered === true) {
      if (this.spell.selectedSpell === 'hit') {
        this.player.attack(this.monster);
      }
      if (this.spell.selectedSpell === 'health') {
        this.player.heal();
      }
      this.task.currentTask.isAnswered = '';
      isModalOpen = false;
    }

    if (this.task.currentTask.isAnswered === false) {
      this.monster.attack(this.player);
      this.task.currentTask.isAnswered = '';
      isModalOpen = false;
    }
    if (this.player.hp <= 0) {
      this.cancelAnimation();
      this.createScoreboard();
      this.canvas.remove();
    }
    if (this.monster.hp <= 0) {
      this.monsterKilled++;
      this.monster.generateHealth(this.monsterKilled);
      setTimeout(() => {
        this.monster.choiceBody();
        this.monster.generateName();
      }, 400);
    }
  }

  restart() {
    this.initCanvas();
    this.monsterKilled = 0;
    this.player.hp = 100;
    this.monster.choiceBody();
    this.monster.generateHealth(this.monsterKilled);
    this.monster.generateName();
    this.setTextStyle();
    this.gameLoop();
  }

  pushResultInLocalStorage() {
    const newData = {
      name: this.player.name,
      result: this.monsterKilled,
    };

    pushLocalStorage('finalGame', newData);

    fetch('/game_results', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        console.log('response', response);
      });
  }

  createScoreboard() {
    this.pushResultInLocalStorage();

    const scores = JSON.parse(localStorage.finalGame);

    fetch('/game_results')
      .then((response) => {
        console.log('response statistics:', response.json());
      });

    let allStringsScoreboard = '';
    scores.forEach((item) => {
      allStringsScoreboard += `
      <div class='player'>
        <p>Имя: ${item.name} </p>
        <p>Убито монстров: ${item.result}</p>
      </div>
      `;
    });

    const scoreboardContainer = document.createElement('div');
    scoreboardContainer.classList.add('scoreboard');
    scoreboardContainer.innerHTML = `
      <div class='result'>
        <div>
        <h2>${this.player.name}</h2>
        <p>Убито монстров:  ${this.monsterKilled}</p>
        </div>
      </div>
      <div class='topScore'>${allStringsScoreboard}</div>
      <button class='restart'>Restart</button>
    `;

    document.body.appendChild(scoreboardContainer);
    document.querySelector('.restart').addEventListener('click', () => {
      scoreboardContainer.remove();
      this.restart();
    });
  }

  cancelAnimation() {
    cancelAnimationFrame(this.loop);
  }
}
