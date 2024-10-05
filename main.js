// import { createBalloon } from "./balloon.js";
import { createBalloon } from './balloon.js';
var canvas;
var canvasContext;

const BLACK_COLOR = "black";
const TOP_PANEL_HEIGHT = 100;

var topPanelPos;
var startButtonPos;
var balloons = [];
var lastBalloonCreation;

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    initialise();

    var framesPerSecond = 30;
    setInterval(function () {
        moveEverything();
        drawEverything();
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

    balloons.push(createBalloon(canvasContext, 0, canvas.width));
    lastBalloonCreation = Date.now();
}

function handleMouseClick(evt) { }

function moveEverything() {
    for (let balloon of balloons) {
        // animate all existing balloons
        // loop balloon list, move balloons down a step
        // if a balloon is at bottom edge, delete the balloon
        balloon.move();
    }

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
        "red", false
    );
    drawScore(0);
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
}

function drawBottomPanel() {
    // drawCircle(50, 300, 20, 20);
    drawBalloons();
}

function drawBalloons() {
    for (let balloon of balloons) {
        balloon.draw();
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