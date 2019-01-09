import cartmanBodyParts from './cartmanBodyParts';
import kennyBodyParts from './kennyBodyParts';
import cartmanName from './cartmanName';

import {
  fireBallToLeft,
  fireBallToRight,
  sound,
  smokeBlue,
} from '../helpers';
import { arrRandName } from '../utils/utils';

export default class Personage {
  constructor(options) {
    this.context = options.context;
    this.x = options.x;
    this.y = options.y;
    this.hp = 100;
    this.name = options.name;
    this.role = options.role;
    this.choiceBody();
    this.body;
    this.head;
    this.state = 'idle';
    this.breathDir = 100;
    this.breathInc = 0.08;
    this.breathAmt = 5;
    this.breathMax = 2;
    this.generateName();

    this.FireDir = 0;
    this.FireInc = 20.08;
    this.FireAmt = 100;
    this.FireMax = 0;
  }


  generateName() {
    if (this.role === 'monster') {
      const printFirstName = arrRandName(cartmanName.firstName);
      const printMiddleName = arrRandName(cartmanName.middleName);
      const printLastName = arrRandName(cartmanName.lastName);
      const printFullname = `${printFirstName} ${printMiddleName} ${printLastName}`;
      this.name = printFullname.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
    }
  }

  generateHealth(mk) {
    this.hp = 100 + mk * 10;
  }

  choiceBody() {
    if (this.role === 'player') {
      this.generateBody(kennyBodyParts);
    } else if (this.role === 'monster') {
      this.generateBody(cartmanBodyParts);
    }
  }

  generateBody(bodyParts) {
    const body = Math.floor(Math.random() * bodyParts.body.length);
    const head = Math.floor(Math.random() * bodyParts.head.length);
    this.body = new Image();
    this.body.src = bodyParts.body[body];
    this.head = new Image();
    this.head.src = bodyParts.head[head];
  }

  animationHead() {
    if (this.breathDir === 1) {
      this.breathAmt -= this.breathInc;
      if (this.breathAmt < -this.breathMax) {
        this.breathDir = -1;
      }
    } else {
      this.breathAmt += this.breathInc;
      if (this.breathAmt > this.breathMax) {
        this.breathDir = 1;
      }
    }
  }

  animationАireBall() {
    if (this.role === 'monster') {
      if (this.FireAmt > 10 && this.FireAmt < 600) {
        this.context.drawImage(fireBallToLeft, 800 - this.FireAmt, 280, 250, 200);
        this.FireAmt += this.FireInc;
      }
    }
    if (this.role === 'player') {
      if (this.FireAmt < 630 && this.FireAmt > 10) {
        this.context.drawImage(fireBallToRight, 150 + this.FireAmt, 280, 250, 200);
        this.FireAmt += this.FireInc;
      }
    }
  }

  animationTreatment() {
    this.context.drawImage(smokeBlue, 145, 350, 250, 200);
  }

  renderName() {
    this.context.fillStyle = 'green';
    this.context.fillText(this.name, this.x + 70, 650);
  }

  renderHP() {
    this.context.font = '30px arial';
    this.context.fillStyle = 'red';
    this.context.fillText(`${this.hp} HP`, this.x + 70, 610);
  }

  render() {
    this.animationHead();
    this.renderName();
    this.renderHP();
    this.context.drawImage(this.body, this.x + 0, this.y + 120, 150, 150);
    this.context.drawImage(this.head, this.x, this.y - this.breathAmt, 150, 150);
    if (this.state === 'attacking') {
      this.animationАireBall();
    } else if (this.state === 'healing') {
      this.animationTreatment();
    } else {
      this.FireAmt = 100;
    }
  }

  attack(target) {
    this.state = 'attacking';
    target.hp -= Math.floor(Math.random() * 15 + 10);
    sound.lightingSound.play();
    setTimeout(() => {
      this.state = 'idle';
    }, 800);
  }

  heal() {
    this.state = 'healing';
    this.hp += Math.floor(Math.random() * 15 + 10);
    sound.healSound.play();
    setTimeout(() => {
      this.state = 'idle';
    }, 400);
  }
}
