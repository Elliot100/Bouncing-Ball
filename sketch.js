
//setup variables
ballx = 200;
bally = 50;
balldx = 0;
balldy = 1;
GRAVITY = 0.1;

function setup() {
  createCanvas(400,300);
}

function draw() {
  background(0, 200, 0);

  //move ball
  balldy += GRAVITY;
  bally += balldy;

  //bounce
  if(bally>290)
    balldy *= -1;

  //draw ball
  fill(0,0,200);
  circle(ballx, bally, 20);
}