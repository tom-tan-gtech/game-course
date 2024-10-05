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
        isHit: false,

        initialise() {
            this.diameter = this.randomInteger(10, 100);
            this.xPos = this.randomInteger(minX + this.diameter / 2, maxX - this.diameter / 2);
            this.yPos = this.minY;
        },
        clicked(x, y) {
            if (this.isPointInCircle(x, y, this.xPos, this.yPos, this.diameter)) {
                this.isHit = true;
            }
        },
        isPointInCircle(x, y, cx, cy, diameter) {
            // Calculate the radius
            const radius = diameter / 2;

            // Calculate the squared distance between the point and the center of the circle
            const dx = x - cx;
            const dy = y - cy;

            // Check if the distance squared is less than or equal to the radius squared
            return (dx * dx + dy * dy) <= (radius * radius);
        },
        isOutsideGameArea() {
            return this.yPos > maxY + this.diameter;
        },
        move() {
            this.yPos += this.fallSpeed / 30; //frames/second
        },
        draw() {
            if (this.isHit) return;

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