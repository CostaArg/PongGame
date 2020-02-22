let ballFollow;
let trampMove;
let ballX;
let ballY;
let ballR;
let timeout = null;
let mouseToBall;
let ballToTramp;
let trampX;
let trampY;

function setup() {
  createCanvas(400, 400);

  trampX = 200;
  trampY = 200;
  trampWidth = 100;
  trampHeight = 20;
  trampMove = false;
  tramp = new Trampoline(trampX, trampY, trampWidth, trampHeight);

  ballX = 100;
  ballY = 100;
  ballR = 20;
  ballFollow = false;
  ball = new Ball(ballX, ballY, ballR, tramp.trampX, tramp);
}

let ballDirectionX = 1;
let ballDirectionY = 1;
let ballSpeed = 2;
let slide = false;

function draw() {
  background(0);

  ball.show(slide);
  tramp.show();

  //Move checks
  if (ballFollow === true) {
    ball.move();
  }

  if (trampMove === true) {
    tramp.move();
  }
}

function mousePressed() {
  ball.clicked();
  tramp.clicked();
}

function mouseReleased() {
  ballFollow = false;
  trampMove = false;
  slide = true;
  //after 5 seconds => stop
  // if (timeout != null) {
  //   clearTimeout(timeout);
  // }
  //timeout = setTimeout(ball.stopSlide, 5000);
}

class Trampoline {
  constructor(trampX, trampY, trampWidth, trampHeight) {
    this.trampX = trampX;
    this.trampY = trampY;
    this.trampWidth = trampWidth;
    this.trampHeight = trampHeight;
  }

  show() {
    rectMode(CENTER);
    fill(255);
    rect(this.trampX, this.trampY, this.trampWidth, this.trampHeight);
  }

  clicked() {
    if (
      mouseX >= this.trampX - this.trampWidth / 2 &&
      mouseX <= this.trampX + this.trampWidth / 2 &&
      mouseY >= this.trampY - this.trampHeight / 2 &&
      mouseY <= this.trampY + this.trampHeight / 2
    ) {
      trampMove = true;
    }
  }

  move() {
    //drag boundry aristera deksia
    this.trampX = constrain(
      mouseX,
      0 + this.trampWidth / 2,
      width - this.trampWidth / 2
    );
    //drag boundry panw katw
    this.trampY = constrain(
      mouseY,
      0 + this.trampHeight / 2,
      height - this.trampHeight / 2
    );
  }
}

class Ball {
  constructor(ballX, ballY, ballR, tramp) {
    this.ballX = ballX;
    this.ballY = ballY;
    this.ballR = ballR;
    this.tramp = tramp;
  }

  clicked() {
    mouseToBall = dist(mouseX, mouseY, this.ballX, this.ballY);
    if (mouseToBall < this.ballR) {
      ballFollow = true;
    }
  }

  move() {
    //drag boundry aristera deksia
    this.ballX = constrain(mouseX, 0 + this.ballR, width - this.ballR);
    //drag boundry panw katw
    this.ballY = constrain(mouseY, 0 + this.ballR, height - this.ballR);
  }

  show(slide) {
    fill(255);
    ellipse(this.ballX, this.ballY, this.ballR * 2);

    if (slide) {
      //creating motion
      this.ballX = this.ballX + ballDirectionX * ballSpeed;
      this.ballY = this.ballY + ballDirectionY * ballSpeed;

      //slide boundry aristera deksia
      if (this.ballX > width - this.ballR || this.ballX < 0 + this.ballR) {
        ballDirectionX = ballDirectionX * -1;
      }
      //slide boundry panw katw
      if (this.ballY > height - this.ballR || this.ballY < 0 + this.ballR) {
        ballDirectionY = ballDirectionY * -1;
      }

      let bottom = tramp.trampY + tramp.trampHeight / 2;
      let left = tramp.trampX - tramp.trampWidth / 2;
      let right = tramp.trampX + tramp.trampWidth / 2;
      let top = tramp.trampY - tramp.trampHeight / 2;

      //trampoline collision
      if (
        this.ballX > left - this.ballR &&
        this.ballX < right + this.ballR &&
        this.ballY < bottom + this.ballR &&
        this.ballY > top - this.ballR
      ) {
        ballDirectionX = ballDirectionX;
        ballDirectionY = ballDirectionY * -1;
      }
    }
  }

  stopSlide() {
    slide = false;
  }
}
