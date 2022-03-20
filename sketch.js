
//setup variables
var wx = window.innerWidth;
var wy = window.innerHeight;
const GRAVITY = 1;
const ACC = 1.5;
const colors = ["lime","cyan","red","yellow","fuchsia","orange"];
// const colors = ["0, 255, 0", "125, 254, 227", "255, 0, 0", "255, 240, 0", "255, 0, 255", "249, 105, 14"];



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

let button;
let clickCounter = 0;
function setup() {
  createCanvas(wx, wy);
  button = createButton("Let's go!");
  button.addClass("letsgo");
  button.position(700, 600);
  button.mousePressed(() =>
    mousepressed(mouseX, mouseY)
  //   function () {
  //   button.remove();
  // }
  );
}

function Ball() {
  this.color = colors[Math.floor(Math.random() * colors.length)];
  // this.radius = 20;
  this.radius = Math.random() * 20;
  this.x = Math.random() * (wx - this.radius * 2) + this.radius;
  this.y = Math.random() * (wy - this.radius);
  this.dy = Math.random() * 8;
  this.dx = Math.round((Math.random() - 0.5) * 20);
  this.vel = 0.1;
  // this.vel = Math.random() / 5;

  this.update = function() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.radius * 2);
  }

  this.intersects = function(other) {
    // console.log("this",this);
    // console.log("other", other);
    // var a = x1 - x2;
    // var b = y1 - y2;

    // var c = Math.sqrt(a * a + b * b);
    // var d = dist(this.x,this.y,other.x,other.y);
    var a = other.y - this.y;
    var b = other.x - this.x;
    var d = Math.sqrt(a*a + b*b);
    if (d < (this.radius + other.radius) ) {
      return true;
    } else {
      return false;
    }
  }
}

var bal = [];
// var newball = false;
// bal.push(new Ball());
// // console.log(bal[0]);
// for(var i = 1; i < 20 ; i++) {
//   // bal[i] = new Ball();
//   bal.push(new Ball());
//   // console.log(i," ",bal[i]);
//   for(var j = 0; j < i; j++) {
//     // console.log("i ",i,"j ",j);
//     while(bal[i].intersects(bal[j])) {
//       bal[i] = new Ball();
//       newball = true;
//     }
//     if(newball) {
//       j = -1;
//       newball = false;
//     }
//   }
// }

let trail = [];
for (var i=0; i<30; i++) {
  bal.push(new Ball());
  trail.push([]);
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
  if (clickCounter == 0) {
    button.remove();
    welcomeWindow.display = false;
    console.log(clickCounter);
    clickCounter += 1;
    
  }  
  if (clickCounter > 3) {
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
  clickCounter += 1;
}

function Clickanywhere() {
  this.color = 'lightgray';
  this.display = true;
  this.show = function() {
    if (this.display == true) {
    fill(50);
    rect(wx / 6, wy / 4, 1000, 500);
    fill(this.color);
    textSize(32);
    text("Welcome to Spacey Shooting Stars!", 450, 300);
    // textAlign(CENTER);
    textStyle(BOLD);
    textSize(20);
    let s = 'Bright color balls that shoots across the screen leaving behind a beautiful tail like shooting stars';
    text(s, 300, 350, 1000, 500);
    s = 'The stars bounces off all 4 walls AND your mouse position';
    text(s, 300, 410);
    s = 'Click once to make the stars speed up, keep clicking for a firework EXPLOSION';
    text(s, 300, 460);
    fill('yellow');
    s = 'Warning : Might contain intense light flashing effect';
    text(s, 300, 510);
    }
  }
}

var welcomeWindow = new Clickanywhere();
let a = 0;


function draw() {
  // background(56,220, 250);
  background(0);

  for (var i = 0; i < bal.length; i++) {
    bal[i].update();
    // trail[i].push([5,6]);
    // console.log(bal[i].x, " ", bal[i].y);
     trail[i].push([bal[i].x, bal[i].y]);
    //  console.log(trail[i]);
     for (let j = 0; j < trail[i].length; j++) {
       noStroke();
       ballColor = color(bal[i].color);
       ballColor.setAlpha(128 + 128 * sin(millis() / 1000));
       fill(ballColor);

       // squareColor = color(100, 50, 100);
       // squareColor.setAlpha(128 + 128 * sin(millis() / 1000));
       //  fill(255, 20, 189, a);
       //  rect(trail[i][0] - 50, trail[i][1], i + 80, i + 2);
       ellipse(trail[i][j][0], trail[i][j][1], j);
       if (a > 150) {
         trail[i].shift();
         a = 0;
       }
       a += 8;
     }

    // for (var j = i+1; j < bal.length; j++) {
    //   if (bal[i].intersects(bal[j]) ) {
    //     bal[i].dx *= -1;
    //     bal[i].dy *= -1;
    //     bal[j].dx *= -1;
    //     bal[j].dy *= -1;
    //   }
    // }
    bal[i].x += bal[i].dx;
    bal[i].y += bal[i].dy;

    //bounce
    if (bal[i].y + bal[i].radius >= wy || bal[i].y - bal[i].radius <= 0) {
      // bal[i].dy = -bal[i].dy * GRAVITY;
      bal[i].dy *= -1;
    }
    // else {
    //   bal[i].dy += bal[i].vel;
    // }
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
  //   //  rect(trail[i][0] - 50, trail[i][1], i + 80, i + 2);
  //    ellipse(trail[i][0], trail[i][1], i);
  //    if (a > 255) {
  //      trail.shift();
  //      a = 0;
  //    }
  //    a += 8;
  //  }

  mousehovered(mouseX, mouseY);

  welcomeWindow.show();
}

function windowResized() {
    wx = window.innerWidth;
    wy = window.innerHeight;
  resizeCanvas(windowWidth, windowHeight);
}

