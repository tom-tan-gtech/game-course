function createBalloon(canvasContext, minX, maxX, minY, maxY) {
    return {
        canvasContext: canvasContext,
        createdDate: Date.now(),
        xPos: 0,
        diameter: 0, //10-100 px
        yPos: 0,
        fallSpeed: 100, //10-100 px/sec
        color: "black",
        minY: minY,
        maxY: maxY,

        initialise() {
            this.diameter = this.randomInteger(10, 100);
            this.xPos = this.randomInteger(minX, maxX);
            this.yPos = this.minY + this.diameter / 2;
        },
        isClicked(evt) {
            return false;
        },

        move() {
            this.yPos += this.fallSpeed / 30; //frames/second
        },
        draw() {
            canvasContext.fillStyle = this.color;
            canvasContext.beginPath();
            canvasContext.arc(this.xPos, this.yPos, this.diameter / 2, 0, Math.PI * 2, true);
            canvasContext.stroke();
        },
        randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}

export { createBalloon }