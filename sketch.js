
//setup variables
ballx = 200;
bally = 50;
balldx = 1;
balldy = 0;
GRAVITY = 0.1;

function randomColor() {
  console.log("Hello World");
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

function setup() {
  createCanvas(400,300);
}

function Ball() {
  this.update = function() {
    fill(0,200,0);
    noStroke();
    circle(ballx, bally, 20);
  }
}

var bal = [];
bal.push(new Ball());

function draw() {
  background(56,220, 250);
  //move ball
  balldy += GRAVITY;
  bally += balldy;
  ballx += balldx;
  //bounce
  if(bally > 290) {
    balldy *= -1;
  }
  if(ballx > 390 || ballx < 10) {
    balldx *= -1;
  }

  //draw ball
 
  bal[0].update();
  // fill(0,200,0);
  // noStroke();
  // circle(ballx, bally, 20);

  //interaction
  if(mouseIsPressed) {
    ballx = mouseX;
    bally = mouseY;
  }
}

