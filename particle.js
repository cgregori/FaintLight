class Particle {
  constructor(x, y, bounce) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.col = color(random(255), random(255), random(255));
    this.rays = [];
    for (let a = 0; a < 360; a += 1.5) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
    if(bounce) {
      this.bounce = true;
    }
  }

  update(x, y, walls) {
    this.acc = createVector(x, y);
    this.acc.sub(this.pos);
    this.acc.setMag(1);
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    if(this.bounce) {
      this.bouncyLookAt(walls);
    } else {
      this.lookAt(walls);
    }
  }

  show() {
    fill(this.col, 105);
    ellipse(this.pos.x, this.pos.y, 8);
  }

  lookAt(walls) {
    this.rays.forEach(ray => {
      let closestPt = null;
      let min = Infinity;
      for(let wall of walls) {
        let pt = ray.cast(wall);
        if(pt) {
          let distance = p5.Vector.dist(this.pos, pt);
          // Check for closest wall
          if(distance < min) {
            min = distance;
            closestPt = pt;
          }
        } 
      }
      if(closestPt) {
        stroke(this.col, 105);
        line(this.pos.x, this.pos.y, closestPt.x, closestPt.y);
      }
    });
  }
}