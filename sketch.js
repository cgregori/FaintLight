let walls = [];
let particles = [];

// Button stuff
let boundaryButton;
let refreshLightButton;
let lightButton;
let eraseLightButton;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Make i random boundaries.
  for (let i = 0; i < 8; i++) {
    let x1 = random(noise(width), width);
    let x2 = random(noise(width), width);
    let y1 = random(noise(height), height);
    let y2 = random(noise(height), height);
    walls.push(new Boundary(x1, y1, x2, y2));
  }
  
  // 4 edges.
  walls.push(new Boundary(0, 0, 0, height));
  walls.push(new Boundary(0, height, width, height));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(0, 0, width, 0));
  
  particles.push(new Particle(random(width), random(height)));

  lightButton = createButton('Add other Light');
  lightButton.position(20, 4 * (height / 5));
  lightButton.mousePressed(light);
  refreshLightButton = createButton('Refresh Light');
  refreshLightButton.position(width/3, 4 * (height / 5));
  refreshLightButton.mousePressed(refreshLight);
  boundaryButton = createButton('Remake Boundaries');
  boundaryButton.position(2 * (width / 3), 4 * (height / 5));
  boundaryButton.mousePressed(addBoundary);
  eraseLightButton = createButton('Darken the Light');
  eraseLightButton.position(width/ 3, 6 * (height / 7));
  eraseLightButton.mousePressed(darkenLight);

}

function draw() {
  background(0);
  walls.forEach(wall => {
    wall.show();
  })
  
  let everyOther = true;
  particles.forEach(particle => {
    if(everyOther) {
      particle.update(mouseX, mouseY, walls);
    } else {
      let mirrorX = width - mouseX;
      let mirrorY = height - mouseY;
      particle.update(mirrorX, mirrorY, walls);
    }
    particle.show();
    everyOther = !everyOther;
  });  
}

function light() {
  particles.push(new Particle(random(width), random(height)));
}

function refreshLight() {
  particles.forEach(particle => {
    particles.push(new Particle(particle.pos.x, particle.pos.y));
    particles.shift();
  })
}

function darkenLight() {
  particles.length = 0;
}

function addBoundary() {
  walls.length = 0;
  
  // Make i random boundaries.
  let i = 0;
  while(i < 8) {
    let x1 = random(noise(width), width);
    let x2 = random(noise(width), width);
    let y1 = random(noise(height), height);
    let y2 = random(noise(height), height);
    walls.push(new Boundary(x1, y1, x2, y2));
    i++;
  }
  
  // 4 edges.
  walls.push(new Boundary(0, 0, 0, height));
  walls.push(new Boundary(0, height, width, height));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(0, 0, width, 0));
}