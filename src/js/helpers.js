const magicBook = new Image();
magicBook.src = './src/img/charm_img_in_modal/magicBook.png';

const background = new Image();
background.src = './src/img/backGround/city_2.png';

const smokeBlue = new Image();
smokeBlue.src = './src/img/charm_img_in_modal/smokeBlue5.png';

const fireBallToLeft = new Image();
fireBallToLeft.src = './src/img/fireBallToLeft.png';

const fireBallToRight = new Image();
fireBallToRight.src = './src/img/fire-babax.png';

const sound = {
  lightingSound: new Audio('./src/sound/lighting.mp3'),
  healSound: new Audio('./src/sound/heal.mp3'),
};

export {
  magicBook,
  background,
  smokeBlue,
  fireBallToLeft,
  fireBallToRight,
  sound,
};
