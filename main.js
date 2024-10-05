import { createBalloon } from './balloon.js';

let canvas;
let canvasContext;

const BLACK_COLOR = "black";
const TOP_PANEL_HEIGHT = 100;

let topPanelPos;
let startButtonPos;
let balloons = [];
let lastBalloonCreation = Date.now();
let score = 0;

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    initialise();

    let framesPerSecond = 30;
    setInterval(function () {
        run();
    }, 1000 / framesPerSecond);

    canvas.addEventListener("mousedown", handleMouseClick);
};

function initialise() {
    topPanelPos = { x: 0, y: 0, width: canvas.width, height: 100 };
    startButtonPos = {
        x: topPanelPos.x + 150,
        y: topPanelPos.y + 20,
        width: 100,
        height: 30,
    };

    addBalloon();
}

function addBalloon() {
    // if (balloons.length > 1) return;

    if (lastBalloonCreation + 1000 > Date.now())
        return;
    // const balloon = createBalloon(canvasContext, 0, canvas.width, topPanelPos.y + topPanelPos.height, canvas.height);
    const balloon = createBalloon(canvasContext, 0, canvas.width, topPanelPos.height, canvas.height);
    balloon.initialise();

    balloons.push(balloon);
    lastBalloonCreation = Date.now();
}
function handleMouseClick(evt) {
    var mousePos = calculateMousePos(evt);

    for (let i = 0; i < balloons.length; i++) {
        const isHit = balloons[i].clicked(mousePos.x, mousePos.y);
        if (isHit) {
            score += balloons[i].getValue();
        }
    }
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY,
    };
}

function run() {
    moveEverything();
    drawEverything();
}

function moveEverything() {
    // add new balloon
    addBalloon();

    for (let i = 0; i < balloons.length; i++) {
        // animate all existing balloons
        // loop balloon list, move balloons down a step
        // if a balloon is at bottom edge, delete the balloon
        balloons[i].move();
    }

    // housekeeping
    const keep = balloons.filter(balloon => !balloon.isOutsideGameArea());
    balloons = keep;

    console.log(balloons.length);

    // create new target if 1 sec has elapsed
}

function drawEverything() {
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "white", true);

    drawTopPanel();
    drawBottomPanel();
}

function drawTopPanel() {
    drawRect(
        topPanelPos.x,
        topPanelPos.y,
        topPanelPos.width,
        topPanelPos.height,
        "white", true
    );
    drawScore(score);
    drawButton();
}

function drawScore(score) {
    canvasContext.fillText(score, topPanelPos.x + 40, topPanelPos.y + 40);
}

function drawButton() {
    drawRect(
        startButtonPos.x,
        startButtonPos.y,
        startButtonPos.width,
        startButtonPos.height,
        "green",
        false
    );
    canvasContext.fillText(
        "Start",
        startButtonPos.x + 40,
        startButtonPos.y + 20
    );
    canvasContext.fillText(score, topPanelPos.x + 40, topPanelPos.y + 40);

}

function drawBottomPanel() {
    drawBalloons();
}

function drawBalloons() {
    for (let i = 0; i < balloons.length; i++) {
        balloons[i].draw();
        drawTopPanel();
    }
}

function drawRect(x, y, width, height, color, isFill) {
    canvasContext.strokeStyle = color;
    canvasContext.fillStyle = color;
    canvasContext.rect(x, y, width, height);
    if (isFill) {
        canvasContext.fillRect(x, y, width, height);
    } else {
        canvasContext.stroke();
    }
}

// function drawCircle(x, y, radius, color) {
//   canvasContext.fillStyle = color;
//   canvasContext.beginPath();
//   canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
// }