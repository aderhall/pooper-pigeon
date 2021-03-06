function setup() {
  createCanvas(1420, 760);
  cloud = loadImage('https://aderhall.github.io/pooper-pigeon/assets/clouds-6.png');
  clouds = [];
  for (var c = 0; c < 50; c ++) {
    clouds.push([random(-2840, 2840), random(-2000, 500)]);
  }
}

flames = [];


function Bird(x, y) {
  this.x = x;
  this.y = y;
  this.velocity = [0, 0];
  this.direction = 0;
  this.right = true;
  this.orientation = 0;
  this.flame = false;
  this.flameCycle = 0;
}
Bird.prototype.display = function() {
  this.velocity[1] += 0.3;
  this.velocity[1] += sin(radians(this.orientation))*Math.abs(this.velocity[0])/13;
  //this.velocity[0] += cos(radians(this.orientation));
  this.x += this.velocity[0];
  this.y += this.velocity[1];
  this.velocity[0] *= 0.94;
  this.velocity[1] *= 0.99;
  /*if (this.x < 50) {
    this.x = 50;
    this.velocity[0] *= -1;
  }
  if (this.x > 1370) {
    this.x = 1370;
    this.velocity[0] *= -1;
  }
  if (this.y < 50) {
    this.y = 50;
    this.velocity[1] *= -1;
  }
  */if (this.y > 700) {
    this.y = 700;
    this.velocity[1] *= -0.1;
  }
  if (this.right) {
    xdir = 10;
  } else {
    xdir = 170;
  }
  push();
  translate(710, 380);
  rotate(radians(this.orientation));
  fill(255);
  triangle(0, 0, 0, 20, 40, 10);
  strokeWeight(2);
  line(40, 10, 0, 10);
  fill(255, 0, 0);
  noStroke();
  if (this.flame) {
    this.flameCycle +=3;
    this.flameCycle %= 10;
    ellipse(-10-this.flameCycle, 10, 10+this.flameCycle, 10);
  }
  pop();
}

pigeon = new Bird(100, 100);



keysDown = []
keyCodesDown = []

function keyPressed() {
  keysDown.push(key);
  keyCodesDown.push(keyCode);
}
function keyReleased() {
  for (var k = 0; k < keysDown.length; k ++) {
    if (keysDown[k] == key) {
      keysDown.splice(k, 1);
    }
  }
  for (var k = 0; k < keyCodesDown.length; k ++) {
    if (keyCodesDown[k] == keyCode) {
      keyCodesDown.splice(k, 1);
    }
  }
}
function keyDown(k) {
  if (keysDown.indexOf(k) !== -1) {
    return true;
  } else {
    return false;
  }
}
function codeDown(code) {
  if (keyCodesDown.indexOf(code) !== -1) {
    return true;
  } else {
    return false;
  }
}

function draw() {
  background(100 + pigeon.y*255/3200, 150 + pigeon.y*255/3200, 220 + pigeon.y*255/3200);
  pigeon.display();
  text(pigeon.y, 100, 100);
  del = [];
  for (var c = 0; c < flames.length; c++) {
    push();
    translate(-pigeon.x, -pigeon.y);
    fill(255, 255, 255, flames[c][2]);
    noStroke();
    ellipse(flames[c][0], flames[c][1], 30, 60);
    flames[c][2] -= 3;
    if (flames[c][2] < 0) {
      del.push(c);
    }
    pop();
  }
  for (var c = 0; c < del.length; c++) {
    flames.splice(c, 1);
  }

  for (var c = 0; c < clouds.length; c++) {
    push();
    offset = clouds[c][0]-pigeon.x;
    while (offset < -1420) {
      offset += 2840;
    }
    while (offset > 1420) {
      offset -= 2840;
    }
    translate(offset, -pigeon.y);
    image(cloud, 0, clouds[c][1])
    pop();
  }

  fill(100);
  push();
  translate(0, -pigeon.y);
  rect(-3000, 1100, 6000, 500);
  pop();
  if (codeDown(38)) {
    pigeon.direction = 1;
  }
  if (codeDown(40)) {
    pigeon.direction = -1;
  }
  if (codeDown(37)) {
    pigeon.orientation --;
  }
  if (codeDown(39)) {
    pigeon.orientation ++;
  }
  if (codeDown(32)) {
    pigeon.velocity[0] += cos(radians(pigeon.orientation));
    pigeon.velocity[1] += sin(radians(pigeon.orientation));
    flames.push([pigeon.x+720, pigeon.y+380, 100]);
    pigeon.flame = true;
  } else {
    pigeon.flame = false;
  }
}
