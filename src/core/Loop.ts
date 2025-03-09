class Loop {
    private drawCallback: () => void;
    private frameRate: number;
    private frameDelay: number;
    private updatesPerFrame: number;
    private lastTime: number;
    private loopId: number | null;

    constructor(drawCallback: () => void, frameRate: number, updatesPerFrame: number) {
        this.drawCallback = drawCallback;
        this.frameRate = frameRate;
        this.frameDelay = 1000 / frameRate;
        this.updatesPerFrame = updatesPerFrame;
        this.lastTime = 0;
        this.loopId = null;
    }

    start(): void {
        const loop = (currentTime: number): void => {
            if (currentTime - this.lastTime >= this.frameDelay) {
                for (let i = 0; i < this.updatesPerFrame; i++) {
                    this.drawCallback();
                }
                this.lastTime = currentTime;
            }
            this.loopId = requestAnimationFrame(loop);
        };
        this.loopId = requestAnimationFrame(loop);
    }

    stop(): void {
        if (this.loopId !== null) {
            cancelAnimationFrame(this.loopId);
        }
    }
}
export default Loop;