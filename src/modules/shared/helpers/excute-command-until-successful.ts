import { executeCommand } from './execute-command';
import { sleep } from './sleep';

export async function executeCommandUntilSuccessful(command: string, dryRun = false): Promise<string> {
    let count = 0;
    while (count < 1000) {
        count++;
        try {
            return await executeCommand(command, dryRun);
        } catch (err) {
            error(`Failed to run command: ${command}`);
            await sleep(1000);
        }
    }
    throw new Error(`Tried to run the command: ${command} - 1000 times and it still failed...`);
}
