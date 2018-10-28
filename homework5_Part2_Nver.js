 const canvas = document.getElementById('canvas');
 const context = canvas.getContext('2d');

 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;

 const rand = function(num) {
 return Math.floor(Math.random() * num) + 1;
 };

 const background = new Image()
 background.src = 'https://avatars.mds.yandex.net/get-pdb/401063/a95b0059-a029-4bf9-8f93-fd9b0f4b05d0/orig';
 const goodGuy = new Image()
 goodGuy.src = 'https://www.sideshowtoy.com/wp-content/uploads/2013/06/100022-product-silo.png'
 const shuriken = new Image ()
 shuriken.src = 'https://cdn.pixabay.com/photo/2014/03/24/17/06/ninja-star-295045_960_720.png'

 const arrayOfShuriken = []

 const startGame = function (count, canvasWidth, canvasHeight) {
 if (count === 0){
 return arrayOfShuriken
 }

 arrayOfShuriken[arrayOfShuriken.length] = {
 x: rand(canvas.width - 30),
 y: rand(canvas.height - 30),
 width: 30,
 height: 30,
 xDelta: 4,
 yDelta: 4,
 image: shuriken,
 draw: function () {
 context.drawImage(this.image, this.x, this.y, this.width, this.height)
 },
 update: function () {
      if(this.x >= canvas.width-this.width || this.x <= 0) {
        this.xDelta = -this.xDelta;
       } else if(this.y >= canvas.height-this.height || this.y <= 0) {
        this.yDelta = -this.yDelta;
       }
      this.x += this.xDelta;
      this.y += this.yDelta;
      if (this.x < gameData.hero.x + gameData.hero.width && this.x + this.width > gameData.hero.x && this.y < gameData.hero.y + gameData.hero.height && this.height + this.y > gameData.hero.y){
        alert("Game Over!");
        gameData.hero.x=5
        gameData.hero.y=canvas.height-500
        gameData.hero.xDelta=0
        gameData.hero.yDelta=0
      }
    }
  }
    startGame (count-1, canvasWidth, canvasHeight)
};

startGame(7,canvas.width,canvas.height)


const draw = function () {
  for (let a=0; a < arrayOfShuriken.length; a++) {
    arrayOfShuriken[a].draw();
  }
 } 
 const update = function () {
     for (let a=0; a<arrayOfShuriken.length; a++) {
    arrayOfShuriken[a].update();
  }
};
const gameData = {
hero: {
  x:5,
  y:canvas.height-500,
  width:200,
  height:500,
  xDelta:0,
  yDelta:0,
  image: goodGuy,
  dead: false,
  draw: function () {
context.drawImage(this.image, this.x, this.y, this.width, this.height)
},
  update: function () {

 this.x += this.xDelta;
 this.y += this.yDelta;
},
  badOnes: arrayOfShuriken
}
};

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
  
document.addEventListener('keydown', function(event) {
  if(event.keyCode === rightKey) {
      gameData.hero.xDelta = 10;
    } else if(event.keyCode === leftKey) {
      gameData.hero.xDelta = -10;
    } else if(event.keyCode === downKey) {
      gameData.hero.yDelta = 10;
    } else if (event.keyCode === upKey) {
      gameData.hero.yDelta = -10;
    }
    }, false);
document.addEventListener('keyup', function(event) {
  if(event.keyCode === rightKey || event.keyCode === leftKey) {
      gameData.hero.xDelta = 0;
    }
  if(event.keyCode === downKey || event.keyCode === upKey) {
      gameData.hero.yDelta = 0;
    }
}, false);
  

const loop = function () {
if(gameData.hero.dead === false){
context.drawImage(background, 0, 0,canvas.width,canvas.height)
gameData.hero.draw()
gameData.hero.update()  
draw()
update ()  
}
  requestAnimationFrame(loop)
};

loop();
