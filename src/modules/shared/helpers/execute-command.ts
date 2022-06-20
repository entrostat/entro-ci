import { exec, spawn } from 'child_process';
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
        const myCommand = exec(command, (err, stdout, stderr) => {
            if (err) {
                return reject(stderr);
            }
            return resolve(stdout);
        });
        myCommand?.stdout?.on('data', data => logger.log(data));
        myCommand?.stderr?.on('data', data => logger.warn(data));
    });
}
