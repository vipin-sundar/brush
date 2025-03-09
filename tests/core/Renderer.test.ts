import Renderer from '../../src/core/Renderer';

describe('Renderer', () => {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let renderer: Renderer;

    beforeEach(() => {
        ctx = {
            fillStyle: '',
            fillRect: jest.fn(),
            strokeRect: jest.fn(),
            beginPath: jest.fn(),
            rect: jest.fn(),
            fill: jest.fn(),
            ellipse: jest.fn(),
            lineWidth: 1,
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            stroke: jest.fn(),
            strokeStyle: ''
        } as unknown as CanvasRenderingContext2D;

        canvas = {
            getContext: jest.fn(() => ctx),
            width: 800,
            height: 600
        } as unknown as HTMLCanvasElement;

        renderer = new Renderer(canvas);
    });

    describe('constructor', () => {
        it('should create renderer successfully with valid canvas', () => {
            expect(renderer).toBeInstanceOf(Renderer);
        });

        it('should throw error if context cannot be obtained', () => {
            const invalidCanvas = {
                getContext: jest.fn(() => null)
            } as unknown as HTMLCanvasElement;

            expect(() => new Renderer(invalidCanvas)).toThrow('Failed to get 2D context');
        });
    });

    describe('background', () => {
        it('should set background color correctly', () => {
            const color = '#fff';
            renderer.background(color);
            expect(ctx.fillStyle).toBe(color);
            expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);
        });
    });

    describe('rect', () => {
        it('should draw rectangle with correct parameters', () => {
            const x = 10, y = 20, width = 30, height = 40;
            renderer.rect(x, y, width, height);
            expect(ctx.beginPath).toHaveBeenCalled();
            expect(ctx.rect).toHaveBeenCalledWith(x, y, width, height);
            expect(ctx.fill).toHaveBeenCalled();
        });
        it('should draw rectangle with correct parameters when stroke is true', () => {
            const x = 10, y = 20, width = 30, height = 40, applyStroke = true;
            const strokeWidth = 1; // Use fixed value since we know lineWidth is 1
            const adjustedX = x + strokeWidth / 2;    // 10.5
            const adjustedY = y + strokeWidth / 2;    // 20.5
            const adjustedWidth = width - strokeWidth; // 29
            const adjustedHeight = height - strokeWidth; // 39

            renderer.rect(x, y, width, height, applyStroke);

            expect(ctx.beginPath).toHaveBeenCalled();
            expect(ctx.strokeRect).toHaveBeenCalledWith(adjustedX, adjustedY, adjustedWidth, adjustedHeight);
            expect(ctx.fillRect).toHaveBeenCalledWith(adjustedX, adjustedY, adjustedWidth, adjustedHeight);
        });
    });
    describe('fill', () => {
        it('should add fill color to canvas', () => {
            const color = '#F0F0F0'
            renderer.fill(color);
            expect(ctx.fillStyle).toBe(color);
        })
    });
    describe('ellipse', () => {
        it('should draw ellipse with correct parameters', () => {
            const x = 10, y = 20, width = 30, height = 40;
            renderer.ellipse(x, y, width, height);
            expect(ctx.beginPath).toHaveBeenCalled();
            expect(ctx.ellipse).toHaveBeenCalledWith(x, y, width / 2, height / 2, 0, 0, Math.PI * 2);
            expect(ctx.fill).toHaveBeenCalled();
        })
    })
    describe('strokeColor', () => {
        it('should set stroke color correctly', () => {
            const color = '#FF0000';
            renderer.strokeColor(color);
            expect(ctx.strokeStyle).toBe(color);
        });
    });

    describe('strokeWeight', () => {
        it('should set stroke weight correctly', () => {
            const weight = 5;
            renderer.strokeWeight(weight);
            expect(ctx.lineWidth).toBe(weight);
        });
    });
    describe('line', () => {
        it('should draw line with correct parameters', () => {
            const startX = 10, startY = 20, endX = 30, endY = 40;
            renderer.line(startX, startY, endX, endY);
            expect(ctx.beginPath).toHaveBeenCalled();
            expect(ctx.moveTo).toHaveBeenCalledWith(startX, startY);
            expect(ctx.lineTo).toHaveBeenCalledWith(endX, endY);
        });
    });

    describe('stroke', () => {
        it('should call stroke method on context', () => {
            renderer.stroke();
            expect(ctx.stroke).toHaveBeenCalled();
        });
    });
});