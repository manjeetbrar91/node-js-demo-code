import { ITelemetryService } from '../interfaces/ITelemetryService';
import { Config } from '../../config/Config';
import { logger } from '../../logs';

var SDC = require('statsd-client')

// See documentation here https://github.com/msiebuhr/node-statsd-client
export class TelemetryService implements ITelemetryService {
    private client: any;

    constructor() {
        this.init();
    }

    private init(): void {
        if (this.isEnabled()) {
            this.client = new SDC({
                host: Config.getInstance().getStatsHost(),
                port: Config.getInstance().getStatsPort(),
                socketTimeout: 0  // don't close socket in case of inactivity
            });
        }
    }

    private isEnabled(): boolean {
        return Config.getInstance().isTelemetryEnabled();
    }

    public increment(name: string, delta: number = 1): void {
        if (this.isEnabled()) {
            this.client.increment(name, delta);
        }
        logger.info("[telemetry] increment name: %s delta: %s", name, delta);
    }

    public decrement(name: string, delta: number = -1): void {
        if (this.isEnabled()) {
            this.client.decrement(name, delta);
        }
        logger.info("[telemetry] decrement name: %s delta: %s", name, delta);
    }

    public counter(name: string, delta: number): void {
        if (this.isEnabled()) {
            this.client.counter(name, delta);
        }
        logger.info("[telemetry] counter name: %s delta: %s", name, delta);
    }

    public gauge(name: string, value: number): void {
        if (this.isEnabled()) {
            this.client.gauge(name, value);
        }
        logger.info("[telemetry] gauge name: %s value: %s", name, value);
    }

    public gaugeDelta(name: string, delta: number): void {
        if (this.isEnabled()) {
            this.client.gaugeDelta(name, delta);
        }
        logger.info("[telemetry] gaugeDelta name: %s delta: %s", name, delta);
    }

    public set(name: string, value: number): void {
        if (this.isEnabled()) {
            this.client.set(name, value);
        }
        logger.info("[telemetry] set name: %s value: %s", name, value);
    }

    public timing(name: string, timer: Date): void {
        if (this.isEnabled()) {
            this.client.timing(name, timer);
        }
        logger.info("[telemetry] timing name: %s time: %s", name, new Date().getTime() - timer.getTime());
    }
}    