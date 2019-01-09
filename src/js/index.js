import '../css/game_style.css';
import Game from './game';

const inputPlayerName = document.querySelector('.inputPlayerName');
const name = document.getElementById('name');
const submit = document.getElementById('submitName');

submit.addEventListener('click', (e) => {
  const game = new Game();
  e.preventDefault();

  const optionsPlayer = {
    context: game.context,
    x: 200,
    y: 300,
    name: name.value || 'Lord Kenny',
    role: 'player',
  };

  const optionsMonster = {
    context: game.context,
    x: 800,
    y: 300,
    name: 'random',
    role: 'monster',
  };

  game.initNps(optionsPlayer, optionsMonster);
  game.gameLoop();
  inputPlayerName.remove();

  window.addEventListener('keyup', game.keyControl.bind(game), false);
});
