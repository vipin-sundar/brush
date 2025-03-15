class EventHandler {
    protected canvas: HTMLCanvasElement | null = null;

    constructor(canvas: HTMLCanvasElement | null) {
        this.canvas = canvas;
    }

    /**
     * @description Listens for mouse click events on the canvas.
     * @param {(x: number, y: number) => void} callback - The function to call when a mouse click is detected.
     */
    onMouseClick(callback: (x: number, y: number) => void): void {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        const rect = this.canvas.getBoundingClientRect();
        if (!rect) {
            throw new Error('Canvas bounding rect is undefined');
        }
        this.canvas.addEventListener('mousedown', (event) => {
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            callback(x, y);
        });
    }

    /**
     * @description Listens for mouse movement events on the canvas.
     * @param {(x: number, y: number) => void} callback - The function to call when the mouse is moved.
     */
    onMouseMove(callback: (x: number, y: number) => void): void {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        const rect = this.canvas.getBoundingClientRect();
        if (!rect) {
            throw new Error('Canvas bounding rect is undefined');
        }
        this.canvas.addEventListener('mousemove', (event) => {
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            callback(x, y);
        });
    }

    /**
     * @description Listens for mouse release events on the canvas.
     * @param {(x: number, y: number) => void} callback - The function to call when the mouse is released.
     */
    onMouseRelease(callback: (x: number, y: number) => void): void {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        const rect = this.canvas.getBoundingClientRect();
        if (!rect) {
            throw new Error('Canvas bounding rect is undefined');
        }
        this.canvas.addEventListener('mouseup', (event) => {
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            callback(x, y);
        });
    }

    /**
     * @description Listens for mouse click and move events on the canvas.
     * @param {(x: number, y: number) => void} callback - The function to call when the mouse is clicked and moved.
     */
    onMouseClickAndMove(callback: (x: number, y: number) => void): void {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        const rect = this.canvas.getBoundingClientRect();
        if (!rect) {
            throw new Error('Canvas bounding rect is undefined');
        }

        const handleMouseMove = (event: MouseEvent) => {
            callback(event.clientX - rect.left, event.clientY - rect.top);
        };

        const handleMouseUp = () => {
            this.canvas?.removeEventListener('mousemove', handleMouseMove);
        };

        this.canvas.addEventListener('mousedown', () => {
            this.canvas?.addEventListener('mousemove', handleMouseMove);
            this.canvas?.addEventListener('mouseup', handleMouseUp, { once: true });
        });
    }

    /**
     * @description Listens for keypress events.
     * @param callback - The function to call when a key is pressed.
     */
    onKeyPress(callback: (key: string) => void): void {
        window.addEventListener('keydown', (event) => {
            callback(event.key);
        });
    }
}

export default EventHandler;