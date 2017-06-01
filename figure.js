function Figure(type, index) {
    this.pos = createVector((5 * blockSize), - (2 * blockSize));
    this.blocks = [];
    this.isMoving = true;
    this.isFalling = true;
    this.rotationState = 0;
    this.type = type;
    this.index = index;
    this.hitLeft = false;
    this.hitRight = false;
    this.hitBottom = false;
    this.collision = false;
    this.collisionMove = false;
    this.rotationCollision = false;
    this.soundIsPlayed = false;

    // Type: 0- bar, 1- square, 2- Z-shape, 3- S-shape, 4- L-shape, 5- J-shape, 6- T-shape
    // idk wtf am i doing ;)

    this.fall = function() {
        if (this.hitBottom || this.collision) { //Temp fo debuging
            if (frameCount % (timer * 0.5) == 0) {
                this.isFalling = false;
                this.hitBottom = false;
                this.collision = false;
                this.hit();
                this.figureFigureCollision(0);
                if (this.hitBottom || this.collision) {
                    this.isMoving = false;
                    if (!this.soundIsPlayed && (this.hitBottom || this.collision)) {
                        sounds[2].play();
                        this.soundIsPlayed = true;
                    }
                    fullRow();
                }
                else { this.isFalling = true; }
                deleteEmpty();
            }
        }
        if (this.isFalling && frameCount % timer == 0) {
            for (var i = 0; i < this.blocks.length; i++) {
                this.blocks[i].pos.y += blockSize;
            }
            this.figureFigureCollision(1);
            if (this.collision) {
                for (var i = 0; i < this.blocks.length; i++) {
                    this.blocks[i].pos.y -= blockSize;
                }
            }
            else { this.pos.y += blockSize; }
        }
    }

    this.moveLeft = function() {
        if (this.isMoving && !this.hitLeft) {
            for (var i = 0; i < this.blocks.length; i++) {
                this.blocks[i].pos.x -= blockSize;
            }
            this.pos.x -= blockSize
            this.hitRight = false;
        }
    }

    this.moveRight = function() {
        if (this.isMoving && !this.hitRight) {
            for (var i = 0; i < this.blocks.length; i++) {
                this.blocks[i].pos.x += blockSize;
            }
            this.pos.x += blockSize;
            this.hitLeft = false;
        }
    }

    this.rotateLeft = function() {
        if (this.isMoving) {
            switch (this.type) {
                case 0:
                    if (this.rotationState == 0) this.rotateBar(3);
                    else if (this.rotationState == 1) this.rotateBar(0);
                    else if (this.rotationState == 2) this.rotateBar(1);
                    else if (this.rotationState == 3) this.rotateBar(2);
                    break;
                case 1:
                    //Square
                    break;
                case 2:
                    if (this.rotationState == 0) this.rotateZ(3);
                    else if (this.rotationState == 1) this.rotateZ(0);
                    else if (this.rotationState == 2) this.rotateZ(1);
                    else if (this.rotationState == 3) this.rotateZ(2);
                    break;
                case 3:
                    if (this.rotationState == 0) this.rotateS(3);
                    else if (this.rotationState == 1) this.rotateS(0);
                    else if (this.rotationState == 2) this.rotateS(1);
                    else if (this.rotationState == 3) this.rotateS(2);
                    break;
                case 4:
                    if (this.rotationState == 0) this.rotateL(3);
                    else if (this.rotationState == 1) this.rotateL(0);
                    else if (this.rotationState == 2) this.rotateL(1);
                    else if (this.rotationState == 3) this.rotateL(2);
                    break;
                case 5:
                    if (this.rotationState == 0) this.rotateJ(3);
                    else if (this.rotationState == 1) this.rotateJ(0);
                    else if (this.rotationState == 2) this.rotateJ(1);
                    else if (this.rotationState == 3) this.rotateJ(2);
                    break;
                case 6:
                    if (this.rotationState == 0) this.rotateT(3);
                    else if (this.rotationState == 1) this.rotateT(0);
                    else if (this.rotationState == 2) this.rotateT(1);
                    else if (this.rotationState == 3) this.rotateT(2);
                    break;
            }
            this.hitLeft = false;
            this.hitRight = false;
        }
    }

    this.rotateRight = function() {
        if (this.isMoving) {
            switch (this.type) {
                case 0:
                    if (this.rotationState == 0) this.rotateBar(1);
                    else if (this.rotationState == 1) this.rotateBar(2);
                    else if (this.rotationState == 2) this.rotateBar(3);
                    else if (this.rotationState == 3) this.rotateBar(0);
                    break;
                case 1:
                    //Square
                    break;
                case 2:
                    if (this.rotationState == 0) this.rotateZ(1);
                    else if (this.rotationState == 1) this.rotateZ(2);
                    else if (this.rotationState == 2) this.rotateZ(3);
                    else if (this.rotationState == 3) this.rotateZ(0);
                    break;
                case 3:
                    if (this.rotationState == 0) this.rotateS(1);
                    else if (this.rotationState == 1) this.rotateS(2);
                    else if (this.rotationState == 2) this.rotateS(3);
                    else if (this.rotationState == 3) this.rotateS(0);
                    break;
                case 4:
                    if (this.rotationState == 0) this.rotateL(1);
                    else if (this.rotationState == 1) this.rotateL(2);
                    else if (this.rotationState == 2) this.rotateL(3);
                    else if (this.rotationState == 3) this.rotateL(0);
                    break;
                case 5:
                    if (this.rotationState == 0) this.rotateJ(1);
                    else if (this.rotationState == 1) this.rotateJ(2);
                    else if (this.rotationState == 2) this.rotateJ(3);
                    else if (this.rotationState == 3) this.rotateJ(0);
                    break;
                case 6:
                    if (this.rotationState == 0) this.rotateT(1);
                    else if (this.rotationState == 1) this.rotateT(2);
                    else if (this.rotationState == 2) this.rotateT(3);
                    else if (this.rotationState == 3) this.rotateT(0);
                    break;
            }
            this.hitLeft = false;
            this.hitRight = false;
        }
    }

    this.rotateBar = function(direction) {
        switch (direction) {
            case 0: //down horizontal
                for (var i = 0; i < this.blocks.length; i++) {
                    this.blocks[i].pos.x = this.pos.x + ((i - 2) * blockSize);
                    this.blocks[i].pos.y = this.pos.y;
                }
                this.rotationState = 0;
                break;
            case 1: //left vertical
                for (var i = 0; i < this.blocks.length; i++) {
                    this.blocks[i].pos.x = this.pos.x - blockSize;
                    this.blocks[i].pos.y = this.pos.y + ((i - 2) * blockSize);
                }
                this.rotationState = 1;
                break;
            case 2: //up horizontal
                for (var i = 0; i <this.blocks.length; i++) {
                    this.blocks[i].pos.x = this.pos.x + ((i - 2) * blockSize);
                    this.blocks[i].pos.y = this.pos.y - blockSize;
                }
                this.rotationState = 2;
                break;
            case 3: //right vertical
                for (var i = 0; i <this.blocks.length; i++) {
                    this.blocks[i].pos.x = this.pos.x;
                    this.blocks[i].pos.y = this.pos.y + ((i - 2) * blockSize);
                }
                this.rotationState = 3;
                break;
        }
    }

    this.rotateZ = function(direction) {
        switch (direction) {
            case 0: //bottom Z
                for (var i = 0; i < 2; i++) {
                    this.blocks[i].pos.x = this.pos.x + ((i - 1) * blockSize);
                    this.blocks[i].pos.y = this.pos.y;
                }
                for (var i = 0; i < 2; i++) {
                    this.blocks[i + 2].pos.x = this.pos.x + (i * blockSize);
                    this.blocks[i + 2].pos.y = this.pos.y + blockSize;
                }
                this.rotationState = 0;
                break;
            case 1: //right reverse "4"
                for (var i = 0; i < 2; i++) {
                    this.blocks[i].pos.x = this.pos.x;
                    this.blocks[i].pos.y = this.pos.y - ((i - 1) * blockSize);
                }
                for (var i = 0; i < 2; i++) {
                    this.blocks[i + 2].pos.x = this.pos.x + blockSize;
                    this.blocks[i + 2].pos.y = this.pos.y - (i * blockSize);
                }
                this.rotationState = 1;
                break;
            case 2: //upper Z
                for (var i = 0; i < 2; i++) {
                    this.blocks[i].pos.x = this.pos.x + ((i - 1) * blockSize);
                    this.blocks[i].pos.y = this.pos.y - blockSize;
                }
                for (var i = 0; i < 2; i++) {
                    this.blocks[i + 2].pos.x = this.pos.x + (i * blockSize);
                    this.blocks[i + 2].pos.y = this.pos.y;
                }
                this.rotationState = 2;
                break;
            case 3: //left reverse "4"
                for (var i = 0; i < 2; i++) {
                    this.blocks[i].pos.x = this.pos.x - blockSize;
                    this.blocks[i].pos.y = this.pos.y - ((i - 1) * blockSize);
                }
                for (var i = 0; i < 2; i++) {
                    this.blocks[i + 2].pos.x = this.pos.x;
                    this.blocks[i + 2].pos.y = this.pos.y - (i * blockSize);
                }
                this.rotationState = 3;
                break;
        }
    }

    this.rotateS = function(direction) {
        switch (direction) {
            case 0: //bottom S
                for (var i = 0; i < 2; i++) {
                    this.blocks[i].pos.x = this.pos.x + (i * blockSize);
                    this.blocks[i].pos.y = this.pos.y;
                }
                for (var i = 0; i < 2; i++) {
                    this.blocks[i + 2].pos.x = this.pos.x + ((i - 1) * blockSize);
                    this.blocks[i + 2].pos.y = this.pos.y + blockSize;
                }
                this.rotationState = 0;
                break;
            case 1: //right "4"
                for (var i = 0; i < 2; i++) {
                    this.blocks[i].pos.x = this.pos.x;
                    this.blocks[i].pos.y = this.pos.y - (i * blockSize);
                }
                for (var i = 0; i < 2; i++) {
                    this.blocks[i + 2].pos.x = this.pos.x + blockSize;
                    this.blocks[i + 2].pos.y = this.pos.y - ((i - 1) * blockSize);
                }
                this.rotationState = 1;
                break;
            case 2: //upper S
                for (var i = 0; i < 2; i++) {
                    this.blocks[i].pos.x = this.pos.x + (i * blockSize);
                    this.blocks[i].pos.y = this.pos.y - blockSize;
                }
                for (var i = 0; i < 2; i++) {
                    this.blocks[i + 2].pos.x = this.pos.x + ((i - 1) * blockSize);
                    this.blocks[i + 2].pos.y = this.pos.y;
                }
                this.rotationState = 2;
                break;
            case 3: //left "4"
                for (var i = 0; i < 2; i++) {
                    this.blocks[i].pos.x = this.pos.x - blockSize;
                    this.blocks[i].pos.y = this.pos.y - (i * blockSize);
                }
                for (var i = 0; i < 2; i++) {
                    this.blocks[i + 2].pos.x = this.pos.x;
                    this.blocks[i + 2].pos.y = this.pos.y - ((i - 1) * blockSize);
                }
                this.rotationState = 3;
                break;
        }
    }

    this.rotateL = function(direction) {
        switch(direction) {
            case 0:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x + ((i - 1) * blockSize);
                    this.blocks[i].pos.y = this.pos.y;
                }
                this.blocks[3].pos.x = this.pos.x - blockSize;
                this.blocks[3].pos.y = this.pos.y + blockSize;
                this.rotationState = 0;
                break;
            case 1:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x;
                    this.blocks[i].pos.y = this.pos.y + ((i - 1) * blockSize)
                }
                this.blocks[3].pos.x = this.pos.x - blockSize;
                this.blocks[3].pos.y = this.pos.y - blockSize;
                this.rotationState = 1;
                break;
            case 2:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x + ((i - 1) * blockSize);
                    this.blocks[i].pos.y = this.pos.y;
                }
                this.blocks[3].pos.x = this.pos.x + blockSize;
                this.blocks[3].pos.y = this.pos.y - blockSize;
                this.rotationState = 2;
                break;
            case 3:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x;
                    this.blocks[i].pos.y = this.pos.y + ((i - 1) * blockSize)
                }
                this.blocks[3].pos.x = this.pos.x + blockSize;
                this.blocks[3].pos.y = this.pos.y + blockSize;
                this.rotationState = 3;
                break;
        }
    }

    this.rotateJ = function(direction) {
        switch(direction) {
            case 0:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x + ((i - 1) * blockSize);
                    this.blocks[i].pos.y = this.pos.y;
                }
                this.blocks[3].pos.x = this.pos.x + blockSize;
                this.blocks[3].pos.y = this.pos.y + blockSize;
                this.rotationState = 0;
                break;
            case 1:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x;
                    this.blocks[i].pos.y = this.pos.y + ((i - 1) * blockSize)
                }
                this.blocks[3].pos.x = this.pos.x - blockSize;
                this.blocks[3].pos.y = this.pos.y + blockSize;
                this.rotationState = 1;
                break;
            case 2:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x + ((i - 1) * blockSize);
                    this.blocks[i].pos.y = this.pos.y;
                }
                this.blocks[3].pos.x = this.pos.x - blockSize;
                this.blocks[3].pos.y = this.pos.y - blockSize;
                this.rotationState = 2;
                break;
            case 3:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x;
                    this.blocks[i].pos.y = this.pos.y + ((i - 1) * blockSize)
                }
                this.blocks[3].pos.x = this.pos.x + blockSize;
                this.blocks[3].pos.y = this.pos.y - blockSize;
                this.rotationState = 3;
                break;
        }
    }

    this.rotateT = function(direction) {
        switch(direction) {
            case 0:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x + ((i - 1) * blockSize);
                    this.blocks[i].pos.y = this.pos.y;
                }
                this.blocks[3].pos.x = this.pos.x;
                this.blocks[3].pos.y = this.pos.y + blockSize;
                this.rotationState = 0;
                break;
            case 1:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x;
                    this.blocks[i].pos.y = this.pos.y + ((i - 1) * blockSize)
                }
                this.blocks[3].pos.x = this.pos.x - blockSize;
                this.blocks[3].pos.y = this.pos.y;
                this.rotationState = 1;
                break;
            case 2:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x + ((i - 1) * blockSize);
                    this.blocks[i].pos.y = this.pos.y;
                }
                this.blocks[3].pos.x = this.pos.x;
                this.blocks[3].pos.y = this.pos.y - blockSize;
                this.rotationState = 2;
                break;
            case 3:
                for (var i = 0; i < 3; i++) {
                    this.blocks[i].pos.x = this.pos.x;
                    this.blocks[i].pos.y = this.pos.y + ((i - 1) * blockSize)
                }
                this.blocks[3].pos.x = this.pos.x + blockSize;
                this.blocks[3].pos.y = this.pos.y;
                this.rotationState = 3;
                break;
        }
    }

    this.createBar = function() {
        var blockColor = color(0, 188, 212); //Material design cyan 500
        var blockStrokeColor = color(0, 131, 143); //Material design cyan 800
        for (var i = 0; i < 4; i++) {
            this.blocks[i] = new Block(this.pos.x + ((i - 2) * blockSize), this.pos.y, blockColor, blockStrokeColor, i, this.index);
        }
    }

    this.createSquare = function() {
        var blockColor = color(255, 235, 59); //Material design yellow 500
        var blockStrokeColor = color(249, 168, 37); //Material design yellow 800
        for (var i = 0; i < 2; i++) {
            this.blocks[i] = new Block(this.pos.x + ((i - 1) * blockSize), this.pos.y - blockSize, blockColor, blockStrokeColor, i, this.index);
            this.blocks[i + 2] = new Block(this.pos.x + ((i - 1) * blockSize), this.pos.y, blockColor, blockStrokeColor, i + 2, this.index);
        }
    }

    this.createZ = function() {
        var blockColor = color(244, 67, 54); //Material design red 500
        var blockStrokeColor = color(198, 40, 40); //Material design red 800
        for (var i = 0; i < 2; i++) {
            this.blocks[i] = new Block(this.pos.x + ((i - 1) * blockSize), this.pos.y, blockColor, blockStrokeColor, i, this.index);
        }
        for (var i = 0; i < 2; i++) {
            this.blocks[i + 2] = new Block(this.pos.x + (i * blockSize), this.pos.y + blockSize, blockColor, blockStrokeColor, i + 2, this.index);
        }
    }

    this.createS = function() {
        var blockColor = color(76, 175, 80); //Material design green 500
        var blockStrokeColor = color(46, 125, 50); //Material design green 800
        for (var i = 0; i < 2; i++) {
            this.blocks[i] = new Block(this.pos.x + (i * blockSize), this.pos.y, blockColor, blockStrokeColor, i, this.index);
        }
        for (var i = 0; i < 2; i++) {
            this.blocks[i + 2] = new Block(this.pos.x + ((i - 1) * blockSize), this.pos.y + blockSize, blockColor, blockStrokeColor, i + 2, this.index);
        }
    }

    this.createL = function() {
        var blockColor = color(255, 152, 0); //Material design orange 500
        var blockStrokeColor = color(239, 108, 0); //Material design orange 800
        for (var i = 0; i < 3; i++) {
            this.blocks[i] = new Block(this.pos.x + ((i - 1) * blockSize), this.pos.y, blockColor, blockStrokeColor, i, this.index);
        }
        this.blocks[3] = new Block(this.pos.x - blockSize, this.pos.y + blockSize, blockColor, blockStrokeColor, 3, this.index);
    }

    this.createJ = function() {
        var blockColor = color(63, 81, 181); //Material design indigo 500
        var blockStrokeColor = color(40, 53, 147); //Material design indigo 800
        for (var i = 0; i < 3; i++) {
            this.blocks[i] = new Block(this.pos.x + ((i - 1) * blockSize), this.pos.y, blockColor, blockStrokeColor, i, this.index);
        }
        this.blocks[3] = new Block(this.pos.x + blockSize, this.pos.y + blockSize, blockColor, blockStrokeColor, 3, this.index);
    }

    this.createT = function() {
        var blockColor = color(103, 58, 183); //Material design deep purple 500
        var blockStrokeColor = color(69, 39, 160); //Material design deep purple 800
        for (var i = 0; i < 3; i++) {
            this.blocks[i] = new Block(this.pos.x + ((i - 1) * blockSize), this.pos.y, blockColor, blockStrokeColor, i, this.index);
        }
        this.blocks[3] = new Block(this.pos.x, this.pos.y + blockSize, blockColor, blockStrokeColor, i, this.index);
    }

    this.show = function() {
        for (var i = 0; i < 4; i++) {
            if (!this.blocks[i].ph){
                this.blocks[i].show();
            }
        }
    }

    this.hit = function() {
        for (var i = 0; i < this.blocks.length; i++) {
            if (!this.blocks[i].ph && this.blocks[i].blockHitL()) {
                this.hitLeft = true;
                break;
            }
        }
        for (var i = 0; i < this.blocks.length; i++) {
            if (!this.blocks[i].ph && this.blocks[i].blockHitR()) {
                this.hitRight = true;
                break;
            }
        }
        for (var i = 0; i < this.blocks.length; i++) {
            if (!this.blocks[i].ph && this.blocks[i].blockHitB()) {
                this.hitBottom = true;
                break;
            }
            else {
                this.hitBottom = false;
            }
        }
    }

    switch (type) {
        case 0:
            this.createBar();
            break;
        case 1:
            this.createSquare();
            break;
        case 2:
            this.createZ();
            break;
        case 3:
            this.createS();
            break;
        case 4:
            this.createL();
            break;
        case 5:
            this.createJ();
            break;
        case 6:
            this.createT();
            break;
    }
}
