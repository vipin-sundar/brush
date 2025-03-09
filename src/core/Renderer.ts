class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    /**
     * Creates an instance of the `Renderer` class.
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
}
export default Renderer;