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
