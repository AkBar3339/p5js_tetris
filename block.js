function Block(x, y, color, strokeColor, index, figureIndex) {
    this.pos = createVector(x, y);
    this.index = index;
    this.figureIndex = figureIndex;
    this.ph = false;

    this.show = function() {
        fill(color);
        strokeWeight(2);
        stroke(strokeColor);
        rect(this.pos.x, this.pos.y, blockSize, blockSize)
    }

    this.blockHitL = function() {
        return collideLineRect(0, 0, 0, height, this.pos.x, this.pos.y, blockSize, blockSize);
    }
    this.blockHitR = function() {
        return collideLineRect(width, 0, width, height, this.pos.x, this.pos.y, blockSize, blockSize);
    }
    this.blockHitB = function() {
        return collideLineRect(0, height, width, height, this.pos.x, this.pos.y, blockSize, blockSize);
    }
}
