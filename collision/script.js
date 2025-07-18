const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = [
  { r: 51, g: 99, b: 252 },
  { r: 77, g: 57, b: 206 },
  // {r: 0, g: 189, b: 255},
];

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

window.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function rotatedVelocities(velocity, theta) {
  // x' = x*cos(theta) - y*sin(theta)
  // y' = y*cos(theta) + x*sin(theta)
  const rotatedVelocity = {
    x: velocity.x * Math.cos(theta) - velocity.y * Math.sin(theta),
    y: velocity.x * Math.sin(theta) + velocity.y * Math.cos(theta),
  };
  return rotatedVelocity;
}

class Particle {
  constructor(ctx, x, y, radius, rgb) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * 3,
      y: (Math.random() - 0.5) * 3,
    };
    this.radius = radius;
    this.mass = 1;
    this.opacity = 0;
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
  }

  update(particles) {
    this.draw();

    for (const particle of particles) {
      if (this.x === particle.x) continue; // prticle is same as `this`

      // check if particle collides with current particle(this)
      if (
        distance(this.x, this.y, particle.x, particle.y) - 2 * this.radius <
        0
      ) {
        const relativeVelocity = {
          x: this.velocity.x - particle.velocity.x,
          y: this.velocity.y - particle.velocity.y,
        };
        const displacement = {
          x: particle.x - this.x,
          y: particle.y - this.y,
        };

        // Dot product between relative velocity vector and displacement vector
        const dotProduct =
          relativeVelocity.x * displacement.x +
          relativeVelocity.y * displacement.y;

        // If dot product is positive, it means 0 <= θ <= 90 bcz a ⋅ b = ||a|| ||b|| cos θ
        // When the angle between the relative velocity vector and the displacement vector (the line connecting the two particles) is between 0° and 90°, it means the particles are heading toward each other, and a collision response should happen.
        if (dotProduct >= 0) {
          const m1 = this.mass;
          const m2 = particle.mass;
          const theta = -Math.atan2(particle.y - this.y, particle.x - this.x);

          // First we rotate it, so that we can find collision in 1Dimension
          const rotatedVelocity1 = rotatedVelocities(this.velocity, theta);
          const rotatedVelocity2 = rotatedVelocities(particle.velocity, theta);

          //Now we apply formula for collision in 1 D
          /*
            Velocity after perfectly elastic collision
            --> v1 = ((m1 - m2)u1 + 2m2u2) / (m1 + m2)
            --> v2 = ((m2 - m1)u2 + 2m1u1) / (m1 + m2)
          */
          const swapVelocity1 = {
            x:
              ((m1 - m2) * rotatedVelocity1.x) / (m1 + m2) +
              (2 * m2 * rotatedVelocity2.x) / (m1 + m2),
            y: rotatedVelocity1.y,
          };

          const swapVelocity2 = {
            x:
              ((m2 - m1) * rotatedVelocity2.x) / (m1 + m2) +
              (2 * m1 * rotatedVelocity1.x) / (m1 + m2),
            y: rotatedVelocity2.y,
          };

          // again rotate to get the velocities in the original 2D space
          const finalVelocity1 = rotatedVelocities(swapVelocity1, -theta);
          const finalVelocity2 = rotatedVelocities(swapVelocity2, -theta);

          this.velocity.x = finalVelocity1.x;
          this.velocity.y = finalVelocity1.y;
          particle.velocity.x = finalVelocity2.x;
          particle.velocity.y = finalVelocity2.y;
        }
      }
    }

    if (
      distance(this.x, this.y, mouse.x, mouse.y) - this.radius * 2 < 100 &&
      this.opacity < 0.2
    )
      this.opacity += 0.01;
    else if (this.opacity > 0) this.opacity -= 0.01;

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0)
      this.velocity.x = -this.velocity.x;

    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0)
      this.velocity.y = -this.velocity.y;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

let particles;

function init() {
  particles = [];
  let radius = 15;

  for (let i = 0; i < 100; i++) {
    let x = randomIntFromRange(radius, innerWidth - radius);
    let y = randomIntFromRange(radius, innerHeight - radius);

    // check whether new particle collides with any previous particle or not
    for (let j = 0; j < particles.length; j++) {
      if (distance(x, y, particles[j].x, particles[j].y) - 2 * radius <= 0) {
        // particles overlaps with existing particle.
        // Create a new random particle
        x = randomIntFromRange(radius, innerWidth - radius);
        y = randomIntFromRange(radius, innerHeight - radius);

        j = -1; // now in next iteration it starts from 0
      }
    }

    particles.push(new Particle(ctx, x, y, radius, randomColor(colors)));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => particle.update(particles));
}

init();
animate();
