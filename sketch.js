
//setup variables
ballx = 200;
bally = 50;
balldx = 1;
balldy = 0;
GRAVITY = 0.1;

function setup() {
  createCanvas(400,300);
}

function draw() {
  background(0, 200, 0);

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
  fill(0,0,200);
  circle(ballx, bally, 20);

  //interaction
  if(mouseIsPressed) {
    ballx = mouseX;
    bally = mouseY;
  }
}