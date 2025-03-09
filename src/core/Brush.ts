import Renderer from "./Renderer";
import Loop from "./Loop";

export class Brush {
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private renderer: Renderer | null = null;
    public setup: (() => void) | null = null;
    public draw: (() => void) | null = null;
    private loop: Loop | null;

    constructor() {
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
     * @description Method to start the canvas rendering.
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