
import { LoggingProvider, LogLevel, LogObject } from '../types/logging';

class Logger implements LoggingProvider {
    private namespace: string | null;

    public constructor(namespace?: string) {
        this.namespace = namespace ?? null;
    }

    private write(
        level: LogLevel,
        message: string | LogObject,
        obj?: LogObject,
    ): void {
        const prefix = `[${new Date().toISOString()}] ${level}:`
        if (typeof message === 'string') {
            console.log(prefix, message, obj)
        } else {
            console.log(prefix, obj)
        }
    }

    public debug(message: string | LogObject, obj?: LogObject): void {
        this.write(LogLevel.debug, message, obj);
    }

    public info(message: string | LogObject, obj?: LogObject): void {
        this.write(LogLevel.info, message, obj);
    }

    public warn(message: string | LogObject, obj?: LogObject): void {
        this.write(LogLevel.warn, message, obj);
    }

    public error(message: string | LogObject, obj?: LogObject): void {
        this.write(LogLevel.error, message, obj);
    }
}

const logger = new Logger();

export { logger };

