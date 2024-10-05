function createBalloon(canvasContext, minX, maxX, minY, maxY) {
    return {
        canvasContext: canvasContext,
        createdDate: Date.now(),
        xPos: 0,
        diameter: 0, //10-100 px
        yPos: 0,
        fallSpeed: 10, //10-100 px/sec
        color: "black",
        minY: minY,
        maxY: maxY,
        isHit: false,
        value: 0,

        initialise() {
            this.diameter = this.randomInteger(10, 100);
            this.xPos = this.randomInteger(minX + this.diameter / 2, maxX - this.diameter / 2);
            this.yPos = this.minY - this.diameter / 2;
            this.value = this.calculateValue(this.diameter);
        },
        calculateValue(size) {
            // Check if size is within bounds
            if (size < 10 || size > 100) {
                throw new Error("Size must be between 10px and 100px.");
            }

            // Calculate points using the derived formula
            const points = (-1 / 10) * size + 11;
            return Math.round(points);
        },
        clicked(x, y) {
            if (this.isHit) return;

            if (this.isPointInCircle(x, y, this.xPos, this.yPos, this.diameter)) {
                this.isHit = true;
            }
            return this.isHit;
        },
        getValue() {
            return this.value;
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

            canvasContext.fillText(this.value, this.xPos - 6, this.yPos + 4);
        },
        randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}

export { createBalloon }