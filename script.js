// Set the color variable
const COLOR = 'rgb(0, 0, 0)';
let color = 'rgb(0, 0, 0)'; // black color
let isColorRandom = false;
let isStandard = true;
let isGradient = false;

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
    console.log(`Original Square color is ${getComputedStyle(event.target).backgroundColor}`)
    if (isColorRandom) {
        color = randomizeColor();
    }
    else if (penGradient.checked) {
        // if (!event.target.style.backgroundColor) {
        //     color = color.replace(/[^,]+(?=\))/g, "0.1");
        // } else {
        //     let squareColor = event.target.style['background-color'];
        //     color = gradientColor(squareColor);
        // }
        drawGradient(event.target);
    }
    else if (isStandard) {
        console.log(color);
        event.target.style.backgroundColor = color;
    }
    // console.log(`Sketch pad background color is ${getComputedStyle(sketchPad).backgroundColor}`);
    // console.log(`Color is ${color}`);
    // console.log(`Square color is ${getComputedStyle(event.target).backgroundColor}`)
})

function drawGradient(e) {
    let targetColor = getComputedStyle(e).backgroundColor;
    let sPColor = getComputedStyle(sketchPad).backgroundColor;
    if (e.grad < 10) {
        e.grad += 1;
        let newColor = addAlpha(color, (e.grad / 10));
        e.style.backgroundColor = newColor;
    }
    console.log(targetColor)
    console.log(`Pen Color is ${color}`);
    console.log(getComputedStyle(sketchPad).backgroundColor);
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
    console.log(`Color from color picker is ${color}`)
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
    let a = 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Listen for eraser mode
const eraser = document.getElementById('eraser');
eraser.addEventListener('click', eraserMode)

function eraserMode() {
    isColorRandom = false;
    color = getComputedStyle(sketchPad).backgroundColor;
}

// Gradient mode
const penModes = document.querySelectorAll("input[name='pen-mode']");
const penStandard = document.querySelector("#standard");
const penGradient = document.querySelector("#gradient");

function gradientColor(c) {
    console.log(`Color input is ${c}`);
    let initialColor = c;
    let alpha = initialColor.match(/[^,]+(?=\))/g)[0];
    // console.log(`Initial alpha is ${alpha}`);
    alpha = parseFloat(alpha) + 0.1;
    console.log(alpha)
    let newColor = initialColor.replace(/[^,]+(?=\))/g, `${alpha}`)
    // console.log(newColor);
    return newColor;
}