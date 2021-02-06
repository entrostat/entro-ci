import { container } from 'tsyringe';
import { Logger } from '../services/logger';

export function printHeading(heading: string) {
    const logger = container.resolve(Logger);
    logger.log('='.repeat(process.stdout.columns || 30));
    logger.log('');
    logger.log(heading);
    logger.log('');
    logger.log('='.repeat(process.stdout.columns || 30));
    logger.log('');
}
