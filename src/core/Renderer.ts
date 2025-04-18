class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    /**
     * @description Creates an instance of the `Renderer` class.
     * @param {HTMLCanvasElement} canvas - The canvas element to associate with this renderer.
     * @throws {Error} Throws an error if the 2D context cannot be obtained from the canvas.
     */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Failed to get 2D context');
        }
        this.ctx = context;
    }
    /**
     * @description Sets the background color of the canvas.
     * @param {string} color - The color to set as the background.
     */
    background(color: string): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
    * @description Draws a filled rectangle on the canvas at the specified position.
    * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
    * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
    * @param {number} width - The width of the rectangle.
    * @param {number} height - The height of the rectangle. 
     */
    rect(x: number, y: number, width: number, height: number, applyStroke: boolean = false) {
        this.ctx.beginPath();
        const strokeWidth = this.ctx.lineWidth;
        const adjustedWidth = width - strokeWidth;
        const adjustedHeight = height - strokeWidth;
        const adjustedX = x + strokeWidth / 2;
        const adjustedY = y + strokeWidth / 2;
        if (applyStroke) {
            this.ctx.strokeRect(adjustedX, adjustedY, adjustedWidth, adjustedHeight);
            this.ctx.fillRect(adjustedX, adjustedY, adjustedWidth, adjustedHeight);
            return
        }
        this.ctx.rect(x, y, width, height);
        this.ctx.fill();
    }
    /**
    * 
    * @description Draws a filled ellipse (or circle) on the canvas at the specified position and dimensions.
    * @param {number} x - The x-coordinate of the center of the ellipse.
    * @param {number} y - The y-coordinate of the center of the ellipse.
    * @param {number} width - The width of the ellipse.
    * @param {number} height - The height of the ellipse.
    */
    ellipse(x: number, y: number, width: number, height: number) {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, width / 2, height / 2, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }
    /**
     * @description Draws a line on the canvas from the starting point to the ending point.
     * @param {number} startX - The x-coordinate of the starting point.
     * @param {number} startY - The y-coordinate of the starting point.
     * @param {number} endX - The x-coordinate of the ending point.
     * @param {number} endY - The y-coordinate of the ending point.
     */
    line(startX: number, startY: number, endX: number, endY: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
    }
    /**
     * @description Draws text on the canvas at the specified position.
     * @param {string} text - The text to draw on the canvas.
     * @param {number} x - The x-coordinate of the text.
     * @param {number} y - The y-coordinate of the text.
     * @param {string} fontFamily - The font family to use.
     * @param {CanvasTextAlign} textAlign - The alignment of the text.
     * @param {number} fontSize - The size of the font.
     */
    text(text: string, x: number, y: number, fontFamily: string, textAlign: CanvasTextAlign, fontSize: number = 16) {
        this.ctx.font = `${fontSize}px ${fontFamily}`;
        this.ctx.textAlign = textAlign;
        this.ctx.fillText(text, x, y);
    }
    /**
     * @description This method updates the `fillStyle` property of the canvas rendering context.
     * @param color - The color to set as the fill style.
     */
    fill(color: string) {
        this.ctx.fillStyle = color;
    }
    /**
     * @description This method updates the `strokeStyle` property of the canvas rendering context to the current fill style.
     */
    stroke() {
        this.ctx.stroke();
    }
    /**
     * @description Sets the stroke color for subsequent drawing operations.
     * @param {string} color - The color to set as the stroke style.
     */
    strokeColor(color: string) {
        this.ctx.strokeStyle = color;
    }
    /**
     * @description Sets the stroke weight (line width) for subsequent drawing operations.
     * @param {number} weight - The thickness of the stroke in pixels.
     */
    strokeWeight(weight: number) {
        this.ctx.lineWidth = weight;
    }
}
export default Renderer;