
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
let bounceCounter = 0;
function setup() {
  createCanvas(wx, wy);
  button = createButton("Let's go!");
  button.addClass("letsgo");
  button.position(700, 630);
  button.mousePressed(mousepressed);
}

function Star() {
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

var star = [];
// var newball = false;
// star.push(new Star());
// // console.log(star[0]);
// for(var i = 1; i < 20 ; i++) {
//   // star[i] = new Star();
//   star.push(new Star());
//   // console.log(i," ",star[i]);
//   for(var j = 0; j < i; j++) {
//     // console.log("i ",i,"j ",j);
//     while(star[i].intersects(star[j])) {
//       star[i] = new Star();
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
  star.push(new Star());
  trail.push([]);
}

function mousehovered(x, y) {
     noStroke();
     fill(255, 20, 189);
     rect(x - 50, (3 * wy) / 4, 100, 20);
    //  rect(x - 50, y-10, 100, 20);
    for (var i = 0; i < star.length; i++) {
    if (star[i].y < (3 * wy) / 4 && star[i].y > (3 * wy) / 4 - 30 && star[i].x < x + 50 && star[i].x > x - 50) {
      star[i].dy = -abs(star[i].dy) * GRAVITY;
      bounceCounter += 1;
    } else if (star[i].y >= (3 * wy) / 4 && star[i].y < (3 * wy) / 4 + 30 && star[i].x < x + 50 && star[i].x > x - 50) {
      star[i].dy = abs(star[i].dy) * GRAVITY;
    }

    // if (star[i].x < x && star[i].x > x - 15) {
    //   star[i].dx = -abs(star[i].dx) * GRAVITY;
    // } else if (star[i].x >= x && star[i].x < x + 15) {
    //   star[i].dx = abs(star[i].dx) * GRAVITY;
    // }
  }
}

function resetStars() {
  for (var i = 0; i < 30; i++) {
    star[i] = new Star();
    trail[i].push([]);
  }
  bounceCounter = 0;
}

function ballBounceCounter() {
  this.display = false;
  this.show = function() {
    if (this.display) {
      fill("#27ae60");
      textSize(32);
      text(bounceCounter, 1150, 80);
      textStyle(BOLD);
    }
  }
}
let counter = new ballBounceCounter();

function mousepressed() {
    button.remove();
    welcomeWindow.display = false;
    bounceCounter = 0;
    // fill('#27ae60');
    // fill('white');
    // rect(wx / 6, wy / 4, 1000, 500);
    // textSize(32);
    // text(bounceCounter, 1250, 50);
    // textStyle(BOLD);

    counter.display = true;
    counter.show();

    let speedupButton = createButton("Speed up");
    speedupButton.addClass("letsgo");
    speedupButton.position(1250, 50);
    speedupButton.mousePressed(() => speedUp(mouseX, mouseY));

    let resetButton = createButton("Reset");
    resetButton.addClass("letsgo");
    resetButton.position(1400, 50);
    resetButton.mousePressed(resetStars);
}

function speedUp(x, y) {
  for (var i = 0; i < star.length; i++) {
    if (star[i].y <= y && star[i].y >= 20) {
      star[i].dy = -abs(star[i].dy) * ACC;
    } else if (star[i].y > y && star[i].y <= wy) {
      star[i].dy = abs(star[i].dy) * ACC;
    }

    if (star[i].x <= x && star[i].x >= 20) {
      star[i].dx = -abs(star[i].dx) * ACC;
    } else if (star[i].x > x && star[i].x <= wx) {
      star[i].dx = abs(star[i].dx) * ACC;
    }
  }
}

function Welcome() {
  this.color = 'lightgray';
  this.display = true;
  this.show = function() {
    if (this.display) {
    // fill(50);
    let newColor = color('#202020');
    newColor.setAlpha(200);
    fill(newColor);
    rect(wx / 6, wy / 4, 1000, 500);
    fill(this.color);
    textSize(32);
    text("Welcome to Spacey Shooting Stars!", 450, 300);
    // textAlign(CENTER);
    textStyle(BOLD);
    textSize(20);
    let s =
      "A relaxing game where brightly colored balls shoot across the screen, leaving behind beautiful tails, like shooting stars.";
    text(s, 300, 350, 950, 500);
    s =
      "The stars bounce off all four walls and off the cursor bar. The counter on the top-right keeps track of the number of balls that have bounced off the top of the cursor bar.";
    text(s, 300, 420, 950, 500);
    s = 'Click "Speed Up" to make the stars speed up. Keep clicking for a firework of EXPLOSION!';
    text(s, 300, 490, 950, 500);
    fill('yellow');
    s = "Warning: Upon speeding up the animation, application may contain intense light flashing effects.";
    text(s, 300, 540, 950, 500);
    }
  }
}

var welcomeWindow = new Welcome();
let a = 0;

function drawStars() {
  for (var i = 0; i < star.length; i++) {
    star[i].update();
    // trail[i].push([5,6]);
    // console.log(star[i].x, " ", star[i].y);
    trail[i].push([star[i].x, star[i].y]);
    //  console.log(trail[i]);
    for (let j = 0; j < trail[i].length; j++) {
      noStroke();
      ballColor = color(star[i].color);
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

    // for (var j = i+1; j < star.length; j++) {
    //   if (star[i].intersects(star[j]) ) {
    //     star[i].dx *= -1;
    //     star[i].dy *= -1;
    //     star[j].dx *= -1;
    //     star[j].dy *= -1;
    //   }
    // }
    star[i].x += star[i].dx;
    star[i].y += star[i].dy;

    //bounce
    if (star[i].y + star[i].radius >= wy || star[i].y - star[i].radius <= 0) {
      // star[i].dy = -star[i].dy * GRAVITY;
      star[i].dy *= -1;
    }
    // else {
    //   star[i].dy += star[i].vel;
    // }
    if (star[i].x + star[i].radius >= wx || star[i].x - star[i].radius <= 0) {
      star[i].dx *= -1;
    }
  }
}


function draw() {
  // background(56,220, 250);
  background(0);

  drawStars();

  //interaction
  // if(mouseIsPressed) {
  //   mousepressed(mouseX, mouseY);
  // }
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
  counter.show();
}

function windowResized() {
    wx = window.innerWidth;
    wy = window.innerHeight;
  resizeCanvas(windowWidth, windowHeight);
}

