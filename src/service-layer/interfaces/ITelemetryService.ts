export interface ITelemetryService {
    // Counting stuff
    increment(name: string, delta?: number): void;
    decrement(name: string, delta?: number): void;
    counter(name: string, delta: number): void;

    // Gauges (Sends an arbitrary number to the back-end)
    gauge(name: string, value: number): void;
    gaugeDelta(name: string, delta: number): void;
    
    // Sets (Send unique occurrences of events between flushes to the back-end)
    set(name: string, value: number): void;

    // Timings
    timing(name: string, timer: Date): void;
}