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
    rect(x: number, y: number, width: number, height: number) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fill();
    }
    /**
     * @description This method updates the `fillStyle` property of the canvas rendering context.
     * @param color - The color to set as the fill style.
     */
    fill(color: string) {
        this.ctx.fillStyle = color;
    }
}
export default Renderer;