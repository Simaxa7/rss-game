import spellsImg from './spellIcons';

export default class Spell {
  constructor() {
    this.isSpellSelected = false;
    this.selectedSpell = '';
    this.choiceSpell();
  }

  choiceSpell() {
    const spellWindowWrapper = document.createElement('div');
    spellWindowWrapper.classList.add('spellWrapper');
    spellWindowWrapper.innerHTML = `
        <div class = "spell">
          <div class = "spellList">
            <label for='health'>
              <input type='radio' name='spell' id='health' checked>
              <img src='${spellsImg.health}'>
            </label>
            <label for='hit'>
              <input type='radio' name='spell' id='hit'>
              <img src='${spellsImg.hit}'>
            </label>
          </div>
          <input class='submit' type = 'submit' value = 'OK'>
        </div>
    `;

    document.body.appendChild(spellWindowWrapper);

    document.querySelector('.submit').addEventListener('click', (e) => {
      e.preventDefault();

      const spells = document.querySelectorAll('.spellList input');
      for (let i = 0; i < spells.length; i++) {
        if (spells[i].checked) {
          this.selectedSpell = spells[i].id;
        }
      }
      this.isSpellSelected = true;
      this.hide();
    });
  }

  show() {
    document.body.querySelector('.spellWrapper').style.display = 'flex';
  }

  hide() {
    document.body.querySelector('.spellWrapper').style.display = 'none';
  }
}
