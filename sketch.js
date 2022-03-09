
//setup variables
var wx = window.innerWidth;
var wy = window.innerHeight;
const GRAVITY = 1;
const ACC = 1.5;
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
  this.radius = 20;
  // this.radius = Math.random() * 20 + 14;
  this.x = Math.random() * (wx - this.radius * 2) + this.radius;
  this.y = Math.random() * (wy - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = 0.1;
  // this.vel = Math.random() / 5;

  this.update = function() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.radius * 2);
  }

  this.intersects = function(other) {
    var d = dist(this.x,this.y,other.x,other.y);
    if (d < (this.radius + other.radius) ) {
      return true;
    } else {
      return false;
    }
  }
}

var bal = [];
for (var i=0; i<30; i++) {
  bal.push(new Ball());
}

function mousehovered(x, y) {
     noStroke();
     fill(255, 20, 189);
     rect(x - 50, y-10, 100, 20);
  for (var i = 0; i < bal.length; i++) {
    if (bal[i].y < y && bal[i].y > y - 30 && bal[i].x < x + 50 && bal[i].x > x - 50) {
      bal[i].dy = -abs(bal[i].dy) * GRAVITY;
    } else if (bal[i].y >= y && bal[i].y < y + 30 && bal[i].x < x + 50 && bal[i].x > x - 50) {
      bal[i].dy = abs(bal[i].dy) * GRAVITY;
    }

    // if (bal[i].x < x && bal[i].x > x - 15) {
    //   bal[i].dx = -abs(bal[i].dx) * GRAVITY;
    // } else if (bal[i].x >= x && bal[i].x < x + 15) {
    //   bal[i].dx = abs(bal[i].dx) * GRAVITY;
    // }
  }
}

function mousepressed(x, y) {
  for (var i = 0; i < bal.length; i++) {
    if (bal[i].y <= y && bal[i].y >= 20) {
      bal[i].dy = -abs(bal[i].dy) * ACC;
    } else if (bal[i].y > y && bal[i].y <= wy) {
      bal[i].dy = abs(bal[i].dy) * ACC;
    }

    if (bal[i].x <= x && bal[i].x >= 20) {
      bal[i].dx = -abs(bal[i].dx) * ACC;
    } else if (bal[i].x > x && bal[i].x <= wx) {
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
  background(56,220, 250);
  ca.show();

  for (var i = 0; i < bal.length; i++) {
    bal[i].update();
    for (var j = i+1; j < bal.length; j++) {
      if (bal[i].intersects(bal[j]) ) {
        bal[i].dx *= -1;
        bal[i].dy *= -1;
        bal[j].dx *= -1;
        bal[j].dy *= -1;
      }
    }
    bal[i].x += bal[i].dx;
    bal[i].y += bal[i].dy;
    
    //bounce
    if (bal[i].y + bal[i].radius >= wy ) {
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
  //  trail.push([mouseX, mouseY]);
  //  for (let i = 0; i < trail.length; i++) {
  //    noStroke();
  //    fill(255, 20, 189, a);
  //    rect(trail[i][0] - 50, trail[i][1], i + 80, i + 2);
  //   //  ellipse(trail[i][0], trail[i][1], i);
  //    if (a > 255) {
  //      trail.shift();
  //      a = 0;
  //    }
  //    a += 8;
  //  }

   mousehovered(mouseX, mouseY);
}

function windowResized() {
    wx = window.innerWidth;
    wy = window.innerHeight;
  resizeCanvas(windowWidth, windowHeight);
}