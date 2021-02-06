import { container } from 'tsyringe';
import { Logger } from '../services/logger';

export function printSection(heading: string) {
    const logger = container.resolve(Logger);
    logger.log('');
    logger.log('');
    logger.log('-'.repeat(process.stdout.columns || 30));
    logger.log(heading);
    logger.log('-'.repeat(process.stdout.columns || 30));
    logger.log('');
}
