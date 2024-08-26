class TaskTimer {
  private startTime: [number, number] | null;
  private endTime: [number, number] | null;

  constructor() {
    this.startTime = process.hrtime();
    this.endTime = null;
  }

  stop(): void {
    if (!this.startTime) {
      throw new Error("Timer was not started.");
    }
    this.endTime = process.hrtime(this.startTime);
  }

  getDuration(): string {
    if (!this.endTime) {
      throw new Error("Timer has not been stopped.");
    }
    const seconds = this.endTime[0];
    const nanoseconds = this.endTime[1];
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const totalSeconds = milliseconds / 1000;
    return totalSeconds.toFixed(3) + " s";
  }

  static measure(taskFunction: () => Promise<void>): Promise<string> {
    const timer = new TaskTimer();
    return taskFunction()
      .finally(() => {
        timer.stop();
      })
      .then(() => {
        return timer.getDuration();
      });
  }
}
export default TaskTimer;
