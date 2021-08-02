export enum LogLevel {
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error',
}

// For logging we accept anything and serialize as much as possible
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LogObject = Record<any, any>;

export type LogFunction = (
    message: string | LogObject,
    obj?: LogObject,
) => void;

export interface LoggingProvider {
    debug: LogFunction;
    info: LogFunction;
    warn: LogFunction;
    error: LogFunction;
    setLevel(level: LogLevel): void;
}
