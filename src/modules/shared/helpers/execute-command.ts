import { spawn } from 'child_process';
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
        const cmd = spawn(command);
        let stdout = '';
        let stderr = '';
        cmd.stdout.on('data', data => {
            logger.log(data);
            stdout += data;
        });
        cmd.stderr.on('data', data => {
            logger.warn(data);
            stderr += data;
        });
        cmd.on('error', data => {
            logger.error(data);
            reject(stderr);
        });
        cmd.on('close', code => {
            logger.log(`Completed with code ${code}`);
            resolve(stdout);
        });
    });
}
