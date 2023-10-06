let particles = [];
let guideLines = [];

function setup() {
  createCanvas(1680,1090);
  noFill();
  strokeWeight(1);
}

function draw() {
  // Recorre todas las partículas en el arreglo
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.update();
    particle.display();

    // Elimina las partículas que están fuera de la pantalla
    if (particle.isOffScreen() || particle.isFaded()) {
      particles.splice(i, 1);
    }
  }
}

function mouseClicked() {
  // Crea una nueva partícula y agrégala al arreglo de partículas cuando haces clic
  let p = new Particle(mouseX, mouseY);
  particles.push(p);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = color(random(200, 255), random(200, 255), random(200, 255), 255); // Alfa inicial a 255
    this.radius = random(10, 20);
    this.explosionSpeed = createVector(random(-4, 4), random(-4, 4)); // Aumentamos la velocidad
    this.numCircles = floor(random(3, 6)); // Número de círculos superpuestos
    this.circles = [];
    
    // Genera los círculos superpuestos
    for (let i = 0; i < this.numCircles; i++) {
      let circleRadius = this.radius + random(-5, 5);
      this.circles.push({ x: this.x, y: this.y, radius: circleRadius });
    }
  }

  update() {
    for (let i = 0; i < this.numCircles; i++) {
      this.circles[i].x += this.explosionSpeed.x;
      this.circles[i].y += this.explosionSpeed.y;
    }
  }

  display() {
    for (let i = 0; i < this.numCircles; i++) {
      stroke(this.color);
      ellipse(this.circles[i].x, this.circles[i].y, this.circles[i].radius * 2);

      // Dibuja una línea desde la posición anterior a la posición actual de la partícula
      if (i > 0) {
        let prevPos = this.circles[i - 1];
        line(prevPos.x, prevPos.y, this.circles[i].x, this.circles[i].y);
      }
    }
  }

  isOffScreen() {
    for (let i = 0; i < this.numCircles; i++) {
      if (this.circles[i].x < 0 || this.circles[i].x > width || this.circles[i].y < 0 || this.circles[i].y > height) {
        return true;
      }
    }
    return false;
  }

  isFaded() {
    return this.color.levels[3] <= 0;
  }
}

