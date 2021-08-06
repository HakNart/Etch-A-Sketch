// Set the color variable
let color = '#000000';

// Create 16x16 pixel squares on the for the sketch pad
const sketchPad = document.getElementById("sketch-pad");

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
    event.target.style['background-color'] = color;
})

// Listen for color change
const colorPicker = document.getElementById("color-picker");
console.log(colorPicker);
colorPicker.addEventListener("change", function(event) {
    color = event.target.value;
})

