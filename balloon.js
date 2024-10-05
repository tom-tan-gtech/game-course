function createBalloon(canvasContext, minX, maxX) {
    return {
        canvasContext: canvasContext,
        xPos: 20, //random between minX, maxX
        diameter: 40, //10-100 px
        yPos: 0,
        fallSpeed: 10, //10-100 px/sec
        color: "black",

        isClicked(evt) {
            return false;
        },

        move() {
            this.yPos += this.fallSpeed;
        },
        draw() {
            canvasContext.fillStyle = this.color;
            canvasContext.beginPath();
            canvasContext.arc(this.xPos, this.yPos, this.diameter / 2, 0, Math.PI * 2, true);
        }
    }
}

export { createBalloon }