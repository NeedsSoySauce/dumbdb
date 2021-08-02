import pino from 'pino';
import { LogObject, LogLevel, LoggingProvider } from '../types/logging';

const baseLogger = pino({
    prettyPrint: true,
});

class Logger implements LoggingProvider {
    private log: pino.Logger;

    public constructor(namespace?: string) {
        if (namespace) {
            this.log = baseLogger.child({ namespace });
        } else {
            this.log = baseLogger;
        }
    }

    private write(
        level: LogLevel,
        message: string | LogObject,
        obj?: LogObject,
    ): void {
        if (typeof message === 'object') {
            this.log[level](message);
        } else {
            this.log[level]({ msg: message, ...obj });
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

    public setLevel(level: LogLevel): void {
        this.log.level = level;
    }
}

const logger = new Logger();

export { logger };
