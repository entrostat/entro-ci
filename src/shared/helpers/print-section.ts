import { Logger } from '../interfaces/logger';

export function printSection(heading: string, log: Logger) {
    log('');
    log('');
    log('-'.repeat(process.stdout.columns || 30));
    log(heading);
    log('-'.repeat(process.stdout.columns || 30));
    log('');
}
