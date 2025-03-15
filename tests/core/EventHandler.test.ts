import EventHandler from "../../src/core/EventHandler";
describe('EventHandler', () => {
    let canvas: HTMLCanvasElement;
    let eventHandler: EventHandler;

    beforeEach(() => {
        canvas = document.createElement('canvas');
        eventHandler = new EventHandler(canvas);
    });

    describe('onMouseClick', () => {
        it('should call the callback with correct coordinates on mouse click', () => {
            const callback = jest.fn();
            eventHandler.onMouseClick(callback);

            const rect = canvas.getBoundingClientRect();
            const clientX = rect.left + 10;
            const clientY = rect.top + 20;

            const event = new MouseEvent('mousedown', {
                clientX,
                clientY,
            });

            canvas.dispatchEvent(event);

            expect(callback).toHaveBeenCalledWith(10, 20);
        });

        it('should throw an error if canvas is not initialized', () => {
            const nullEventHandler = new EventHandler(null);
            expect(() => nullEventHandler.onMouseClick(jest.fn())).toThrow('Canvas not initialized');
        });

        it('should throw an error if canvas bounding rect is undefined', () => {
            jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue(null as any);
            expect(() => eventHandler.onMouseClick(jest.fn())).toThrow('Canvas bounding rect is undefined');
        });
    });

    describe('onMouseMove', () => {
        it('should call the callback with correct coordinates on mouse move', () => {
            const callback = jest.fn();
            eventHandler.onMouseMove(callback);

            const rect = canvas.getBoundingClientRect();
            const clientX = rect.left + 15;
            const clientY = rect.top + 25;

            const event = new MouseEvent('mousemove', {
                clientX,
                clientY,
            });

            canvas.dispatchEvent(event);

            expect(callback).toHaveBeenCalledWith(15, 25);
        });

        it('should throw an error if canvas is not initialized', () => {
            const nullEventHandler = new EventHandler(null);
            expect(() => nullEventHandler.onMouseMove(jest.fn())).toThrow('Canvas not initialized');
        });

        it('should throw an error if canvas bounding rect is undefined', () => {
            jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue(null as any);
            expect(() => eventHandler.onMouseMove(jest.fn())).toThrow('Canvas bounding rect is undefined');
        });
    });

    describe('onMouseRelease', () => {
        it('should call the callback with correct coordinates on mouse release', () => {
            const callback = jest.fn();
            eventHandler.onMouseRelease(callback);

            const rect = canvas.getBoundingClientRect();
            const clientX = rect.left + 30;
            const clientY = rect.top + 40;

            const event = new MouseEvent('mouseup', {
                clientX,
                clientY,
            });

            canvas.dispatchEvent(event);

            expect(callback).toHaveBeenCalledWith(30, 40);
        });

        it('should throw an error if canvas is not initialized', () => {
            const nullEventHandler = new EventHandler(null);
            expect(() => nullEventHandler.onMouseRelease(jest.fn())).toThrow('Canvas not initialized');
        });

        it('should throw an error if canvas bounding rect is undefined', () => {
            jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue(null as any);
            expect(() => eventHandler.onMouseRelease(jest.fn())).toThrow('Canvas bounding rect is undefined');
        });
    });

    describe('onMouseClickAndMove', () => {
        it('should call the callback with correct coordinates on mouse click and move', () => {
            const callback = jest.fn();
            eventHandler.onMouseClickAndMove(callback);

            const rect = canvas.getBoundingClientRect();
            const clientX = rect.left + 50;
            const clientY = rect.top + 60;

            const mousedownEvent = new MouseEvent('mousedown');
            const mousemoveEvent = new MouseEvent('mousemove', {
                clientX,
                clientY,
            });

            canvas.dispatchEvent(mousedownEvent);
            canvas.dispatchEvent(mousemoveEvent);

            expect(callback).toHaveBeenCalledWith(50, 60);
        });

        it('should remove mousemove listener on mouseup', () => {
            const callback = jest.fn();
            eventHandler.onMouseClickAndMove(callback);

            const mousedownEvent = new MouseEvent('mousedown');
            const mouseupEvent = new MouseEvent('mouseup');

            canvas.dispatchEvent(mousedownEvent);
            canvas.dispatchEvent(mouseupEvent);

            const mousemoveEvent = new MouseEvent('mousemove', {
                clientX: 100,
                clientY: 200,
            });

            canvas.dispatchEvent(mousemoveEvent);

            expect(callback).not.toHaveBeenCalledWith(100, 200);
        });

        it('should throw an error if canvas is not initialized', () => {
            const nullEventHandler = new EventHandler(null);
            expect(() => nullEventHandler.onMouseClickAndMove(jest.fn())).toThrow('Canvas not initialized');
        });

        it('should throw an error if canvas bounding rect is undefined', () => {
            jest.spyOn(canvas, 'getBoundingClientRect').mockReturnValue(null as any);
            expect(() => eventHandler.onMouseClickAndMove(jest.fn())).toThrow('Canvas bounding rect is undefined');
        });
    });

    describe('onKeyPress', () => {
        it('should call the callback with the correct key on keypress', () => {
            const callback = jest.fn();
            eventHandler.onKeyPress(callback);

            const keyEvent = new KeyboardEvent('keydown', { key: 'a' });
            window.dispatchEvent(keyEvent);

            expect(callback).toHaveBeenCalledWith('a');
        });
    });
});