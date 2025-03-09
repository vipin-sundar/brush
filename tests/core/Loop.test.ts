import Loop from '../../src/core/Loop';

describe('Loop', () => {
    let mockDrawCallback: jest.Mock;
    let loop: Loop;

    beforeEach(() => {
        mockDrawCallback = jest.fn();
        loop = new Loop(mockDrawCallback, 60, 1);
    });

    afterEach(() => {
        loop.stop();
    });
    test('should stop the loop and prevent further draw callbacks', () => {
        jest.useFakeTimers();

        loop.start();

        jest.advanceTimersByTime(16.67);
        expect(mockDrawCallback).toHaveBeenCalledTimes(1);

        loop.stop();

        jest.advanceTimersByTime(16.67);
        expect(mockDrawCallback).toHaveBeenCalledTimes(1); // No additional calls after stop

        jest.useRealTimers();
    });

    test('should call the draw callback multiple times per frame if updatesPerFrame > 1', () => {
        jest.useFakeTimers();

        const updatesPerFrame = 3;
        loop = new Loop(mockDrawCallback, 60, updatesPerFrame);

        loop.start();

        jest.advanceTimersByTime(16.67);

        expect(mockDrawCallback).toHaveBeenCalledTimes(updatesPerFrame);

        jest.useRealTimers();
    });

    test('should not call the draw callback if not enough time has passed', () => {
        jest.useFakeTimers();

        loop.start();

        jest.advanceTimersByTime(10);

        expect(mockDrawCallback).not.toHaveBeenCalled();

        jest.useRealTimers();
    });
});