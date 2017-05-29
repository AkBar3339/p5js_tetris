Figure.prototype.figureFigureCollision = function(variable) {
    this.figuresCount = figures.length - 1;
    this.variable = variable;
    
    for (var i = 0; i < this.figuresCount; i++) {
        for (var j = 0; j < figures[i].blocks.length; j++) {
            for (var k = 0; k < this.blocks.length; k++) {
                this.collision = collideRectRect(figures[i].blocks[j].pos.x, figures[i].blocks[j].pos.y, blockSize - 1, blockSize - this.variable, this.blocks[k].pos.x, this.blocks[k].pos.y, blockSize - 1, blockSize - this.variable);
                if (this.collision) {
                    break;
                }
            }
            if (this.collision) break;
        }
        if (this.collision) break;
    }
}

Figure.prototype.rotationFFCollision = function() {
    this.figuresCount = figures.length - 1;
    
    for (var i = 0; i < this.figuresCount; i++) {
        for (var j = 0; j < figures[i].blocks.length; j++) {
            for (var k = 0; k < this.blocks.length; k++) {
                this.rotationCollision = collideRectRect(figures[i].blocks[j].pos.x, figures[i].blocks[j].pos.y, blockSize - 1, blockSize - 1, this.blocks[k].pos.x, this.blocks[k].pos.y, blockSize - 1, blockSize - 1);
                if (this.rotationCollision) break;
            }
            if (this.rotationCollision) break;
        }
        if (this.rotationCollision) break;
    }
}

Figure.prototype.rotationWallCollision = function() {
    for (var i = 0; i < this.blocks.length; i++) {
        this.rotationCollision = collideLineRect(-1, 0, -1, height, this.blocks[i].pos.x, this.blocks[i].pos.y, blockSize - 1, blockSize);
        if (this.rotationCollision) break;
        this.rotationCollision = collideLineRect(width, 0, width, height, this.blocks[i].pos.x, this.blocks[i].pos.y, blockSize - 1, blockSize);
        if (this.rotationCollision) break;
        this.rotationCollision = collideLineRect(0, height + 1, width, height + 1, this.blocks[i].pos.x, this.blocks[i].pos.y, blockSize, blockSize);
        if (this.rotationCollision) break;
    }
}

Figure.prototype.moveCollision = function() {
    this.figuresCount = figures.length - 1;
    
    for (var i = 0; i < this.figuresCount; i++) {
        for (var j = 0; j < figures[i].blocks.length; j++) {
            for (var k = 0; k < this.blocks.length; k++) {
                this.collisionMove = collideRectRect(figures[i].blocks[j].pos.x, figures[i].blocks[j].pos.y, blockSize - 1, blockSize - 1, this.blocks[k].pos.x, this.blocks[k].pos.y, blockSize - 1, blockSize - 1);
                if (this.collisionMove) break;
            }
            if (this.collisionMove) break;
        }
        if (this.collisionMove) break;
    }
}

function fullRow() {
    var tetris = 0;
    for (var k = 0; k < height; k += blockSize) {
        var row = [];
        for (var i = 0; i < figures.length; i++) {
            for (var j = 0; j < figures[i].blocks.length; j++) {
                if (figures[i].blocks[j].pos.y == k) {
                    row.push(figures[i].blocks[j]);
                }
            }
        }
        if (row.length == 10) {
            for (var l = row.length - 1; l >= 0; l--) {
                var parent = row[l].figureIndex;
                var child = row[l].index;
                var placeholder = {
                    ph: true,
                    pos: createVector(1000, 1000)
                };
                figures[parent].blocks[child] = placeholder;
                score++;
            }
            speedUp();
            tetris += 1;
            sounds[3].play();
            for (var i = 0; i < figures.length; i++) {
                for (var j = 0; j < figures[i].blocks.length; j++) {
                    if (figures[i].blocks[j].pos.y < k && !figures[i].blocks[j].ph) {
                        figures[i].blocks[j].pos.y += blockSize; 
                    }
                }
            }
        }
    }
    if (tetris == 4) {
        score += 40;
    }
    else if (tetris == 3) {
        score += 10;
    }
    else if (tetris == 2) {
        score += 5;
    }
}

function deleteEmpty() {
    for (var i = figures.length - 1; i >= 0; i--) {
        for (var j = figures[i].blocks.length - 1; j >= 0; j--) {
            if (!figures[i].blocks[j].ph) break;
            else if (j == 0)  {
                figures.splice(i, 1);
                leatestFigure -= 1;
                for (var k = i; k < figures.length; k++) {
                    figures[k].index = k;
                    for (var l = 0; l < figures[k].blocks.length; l++)  {
                        if (!figures[k].blocks[l].ph) {
                            figures[k].blocks[l].figureIndex = k;
                        }
                    }
                }
            }
        }
    }
}

function randomFigure() {
    return floor(random(0, 7));
}

function gameplay() {
    var nextFigure = leatestFigure + 1;
    if (nextFigure == 0 || !figures[leatestFigure].isMoving) {
        figureTypes.splice(1, 1);
        figureTypes[4] = randomFigure();
        figures[nextFigure] = new Figure(figureTypes[1], nextFigure);
        displayNext();
        holded = false;
    }
}

function gameOver() {
     if (figures[leatestFigure].isMoving == false && figures[leatestFigure].pos.y < 0) {
         console.log("Wyłącz konsolę laciu i nie czituj!")
         stroke(0);
         fill(255);
         text("Game over!", width * 0.5, height * 0.5);
         textSize(20);
         text("Press Enter to play again.", width * 0.5, (height * 0.5) + 30);
         noLoop();
         sounds[0].play();
         if (score > bestScore) {
             bestScore = score;
             document.getElementById("txt1").innerHTML = "Best score: " + bestScore;
         }
         ended = true;
     }
}

function speedUp() {
    if (timer > 4){
        prevTimer -= 2;
        timer -= 2;
    }
}

function displayPrep() {
    if (canvH == 800) {
        imgSections[0].style.width = "240px";
        imgSections[0].style.height = "800px";
        for (var i = 1; i < 5; i++) {
            imgSections[i].style.width = "160px";
            imgSections[i].style.height = "120px";
            imgSections[i].style.margin = "20px 40px 30px 40px";
        }
    }
    else {
        document.getElementById("txt").style.fontSize = "20pt";
        document.getElementById("txt2").style.fontSize = "20pt";
        document.getElementById("txt1").style.fontSize = "15pt";
        document.getElementById("container").height = "600px";
        document.getElementById("container").width = "480px";
        document.getElementById("container").margin = "0 auto"; 
        imgSections[0].style.width = "180px";
        imgSections[0].style.height = "600px";
        for (var i = 1; i < 5; i++) {
            imgSections[i].style.width = "120px";
            imgSections[i].style.height = "90px";
            imgSections[i].style.margin = "15px 30px 22px 30px";
        }
    }
}

function displayNext() {
    if (canvH == 800) {
        for (var i = 2; i < 5; i++) {
            switch (figureTypes[i]) {
                case 0:
                    imgSections[i].style.backgroundImage = "url('" + images[0] + "')";
                    break;
                case 1:
                    imgSections[i].style.backgroundImage = "url('" + images[1] + "')";
                    break;
                case 2:
                    imgSections[i].style.backgroundImage = "url('" + images[2] + "')";
                    break;
                case 3:
                    imgSections[i].style.backgroundImage = "url('" + images[3] + "')";
                    break;
                case 4:
                    imgSections[i].style.backgroundImage = "url('" + images[4] + "')";
                    break;
                case 5:
                    imgSections[i].style.backgroundImage = "url('" + images[5] + "')";
                    break;
                case 6:
                    imgSections[i].style.backgroundImage = "url('" + images[6] + "')";
                    break;
                case undefined:
                    
                    break;
            }
        }
    }
    else {
        for (var i = 2; i < 5; i++) {
            switch (figureTypes[i]) {
                case 0:
                    imgSections[i].style.backgroundImage = "url('" + images[0] + "')";
                    imgSections[i].style.backgroundSize = "100%";
                    break;
                case 1:
                    imgSections[i].style.backgroundImage = "url('" + images[1] + "')";
                    imgSections[i].style.backgroundSize = "50%";
                    break;
                case 2:
                    imgSections[i].style.backgroundImage = "url('" + images[2] + "')";
                    imgSections[i].style.backgroundSize = "75%";
                    break;
                case 3:
                    imgSections[i].style.backgroundImage = "url('" + images[3] + "')";
                    imgSections[i].style.backgroundSize = "75%";
                    break;
                case 4:
                    imgSections[i].style.backgroundImage = "url('" + images[4] + "')";
                    imgSections[i].style.backgroundSize = "75%";
                    break;
                case 5:
                    imgSections[i].style.backgroundImage = "url('" + images[5] + "')";
                    imgSections[i].style.backgroundSize = "75%";
                    break;
                case 6:
                    imgSections[i].style.backgroundImage = "url('" + images[6] + "')";
                    imgSections[i].style.backgroundSize = "75%";
                    break;
                case undefined:
                    
                    break;
            }
        }
    }
}

function newGame() {
    canvas = undefined;
    figures = [];
    figureTypes = [];
    figureNo = 0;
    leatestFigure = 0;
    timer = 60;
    prevTimer = timer;
    score = 0;
    position = 16;
    startGame()
    ended = false;
    holded = false;
    holding = false;
    displayHold();
    loop();
}

function hold() {
    if (!holding && !holded) {
        figureTypes[0] = figureTypes[1];
        figureTypes.splice(1, 1);
        figureTypes[4] = randomFigure();
        figures.pop();
        figures[leatestFigure] = new Figure(figureTypes[1], leatestFigure);
        displayNext();
        displayHold();
        holding = true;
        holded = true;
    }
    if (holding && !holded) {
        var temp = figureTypes[0];
        figureTypes[0] = figureTypes[1];
        figureTypes[1] = temp;
        figures.pop();
        figures[leatestFigure] = new Figure(figureTypes[1], leatestFigure);
        displayNext();
        displayHold();
        holding = true;
        holded = true;
    }
}

function displayHold() {
    if (canvH == 800) {
        switch (figureTypes[0]) {
                case 0:
                    imgSections[1].style.backgroundImage = "url('" + images[0] + "')";
                    break;
                case 1:
                    imgSections[1].style.backgroundImage = "url('" + images[1] + "')";
                    break;
                case 2:
                    imgSections[1].style.backgroundImage = "url('" + images[2] + "')";
                    break;
                case 3:
                    imgSections[1].style.backgroundImage = "url('" + images[3] + "')";
                    break;
                case 4:
                    imgSections[1].style.backgroundImage = "url('" + images[4] + "')";
                    break;
                case 5:
                    imgSections[1].style.backgroundImage = "url('" + images[5] + "')";
                    break;
                case 6:
                    imgSections[1].style.backgroundImage = "url('" + images[6] + "')";
                    break;
                case undefined:
                    imgSections[1].style.backgroundImage = "none";
                    break;
            }
        }
    else {
        switch (figureTypes[0]) {
            case 0:
                imgSections[1].style.backgroundImage = "url('" + images[0] + "')";
                imgSections[1].style.backgroundSize = "100%";
                break;
            case 1:
                imgSections[1].style.backgroundImage = "url('" + images[1] + "')";
                imgSections[1].style.backgroundSize = "50%";
                break;
            case 2:
                imgSections[1].style.backgroundImage = "url('" + images[2] + "')";
                imgSections[1].style.backgroundSize = "75%";
                break;
            case 3:
                imgSections[1].style.backgroundImage = "url('" + images[3] + "')";
                imgSections[1].style.backgroundSize = "75%";
                break;
            case 4:
                imgSections[1].style.backgroundImage = "url('" + images[4] + "')";
                imgSections[1].style.backgroundSize = "75%";
                break;
            case 5:
                imgSections[1].style.backgroundImage = "url('" + images[5] + "')";
                imgSections[1].style.backgroundSize = "75%";
                break;
            case 6:
                imgSections[1].style.backgroundImage = "url('" + images[6] + "')";
                imgSections[1].style.backgroundSize = "75%";
                break;
            case undefined:
                imgSections[1].style.backgroundImage = "none";
                break;
        }
    }
}
