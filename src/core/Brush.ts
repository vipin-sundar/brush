import Renderer from "./Renderer";
import Loop from "./Loop";
import EventHandler from "./EventHandler";

export class Brush extends EventHandler {
    protected canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private renderer: Renderer | null = null;
    public setup: (() => void) | null = null;
    public draw: (() => void) | null = null;
    private loop: Loop | null;

    constructor() {
        super(null);
        this.canvas = null;
        this.ctx = null;
        this.renderer = null;
        this.setup = null;
        this.draw = null;
        this.loop = null;
    }
    /**
     * @description Creates a new canvas element and appends it to the DOM.
     * @param {number} width - The width of the canvas.
     * @param {number} height - The height of the canvas.
     * @param {object} [options] - Optional parameters.
     * @returns {HTMLCanvasElement} The created canvas element.
     */
    createCanvas(width: number, height: number, options?: {
        container?: HTMLElement | string;
        id?: string;
        className?: string;
    }): HTMLCanvasElement {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;

        if (options?.id) {
            this.canvas.id = options.id;
        }
        if (options?.className) {
            this.canvas.className = options.className;
        }

        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!this.ctx) {
            throw new Error('Failed to get 2D context');
        }

        this.renderer = new Renderer(this.canvas);
        if (options?.container) {
            const mountElement = typeof options.container === 'string'
                ? document.querySelector(options.container)
                : options.container;
            if (!mountElement) {
                throw new Error('Container element not found');
            }
            mountElement.appendChild(this.canvas);
        }
        return this.canvas;
    }
    /**
     * @description Sets the background color of the canvas.
     * @param {string} color - The color to set as the background.
     */
    background(color: string): void {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.background(color);
    }
    /**
    * @description Draws a filled rectangle on the canvas at the specified position.
    * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
    * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
    * @param {number} width - The width of the rectangle.
    * @param {number} height - The height of the rectangle. 
     */
    rect(x: number, y: number, width: number, height: number, applyStroke: boolean = false) {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.rect(x, y, width, height, applyStroke)
    }
    /**
     * @description Draws a filled square on the canvas at the specified position.
     * @param x - The x-coordinate of the top-left corner of the rectangle.
     * @param y - The y-coordinate of the top-left corner of the rectangle.
     * @param size - The size (width and height) of the square.
     */
    square(x: number, y: number, size: number, applyStroke: boolean = false) {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.rect(x, y, size, size, applyStroke)
    }
    /**
    * @description Draws a filled ellipse on the canvas at the specified position and dimensions.
    * @param {number} x - The x-coordinate of the center of the ellipse.
    * @param {number} y - The y-coordinate of the center of the ellipse.
    * @param {number} width - The width of the ellipse.
    * @param {number} height - The height of the ellipse.
    */
    ellipse(x: number, y: number, width: number, height: number) {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.ellipse(x, y, width, height)
    }
    /**
    * @description Draws a filled circle on the canvas at the specified position and radius.
    * @param {number} x - The x-coordinate of the center of the circle.
    * @param {number} y - The y-coordinate of the center of the circle.
    * @param {number} radius - The radius of circle.
    */
    circle(x: number, y: number, radius: number) {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.ellipse(x, y, radius, radius)
    }
    /**
     * @description Draws a line on the canvas from the starting point to the ending point.
     * @param {number} startX - The x-coordinate of the starting point.
     * @param {number} startY - The y-coordinate of the starting point.
     * @param {number} endX - The x-coordinate of the ending point.
     * @param {number} endY - The y-coordinate of the ending point.
     */
    line(startX: number, startY: number, endX: number, endY: number) {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.line(startX, startY, endX, endY)
        this.stroke();
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
    text(text: string, x: number, y: number, fontFamily: string = 'Arial', textAlign: CanvasTextAlign = 'left', fontSize = 16) {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.text(text, x, y, fontFamily, textAlign, fontSize);
    }
    /**
     * @description This method updates the `fillStyle` property of the canvas rendering context.
     * @param color - The color to set as the fill style.
     */
    fill(color: string) {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.fill(color)
    }
    /**
     * @description This method updates the `strokeStyle` property of the canvas rendering context to the current fill style.
     */
    stroke() {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.stroke()
    }
    /**
     * @description Sets the stroke color for subsequent drawing operations.
     * @param {string} color - The color to set as the stroke style.
     */
    strokeColor(color: string) {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.strokeColor(color);
    }
    /**
    * @description Sets the stroke weight (line width) for subsequent drawing operations.
    * @param {number} weight - The thickness of the stroke in pixels.
    */
    strokeWeight(weight: number) {
        if (!this.renderer) {
            throw new Error('Renderer not initialized');
        }
        this.renderer.strokeWeight(weight);
    }
    /**
     * @description Method to start the canvas rendering.
     * @param {number} frameRate - The frame rate of canvas draw.
     * @param {number} updatesPerFrame - Number of updates in each frame.
     */
    start(frameRate: number = 60, updatesPerFrame: number = 1): void {
        if (!this.setup) {
            throw new Error('Setup function not defined');
        }
        this.setup();
        this.loop = new Loop(() => {
            if (!this.draw) {
                throw new Error('Draw function is not defined')
            }
            this.draw()
        }, frameRate, updatesPerFrame);
        this.loop.start()
    }
}