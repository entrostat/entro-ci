import { singleton } from 'tsyringe';

export interface LoggerType {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}

@singleton()
export class Logger {
    log = (...args: any[]) => console.log(...args);
    error = (...args: any[]) => console.error(...args);
    warn = (...args: any[]) => console.warn(...args);

    extractLoggers(logger: LoggerType) {
        this.log = logger.log;
        this.error = logger.error;
        this.warn = logger.warn;
    }
}
