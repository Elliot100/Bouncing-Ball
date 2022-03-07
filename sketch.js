
//setup variables
var wx = window.innerWidth;
var wy = window.innerHeight;
const GRAVITY = 0.99;

function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 5 +
    ")"
  );
}

function setup() {
  createCanvas(wx,wy);
}

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.x = Math.random() * (wx - this.radius * 2) + this.radius;
  this.y = Math.random() * (wy - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() / 5;

  this.update = function() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.radius * 2);
  }
}

var bal = [];
for (var i=0; i<30; i++) {
  bal.push(new Ball());
}


function draw() {
  if (wx != window.innerWidth || wy != innerHeight) {
    wx = window.innerWidth;
    wy = window.innerHeight;
    resizeCanvas(wx, wy)
    // canvas.width = wx;
    // canvas.height = wy;
  }
  background(56,220, 250);
  for (var i = 0; i < bal.length; i++) {
    bal[i].update();
    bal[i].x += bal[i].dx;
    bal[i].y += bal[i].dy;
    
    //bounce
    if (bal[i].y + bal[i].radius > wy) {
      bal[i].dy = -bal[i].dy * GRAVITY;
    } else {
      bal[i].dy += bal[i].vel;
    }
    if (bal[i].x + bal[i].radius > wx || bal[i].x - bal[i].radius < 0) {
      bal[i].dx *= -1;
    }
  }

  //interaction
  if(mouseIsPressed) {
    ballx = mouseX;
    bally = mouseY;
  }
}

setInterval(function() {
  bal.push(new Ball());
  bal.splice(0,1);
}, 500);

