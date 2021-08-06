// Create 16x16 pixel squares on the for the sketch pad
const sketchPad = document.getElementById("sketch-pad");

function createSquare() {
    const square = document.createElement("div");
    return square;
}

for (let i = 0; i < 16; i++) {
    sketchPad.appendChild(createSquare());
}
