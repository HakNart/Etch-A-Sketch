// Set the color variable
let color = '#000000';
let isColorRandom = false;
let isStandard = true;
let isGradient = false;

// Create 16x16 pixel squares on the for the sketch pad
const sketchPad = document.querySelector("#sketch-pad");
console.log(getComputedStyle(sketchPad).backgroundColor);
function createSquare() {
    const square = document.createElement("div");
    square.classList.add("square");
    return square;
}

for (let i = 0; i < 16**2; i++) {
    sketchPad.appendChild(createSquare());
}

// Listen for mouse over a square and change its color
sketchPad.addEventListener('mouseover', function(event) {
    if (isColorRandom) {
        color = randomizeColor();
    }
    event.target.style['background-color'] = color;
})

// Listen for color change
const colorPicker = document.getElementById("color-picker");
console.log(colorPicker);
colorPicker.addEventListener("change", function(event) {
    color = event.target.value;
})

// Listen for rainbow mode
const rainbow = document.getElementById("rainbow");
rainbow.addEventListener('click', rainbowColor)

// Set flag for random color to true
function rainbowColor() {
    isColorRandom = true;
}

// Create random rgb value for colors
function randomizeColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

// Listen for eraser mode
const eraser = document.getElementById('eraser');
eraser.addEventListener('click', eraserMode)

function eraserMode() {
    isColorRandom = false;
    color = getComputedStyle(sketchPad).backgroundColor;
}