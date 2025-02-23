// script.js

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let theta = 0;
const maxTheta = 12 * Math.PI;
const increment = 0.005;
const scaleFactor = 490;

function getColor(t) {
  // Create a color based on theta
  const red = Math.sin(t * 0.5) * 127 + 128; // Red component
  const green = Math.sin(t * 0.8 + 2) * 127 + 128; // Green component
  const blue = Math.sin(t * 1.2 + 4) * 127 + 128; // Blue component
  return `rgb(${red}, ${green}, ${blue})`;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 1.5;

  let r = Math.exp(Math.cos(theta)) - 2 * Math.cos(4 * theta) - Math.pow(Math.sin(theta / 12), 5);
  r *= scaleFactor;
  let x = r * Math.cos(theta) + canvas.width / 2;
  let y = r * Math.sin(theta) + canvas.height / 2;

  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  for (let t = 0; t <= theta; t += increment) {
    r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5);
    r *= scaleFactor;
    x = r * Math.cos(t) + canvas.width / 2;
    y = r * Math.sin(t) + canvas.height / 2;
    ctx.strokeStyle = getColor(t); // Set color based on theta
    ctx.lineTo(x, y);
  }

  ctx.stroke();

  theta += increment;
  if (theta <= maxTheta) {
    requestAnimationFrame(draw);
  } else {
    theta = 0;
    requestAnimationFrame(draw);
  }
}

draw();

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
