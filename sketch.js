
//setup variables
ballx = 200;
bally = 50;
balldx = 0;
balldy = 1;

function setup() {
  createCanvas(400,300);
}

function draw() {
  background(0, 200, 0);

  //move ball
  bally += balldy;

  //draw ball
  fill(0,0,200);
  circle(ballx, bally, 20);
}