import { Logger } from '../interfaces/logger';

export function printHeading(heading: string, log: Logger) {
    log('='.repeat(process.stdout.columns || 30));
    log('');
    log(heading);
    log('');
    log('='.repeat(process.stdout.columns || 30));
    log('');
}
