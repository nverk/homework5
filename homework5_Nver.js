const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};

const colorArray = ["#2F4F4F", "#008080", "#2E8B57", "#3CB371", "#90EE90"];
let arrBoxes = [];


const createBoxes = function (count, canvasWidth, canvasHeight) {
        if (count === 0) {
          return arrBoxes;
        }

        const boxes = {
          x: rand(canvasWidth-20),
          y: rand(canvasHeight-20),
          width: 20,
          height: 20,
          xDelta: 0.08,
          yDelta: 0.08,
          color: colorArray[rand(5)-1],
          draw: function() {
           context.fillStyle = boxes.color;
           context.fillRect(boxes.x, boxes.y, boxes.width, boxes.height)
         },
           update: function() {
        const helper = function(arr, index) {
          if(index === arrBoxes.length) {
            return;
          }
          arrBoxes[index].x += arrBoxes[index].xDelta;
          arrBoxes[index].y += arrBoxes[index].yDelta;
          if(arrBoxes[index].x >= canvas.width-arrBoxes[index].width || arrBoxes[index].x <= 0) {
            arrBoxes[index].xDelta = -arrBoxes[index].xDelta;
            arrBoxes[index].color = colorArray[rand(colorArray.length)];
          }
          if(arrBoxes[index].y >= canvas.height-arrBoxes[index].height || arrBoxes[index].y <= 0) {
            arrBoxes[index].yDelta = -arrBoxes[index].yDelta;
            arrBoxes[index].color = colorArray[rand(colorArray.length)];
          }
          helper(arr, index+1);
        };
        helper(arrBoxes, 0);

        }


        };

        arrBoxes[arrBoxes.length] = boxes;
        createBoxes(count-1, canvasWidth, canvasHeight);
  };

createBoxes(10, canvas.width, canvas.height);

const draw = function(){ 
    context.clearRect (0, 0, canvas.width, canvas.height)
    for (let i = 0; i < arrBoxes.length; i++) {
        arrBoxes[i].draw();
  }
 
};
 const update = function(){
    for (let i = 0; i < arrBoxes.length; i++) {
    arrBoxes[i].update();
    }

};

const loop = function() {
  draw();
  update();

  requestAnimationFrame(loop);
}

loop();