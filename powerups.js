function Powerup(pos, r, size) {
  if (pos == null) {
    pos = createVector(random(width), random(height));
  }

  r = r != null ? r * 0.5 : random(40, 60);
  Entity.call(this, pos.x, pos.y, r);

  this.vel = p5.Vector.random2D();
  this.total = floor(random(7, 15));

  this.size = size;
  switch(size) {
    case 1:
      this.vel.mult(1.5); break;
    case 0:
      this.vel.mult(2); break;
  }


  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.2, this.r * 0.5);
  }

  this.rmin = this.r + min(this.offset);
  this.rmin2 = this.rmin * this.rmin;
  this.rmax = this.r + max(this.offset);
  this.rmax2 = this.rmax * this.rmax;

  Entity.prototype.setRotation.call(this, random(-0.03, 0.03));

  this.render = function() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      vertex(r * cos(angle), r * sin(angle));
    }
    endShape(CLOSE);
    pop();
  }

  this.playSoundEffect = function(soundArray){
    soundArray[floor(random(0,soundArray.length))].play();
  }

  this.breakup = function() {
    if(size > 0)
      return [
        new Powerup(this.pos, this.r, this.size-2),
        new Powerup(this.pos, this.r, this.size-2)
      ];
    else
      return [];
  }

  this.vertices = function() {
    var vertices = []
    for(var i = 0; i < this.total; i++) {
      var angle = this.heading + map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var vec = createVector(r * cos(angle), r * sin(angle));
      vertices.push(p5.Vector.add(vec, this.pos));
    }

    return vertices;
  }
}


Powerup.prototype = Object.create(Entity.prototype);
