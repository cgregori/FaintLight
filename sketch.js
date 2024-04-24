let walls = [];
let particles = [];
//vvv Perlin noise stuff. vvv
let xOff = 100;
let yOff = 2000;

// Button stuff
let boundaryButton;
let lightButton;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Make i random boundaries.
  for (let i = 0; i < 8; i++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls.push(new Boundary(x1, y1, x2, y2));
  }
  walls.push(new Boundary(0, 0, 0, height));
  walls.push(new Boundary(0, height, width, height));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(0, 0, width, 0));
  particles.push(new Particle(random(width), random(height)));

  lightButton = createButton('Add a Light A');
  lightButton.position(20, 4 * (height / 5));
  lightButton.mousePressed(light);
  boundaryButton = createButton('Add a Boundary');
  boundaryButton.position(2 * (width / 3), 4 * (height / 5));
  boundaryButton.mousePressed(addBoundary);

}

function draw() {
  background(0);
  walls.forEach(wall => {
    wall.show();
  })
  particles.forEach(particle => {
    particle.update(noise(xOff), noise(yOff), walls);
    particle.show();
  });

  // Perlin noise for random movement.
  xOff += 0.01;
  yOff += 0.01;
}

function light() {
  particles.push(new Particle(random(width), random(height)));
}

function addBoundary() {
  let x1 = random(width);
  let x2 = random(width);
  let y1 = random(height);
  let y2 = random(height);
  walls.push(new Boundary(x1, y1, x2, y2));
}