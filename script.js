// Set the color variable
const COLOR = 'rgb(0, 0, 0)';
let color = 'rgb(0, 0, 0)'; // black color
let isColorRandom = false;
let isStandard = true;
let isGradient = false;
let isEraseMode = false;

function setDefault() {
    color = COLOR; // black color
    isColorRandom = false;
    isStandard = true;
    isGradient = false;
    isEraseMode = false;
}

// Create 16x16 pixel squares on the for the sketch pad
const sketchPad = document.querySelector("#sketch-pad");
function createSquare() {
    const square = document.createElement("div");
    square.classList.add("square");
    square.grad = 0;
    return square;
}

for (let i = 0; i < 16**2; i++) {
    sketchPad.appendChild(createSquare());
}

// Listen for mouse over a square and change its color
sketchPad.addEventListener('mouseover', function(event) {
    if (isColorRandom) {
        drawRandom(event.target);
    }
    else if (isGradient) {
        drawGradient(event.target);
    }
    else if (isStandard) {
        drawStandard(event.target);
    }
    else if (isEraseMode) {
        eraseDrawing(event.target);
    }
})

// Update pen mode whenever there are changes
function updatePenMode(str) {
    switch (str) {
        case "standard":
            [isStandard, isGradient, isColorRandom] = [true, false, false];
            break;
        case "gradient":
            [isStandard, isGradient, isColorRandom] = [false, true, false];
            break;
        case "random":
            [isStandard, isGradient, isColorRandom] = [false, false, true];
            break;
        case "erase":
            [isStandard, isGradient, isColorRandom] = [false, false, false];
            break;
    }
}

function eraseDrawing(e) {
    e.grad = 0;
    e.style.backgroundColor = getComputedStyle(sketchPad).backgroundColor;
}

function drawRandom(e) {
    e.grad = 10;
    e.style.backgroundColor = randomizeColor();
}

function drawStandard(e) {
    e.grad = 10;
    e.style.backgroundColor = color;
}

function drawGradient(e) {
    let targetColor = getComputedStyle(e).backgroundColor;
    let sPColor = getComputedStyle(sketchPad).backgroundColor;
    if (e.grad < 10) {
        e.grad += 1;
        let newColor = addAlpha(color, (e.grad / 10));
        e.style.backgroundColor = newColor;
    }
}

// Function to add alpha to rgb
function addAlpha(rgb, a) {
    match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(rgb);
    a = a > 1 ? (a / 100) : a;
    return "rgba(" + [match[1],match[2],match[3],a].join(', ') +")";
}

// Function to convert hex to rgba
function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}

function hexToRgb(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgb('+[(c>>16)&255, (c>>8)&255, c&255].join(',') + ')';
    }
    throw new Error('Bad Hex');
}

// Listen for color change
const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("change", function(event) {
    color = hexToRgb(event.target.value);
})

// Listen for rainbow mode
const rainbow = document.getElementById("rainbow");
rainbow.addEventListener('click', rainbowColor)

// Set flag for random color to true
function rainbowColor() {
    updatePenMode("random");
    isEraseMode = true;
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
    updatePenMode("erase");
}

// Gradient mode
const penSettings = document.querySelector("#settings");
const penStandard = document.querySelector("#standard");
const penGradient = document.querySelector("#gradient");

penSettings.addEventListener("change", function(e) {
    if (penStandard.checked) {
        updatePenMode("standard");
    } 
    else if (penGradient.checked) {
        updatePenMode("gradient");
    } 
})

// Listen to reset button to be clicked and reset the settings
const reset = document.querySelector("#reset");
reset.addEventListener("click", setDefault);