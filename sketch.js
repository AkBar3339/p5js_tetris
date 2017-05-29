var canvas;
var figures = [];
var figureTypes = [];
var blockSize;
var figureNo = 0;
var leatestFigure = 0;
var timer = 60;
var canvH;
var canvW;
var prevTimer = timer;
var score = 0;
var position = 16;
var imgSections = [];
var main;
var images = [];
var sounds = []; //0- lose, 1- rotate, 2- hit, 3- score++
var ended = false;
var bestScore = 0;
var holding = false;
var holded = false;

function preload() {
    window.addEventListener("keydown", function(event) {
        if (event.keyCode === DOWN_ARROW || event.keyCode === 32 || event.keyCode === 123) {
            event.preventDefault();
        }
    })
    var windowH = windowHeight
    if (windowH >= 800) canvH = 800;
    else if (windowH >= 600) canvH = 600;
    else {
        window.stop();
        alert("Your screen is too small to play this game :(");
    }
    for (var i = 0; i < 7; i++) {
        images[i] = 'assets/images/' + i + '.png';
    }
    canvW = canvH * 0.5;
    main = document.getElementById("main");
    for (var i = 0; i < 4; i++) {
        sounds[i] = loadSound('assets/sounds/' + i + '.mp3');
    }
    imgSections[0] = document.getElementById("right_panel")
    for (var i = 1; i < 5; i++) {
        var str = "figure_" + i
        imgSections[i] = document.getElementById(str);
    }
    displayPrep();
}

function startGame() {
    for (var i = 1; i < 5; i++) {
        figureTypes[i] = randomFigure();
    }
    figures[figureNo] = new Figure(figureTypes[1], figureNo);
    textSize(32);
    textAlign(CENTER);
    displayNext();
}

function setup() {
    if (canvH == 800) {
        main.style.width = "400px";
        main.style.height = "800px";
    }
    else {
        main.style.width = "300px";
        main.style.height = "600px";
    }
    canvas = createCanvas(canvW, canvH);
    canvas.parent("main");
    blockSize = floor(width / 10);
    startGame();
}

function draw() {
    background(51);
    leatestFigure = figures.length - 1; 
    for (var i = 0; i < figures.length; i++) {
        figures[i].show();
        figures[i].hit();
    }
    figures[leatestFigure].fall();
    gameOver();
    stroke(0);
    fill(255);
    if (score >= 1000) { position = 40; }
    else if (score >= 100) { position = 32; }
    else if (score >= 10) { position = 24; }
    textSize(32);
    text(score, position, 32);
    gameplay();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        figures[leatestFigure].moveLeft();
        figures[leatestFigure].moveCollision();
        if (figures[leatestFigure].collisionMove) {
            figures[leatestFigure].moveRight();
            figures[leatestFigure].collisionMove = false;
        }
    }
    else if (keyCode === RIGHT_ARROW) {
        figures[leatestFigure].moveRight();
        figures[leatestFigure].moveCollision();
        if (figures[leatestFigure].collisionMove) {
            figures[leatestFigure].moveLeft();
            figures[leatestFigure].collisionMove = false;
        }
    }
    else if (keyCode === DOWN_ARROW) {
        var speed = 6;
        prevTimer = timer;
        if (timer > speed) {
            timer = speed;
        }
    }
    else if (keyCode === ENTER) {
        if (ended) {
            newGame();
        }
    }
    else if (keyCode === 32) {
        hold();
    }
}

function keyReleased() {
    if (keyCode === DOWN_ARROW) {
        timer = prevTimer;
    }
}

function keyTyped() {
    if (key === 'z') {
        figures[leatestFigure].rotateLeft();
        figures[leatestFigure].rotationFFCollision();
        if (!figures[leatestFigure].rotationCollision) {
            figures[leatestFigure].rotationWallCollision();
        }
        if (figures[leatestFigure].rotationCollision) {
            figures[leatestFigure].rotateRight();
            figures[leatestFigure].rotationCollision = false;
        }
        else sounds[1].play();
    }
    else if (key === 'x') {
        figures[leatestFigure].rotateRight();
        figures[leatestFigure].rotationFFCollision();
        if (!figures[leatestFigure].rotationCollision) {
            figures[leatestFigure].rotationWallCollision();
        }
        if (figures[leatestFigure].rotationCollision) {
            figures[leatestFigure].rotateLeft();
            figures[leatestFigure].rotationCollision = false;
        }
        else sounds[1].play();
    }
}