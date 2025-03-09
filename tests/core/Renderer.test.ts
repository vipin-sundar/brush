import Renderer from '../../src/core/Renderer';

describe('Renderer', () => {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let renderer: Renderer;

    beforeEach(() => {
        ctx = {
            fillStyle: '',
            fillRect: jest.fn(),
            beginPath: jest.fn(),
            rect: jest.fn(),
            fill: jest.fn()
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
    });
});