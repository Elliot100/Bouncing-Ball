
//setup variables
var wx = window.innerWidth;
var wy = window.innerHeight;
const GRAVITY = 0.99;
const ACC = 1.2;
const colors = ["lime","cyan","pink","yellow","fuchsia","orange"];


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
  this.color = colors[Math.floor(Math.random() * colors.length)];
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

function mousepressed(x, y) {
  for (var i = 0; i < 30; i++) {
    if (bal[i].y < y) {
      bal[i].dy = -abs(bal[i].dy) * ACC;
    } else { 
      bal[i].dy = abs(bal[i].dy) * ACC;
    }

    if (bal[i].x < x) {
      bal[i].dx = -abs(bal[i].dx) * ACC;
    } else {
      bal[i].dx = abs(bal[i].dx) * ACC;
    }
  }
}

function Clickanywhere() {
  this.color = 'gray';
  this.show = function() {
    fill(this.color);
    textSize(32);
    text("click around!", wx / 2, wy / 2);
    textAlign(CENTER);
    textStyle(BOLD);
  }
}

var ca = new Clickanywhere();
let trail = [];
let a = 0;

function draw() {
  if (wx != window.innerWidth || wy != innerHeight) {
    wx = window.innerWidth;
    wy = window.innerHeight;
    resizeCanvas(wx, wy)
  }
  background(56,220, 250);
  ca.show();

  for (var i = 0; i < bal.length; i++) {
    bal[i].update();
    bal[i].x += bal[i].dx;
    bal[i].y += bal[i].dy;
    
    //bounce
    if (bal[i].y + bal[i].radius >= wy || bal[i].y - bal[i].radius <= 0) {
      bal[i].dy = -bal[i].dy * GRAVITY;
    } else {
      bal[i].dy += bal[i].vel;
    }
    if (bal[i].x + bal[i].radius >= wx || bal[i].x - bal[i].radius <= 0) {
      bal[i].dx *= -1;
    }
  }

  //interaction
  if(mouseIsPressed) {
    mousepressed(mouseX, mouseY);
  }
   trail.push([mouseX, mouseY]);
   for (let i = 0; i < trail.length; i++) {
     noStroke();
     fill(255, 20, 189, a);
     ellipse(trail[i][0], trail[i][1], i);
     if (a > 255) {
       trail.shift();
       a = 0;
     }
     a += 8;
   }
}

