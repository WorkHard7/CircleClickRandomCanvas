/* Selectors */

const canvas = document.querySelector("#canvas");
let displayTimer = document.querySelector("p");
const newElemContainer = document.querySelector(".newElemContainer");
const containerCircle = document.querySelector(".container-circle");

/* Variables */

const ctx = canvas.getContext("2d");
let time = 0;
let color;

let runTimer = window.addEventListener("load", (e) => {
  // when page finishes to load, we start a timer
  displayTimer.innerHTML = setInterval(() => {
    time += 0.01; // each 10 mls the time is going up by 0.01

    displayTimer.innerHTML = time.toFixed(3); // displayTimer variable equals with time value
  }, 10);
});

canvas.width = containerCircle.offsetWidth;
canvas.height = containerCircle.offsetHeight;

// console.log(canvas);

function drawCircle() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  const radius = 30;
  let posX = Math.floor(Math.random() * (canvas.width - 32));
  let posY = Math.floor(Math.random() * (canvas.height - 32));

  let colorRed = Math.floor(Math.random() * 255);
  let colorGreen = Math.floor(Math.random() * 255);
  let colorBlue = Math.floor(Math.random() * 255);

  color = `rgb(${colorRed},${colorGreen},${colorBlue})`;

  // console.log(color);

  const circle = new Path2D();
  circle.arc(posX, posY, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = `${color}`;
  ctx.fill(circle);

  /* Adding event listener for circle */
  canvas.addEventListener("click", (e) => {
    // Check whether mouse is inside circle
    if (ctx.isPointInPath(circle, e.offsetX, e.offsetY)) {
      drawCircle();
      time = 0; // resetting the time variable on click
      newElem();
    }
  });

  /* Function for creating new element on click */

  let border = "3px solid yellow";

  const newElem = () => {
    let newItem = document.createElement("p");
    newItem.style = `animation: animate 1s forwards; border: 3px solid ${color}`;
    newItem.innerHTML = displayTimer.innerHTML; // assigning to new element "p" -> the displayTimer value

    newElemContainer.append(newItem);
  };
}

window.addEventListener("load", drawCircle);
