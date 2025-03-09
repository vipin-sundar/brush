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
}
export default Renderer;