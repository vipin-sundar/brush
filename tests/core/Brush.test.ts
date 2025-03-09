import { Brush } from '../../src/core/Brush';
describe('Brush', () => {
    let brush: Brush;

    beforeEach(() => {
        brush = new Brush();
        document.createElement = jest.fn().mockReturnValue({
            getContext: jest.fn().mockReturnValue({
                fillRect: jest.fn(),
                clearRect: jest.fn(),
                beginPath: jest.fn(),
                rect: jest.fn(),
                fill: jest.fn()
            }),
            appendChild: jest.fn(),
            width: 0,
            height: 0
        });
        document.querySelector = jest.fn().mockReturnValue(document.createElement('div'));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createCanvas', () => {
        it('should create a canvas with specified dimensions', () => {
            const width = 800;
            const height = 600;
            const canvas = brush.createCanvas(width, height);

            expect(document.createElement).toHaveBeenCalledWith('canvas');
            expect(canvas.width).toBe(width);
            expect(canvas.height).toBe(height);
        });

        it('should set optional id and className if provided', () => {
            const canvas = brush.createCanvas(800, 600, {
                id: 'testCanvas',
                className: 'canvas-class'
            });

            expect(canvas.id).toBe('testCanvas');
            expect(canvas.className).toBe('canvas-class');
        });

        it('should append canvas to specified container', () => {
            const mockContainer = document.createElement('div');
            mockContainer.appendChild = jest.fn();

            brush.createCanvas(800, 600, { container: mockContainer });

            expect(mockContainer.appendChild).toHaveBeenCalled();
        });

        it('should throw error if container is not found', () => {
            document.querySelector = jest.fn().mockReturnValue(null);

            expect(() => {
                brush.createCanvas(800, 600, { container: '#nonexistent' });
            }).toThrow('Container element not found');
        });
    });

    describe('background', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.background('red');
            }).toThrow('Renderer not initialized');
        });

        it('should set background color when renderer is initialized', () => {
            const canvas = brush.createCanvas(800, 600);
            expect(() => {
                brush.background('red');
            }).not.toThrow();
        });
    });

    describe('start', () => {
        it('should throw error if setup function is not defined', () => {
            expect(() => {
                brush.start();
            }).toThrow('Setup function not defined');
        });

        it('should start animation loop with default parameters', () => {
            brush.createCanvas(800, 600);
            brush.setup = jest.fn();
            brush.draw = jest.fn();

            brush.start();

            expect(brush.setup).toHaveBeenCalled();
        });

        it('should throw error if draw function is not defined', () => {
            brush.createCanvas(800, 600);
            brush.setup = jest.fn();
            brush.draw = null;

            brush.start();

            const loopInstance = (brush as any).loop;
            const drawCallback = (loopInstance as any).drawCallback;

            expect(() => {
                drawCallback();
            }).toThrow('Draw function is not defined');
        });

        it('should use default frameRate and updatesPerFrame', () => {
            brush.createCanvas(800, 600);
            brush.setup = jest.fn();
            brush.draw = jest.fn();

            brush.start();

            const loopInstance = (brush as any).loop;
            expect(loopInstance.frameRate).toBe(60);
            expect(loopInstance.updatesPerFrame).toBe(1);
        });

        it('should use custom frameRate and updatesPerFrame', () => {
            brush.createCanvas(800, 600);
            brush.setup = jest.fn();
            brush.draw = jest.fn();

            brush.start(30, 2);

            const loopInstance = (brush as any).loop;
            expect(loopInstance.frameRate).toBe(30);
            expect(loopInstance.updatesPerFrame).toBe(2);
        });
    });
});