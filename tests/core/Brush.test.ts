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
                fill: jest.fn(),
                ellipse: jest.fn(),
            }),
            appendChild: jest.fn(),
            width: 0,
            height: 0,
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
                className: 'canvas-class',
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

        it('should throw error if 2D context is not available', () => {
            document.createElement = jest.fn().mockReturnValue({
                getContext: jest.fn().mockReturnValue(null),
            });

            expect(() => {
                brush.createCanvas(800, 600);
            }).toThrow('Failed to get 2D context');
        });
    });

    describe('background', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.background('red');
            }).toThrow('Renderer not initialized');
        });

        it('should set background color when renderer is initialized', () => {
            brush.createCanvas(800, 600);
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

        it('should call the draw function in the animation loop', () => {
            brush.createCanvas(800, 600);
            brush.setup = jest.fn();
            brush.draw = jest.fn(); // Mock the draw function

            brush.start();

            // Simulate the loop's draw callback
            const loopInstance = (brush as any).loop;
            const drawCallback = (loopInstance as any).drawCallback;

            drawCallback(); // Manually trigger the draw callback

            expect(brush.draw).toHaveBeenCalled(); // Verify that draw was called
        });
    });

    describe('rect', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.rect(0, 0, 100, 100);
            }).toThrow('Renderer not initialized');
        });

        it('should call renderer.rect with correct parameters', () => {
            const mockRect = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.rect = mockRect;

            brush.rect(10, 20, 30, 40);

            expect(mockRect).toHaveBeenCalledWith(10, 20, 30, 40, false);
        });

        it('should allow drawing multiple rectangles', () => {
            const mockRect = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.rect = mockRect;

            brush.rect(0, 0, 100, 100);
            brush.rect(200, 200, 50, 50);

            expect(mockRect).toHaveBeenCalledTimes(2);
            expect(mockRect).toHaveBeenNthCalledWith(1, 0, 0, 100, 100, false);
            expect(mockRect).toHaveBeenNthCalledWith(2, 200, 200, 50, 50, false);
        });
    });

    describe('square', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.square(100, 100, 50);
            }).toThrow('Renderer not initialized');
        });

        it('should call renderer.rect with correct parameters for a square', () => {
            const mockRect = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.rect = mockRect;

            brush.square(100, 150, 50);

            expect(mockRect).toHaveBeenCalledWith(100, 150, 50, 50, false);
        });

        it('should allow drawing multiple squares', () => {
            const mockRect = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.rect = mockRect;

            brush.square(100, 150, 50);
            brush.square(200, 250, 60);

            expect(mockRect).toHaveBeenCalledTimes(2);
            expect(mockRect).toHaveBeenNthCalledWith(1, 100, 150, 50, 50, false);
            expect(mockRect).toHaveBeenNthCalledWith(2, 200, 250, 60, 60, false);
        });
    });

    describe('fill', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.fill('red');
            }).toThrow('Renderer not initialized');
        });

        it('should call renderer.fill with correct color', () => {
            const mockFill = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.fill = mockFill;

            brush.fill('#F0F0F0');

            expect(mockFill).toHaveBeenCalledWith('#F0F0F0');
        });

        it('should allow multiple fill calls with different colors', () => {
            const mockFill = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.fill = mockFill;

            brush.fill('red');
            brush.fill('blue');
            brush.fill('#0F0FFF');

            expect(mockFill).toHaveBeenCalledTimes(3);
            expect(mockFill).toHaveBeenNthCalledWith(1, 'red');
            expect(mockFill).toHaveBeenNthCalledWith(2, 'blue');
            expect(mockFill).toHaveBeenNthCalledWith(3, '#0F0FFF');
        });
    });

    describe('ellipse', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.ellipse(100, 100, 50, 30);
            }).toThrow('Renderer not initialized');
        });

        it('should call renderer.ellipse with correct parameters', () => {
            const mockEllipse = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.ellipse = mockEllipse;

            brush.ellipse(100, 150, 50, 30);

            expect(mockEllipse).toHaveBeenCalledWith(100, 150, 50, 30);
        });

        it('should allow drawing multiple ellipses', () => {
            const mockEllipse = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.ellipse = mockEllipse;

            brush.ellipse(100, 150, 50, 30);
            brush.ellipse(200, 250, 60, 40);

            expect(mockEllipse).toHaveBeenCalledTimes(2);
            expect(mockEllipse).toHaveBeenNthCalledWith(1, 100, 150, 50, 30);
            expect(mockEllipse).toHaveBeenNthCalledWith(2, 200, 250, 60, 40);
        });
    });

    describe('circle', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.circle(100, 100, 50);
            }).toThrow('Renderer not initialized');
        });

        it('should call renderer.ellipse with correct parameters for a circle', () => {
            const mockEllipse = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.ellipse = mockEllipse;

            brush.circle(100, 150, 50);

            expect(mockEllipse).toHaveBeenCalledWith(100, 150, 50, 50);
        });

        it('should allow drawing multiple circles', () => {
            const mockEllipse = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.ellipse = mockEllipse;

            brush.circle(100, 150, 50);
            brush.circle(200, 250, 60);

            expect(mockEllipse).toHaveBeenCalledTimes(2);
            expect(mockEllipse).toHaveBeenNthCalledWith(1, 100, 150, 50, 50);
            expect(mockEllipse).toHaveBeenNthCalledWith(2, 200, 250, 60, 60);
        });
    });
    describe('strokeColor', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.strokeColor('black');
            }).toThrow('Renderer not initialized');
        });

        it('should call renderer.strokeColor with correct color', () => {
            const mockStrokeColor = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.strokeColor = mockStrokeColor;

            brush.strokeColor('#000000');

            expect(mockStrokeColor).toHaveBeenCalledWith('#000000');
        });

        it('should allow multiple strokeColor calls with different colors', () => {
            const mockStrokeColor = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.strokeColor = mockStrokeColor;

            brush.strokeColor('black');
            brush.strokeColor('red');
            brush.strokeColor('#FF0000');

            expect(mockStrokeColor).toHaveBeenCalledTimes(3);
            expect(mockStrokeColor).toHaveBeenNthCalledWith(1, 'black');
            expect(mockStrokeColor).toHaveBeenNthCalledWith(2, 'red');
            expect(mockStrokeColor).toHaveBeenNthCalledWith(3, '#FF0000');
        });
    });

    describe('strokeWeight', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.strokeWeight(2);
            }).toThrow('Renderer not initialized');
        });

        it('should call renderer.strokeWeight with correct weight', () => {
            const mockStrokeWeight = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.strokeWeight = mockStrokeWeight;

            brush.strokeWeight(5);

            expect(mockStrokeWeight).toHaveBeenCalledWith(5);
        });

        it('should allow multiple strokeWeight calls with different values', () => {
            const mockStrokeWeight = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.strokeWeight = mockStrokeWeight;

            brush.strokeWeight(1);
            brush.strokeWeight(3);
            brush.strokeWeight(5);

            expect(mockStrokeWeight).toHaveBeenCalledTimes(3);
            expect(mockStrokeWeight).toHaveBeenNthCalledWith(1, 1);
            expect(mockStrokeWeight).toHaveBeenNthCalledWith(2, 3);
            expect(mockStrokeWeight).toHaveBeenNthCalledWith(3, 5);
        });
    });
    describe('line', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.line(0, 0, 100, 100);
            }).toThrow('Renderer not initialized');
        });

        it('should call renderer.line and stroke with correct parameters', () => {
            const mockLine = jest.fn();
            const mockStroke = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.line = mockLine;
            (brush as any).renderer.stroke = mockStroke;

            brush.line(10, 20, 30, 40);

            expect(mockLine).toHaveBeenCalledWith(10, 20, 30, 40);
            expect(mockStroke).toHaveBeenCalled();
        });

        it('should allow drawing multiple lines', () => {
            const mockLine = jest.fn();
            const mockStroke = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.line = mockLine;
            (brush as any).renderer.stroke = mockStroke;

            brush.line(0, 0, 100, 100);
            brush.line(200, 200, 300, 300);

            expect(mockLine).toHaveBeenCalledTimes(2);
            expect(mockLine).toHaveBeenNthCalledWith(1, 0, 0, 100, 100);
            expect(mockLine).toHaveBeenNthCalledWith(2, 200, 200, 300, 300);
            expect(mockStroke).toHaveBeenCalledTimes(2);
        });
    });

    describe('stroke', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.stroke();
            }).toThrow('Renderer not initialized');
        });

        it('should call renderer.stroke', () => {
            const mockStroke = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.stroke = mockStroke;

            brush.stroke();

            expect(mockStroke).toHaveBeenCalled();
        });

        it('should allow multiple stroke calls', () => {
            const mockStroke = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.stroke = mockStroke;

            brush.stroke();
            brush.stroke();
            brush.stroke();

            expect(mockStroke).toHaveBeenCalledTimes(3);
        });
    });
    describe('text', () => {
        it('should throw error if renderer is not initialized', () => {
            expect(() => {
                brush.text('Hello World', 100, 100);
            }).toThrow('Renderer not initialized');
        });

        it('should call renderer.text with default parameters', () => {
            const mockText = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.text = mockText;

            brush.text('Hello World', 100, 100);

            expect(mockText).toHaveBeenCalledWith('Hello World', 100, 100, 'Arial', 'left', 16);
        });

        it('should call renderer.text with custom parameters', () => {
            const mockText = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.text = mockText;

            brush.text('Hello World', 100, 100, 'Helvetica', 'center', 24);

            expect(mockText).toHaveBeenCalledWith('Hello World', 100, 100, 'Helvetica', 'center', 24);
        });

        it('should allow multiple text calls with different parameters', () => {
            const mockText = jest.fn();
            brush.createCanvas(800, 600);
            (brush as any).renderer.text = mockText;

            brush.text('First Text', 100, 100);
            brush.text('Second Text', 200, 200, 'Times New Roman');
            brush.text('Third Text', 300, 300, 'Helvetica', 'right', 32);

            expect(mockText).toHaveBeenCalledTimes(3);
            expect(mockText).toHaveBeenNthCalledWith(1, 'First Text', 100, 100, 'Arial', 'left', 16);
            expect(mockText).toHaveBeenNthCalledWith(2, 'Second Text', 200, 200, 'Times New Roman', 'left', 16);
            expect(mockText).toHaveBeenNthCalledWith(3, 'Third Text', 300, 300, 'Helvetica', 'right', 32);
        });
    });
});