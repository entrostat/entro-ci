import { exec } from 'child_process';
import { container } from 'tsyringe';
import { Logger } from '../services/logger';

export async function executeCommand(command: string, dryRun = false): Promise<string> {
    const logger = container.resolve(Logger);
    if (dryRun) {
        logger.log(command);
        return '';
    }
    return new Promise((resolve, reject) => {
        logger.log(`${command}`);
        exec(command, (err, stdout, stderr) => {
            if (err) {
                logger.error(`An ERROR has occurred:\n${stderr}`);
                return reject(stderr);
            }
            if (stdout) {
                logger.log(stdout);
            }
            return resolve(stdout);
        });
    });
}
