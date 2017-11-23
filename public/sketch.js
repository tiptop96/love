var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;

function preload() {
  myFont = loadFont('Fontfabric - Nexa Rust Script B Shadow 01.otf');
}

function setup() {
  createCanvas(1000, 600);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 500; i++) {
    particles[i] = new Particle();
  }
  background(51, 255);

  push()
  fill(200)
  textFont(myFont)
  textSize(150)
  text("A", 170,300)
  text("G", 670,300)
  pop()
}

function draw() {

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  //Draw ellipse
  noStroke()
  fill(51,255) 

  beginShape();
  vertex(340,250)
  vertex(360, 250);
  bezierVertex(360, 330, 480, 360, 500, 440);
  vertex(500, 460);
  vertex(340, 460);
  endShape(CLOSE);

  beginShape();
  vertex(660, 250)
  vertex(640, 250);
  bezierVertex(640, 330, 520, 360, 500, 440);
  vertex(500, 460);
  vertex(660, 460)
  endShape(CLOSE);

  beginShape();
  vertex(660, 250)
  vertex(660, 100)
  vertex(500,100)
  vertex(500, 240)
  bezierVertex(500, 140, 640, 140, 640, 250);
  endShape(CLOSE)


  beginShape();
  vertex(340, 250)
  vertex(340, 100)
  vertex(500,100)
  vertex(500, 240)
  bezierVertex(500, 140, 360, 140, 360, 250);
  endShape(CLOSE)

  //fr.html(floor(frameRate()));
}