import { executeCommandUntilSuccessful } from './excute-command-until-successful';

export async function executeCommandsUntilSuccessful(commands: string[], dryRun = false): Promise<string[]> {
    return Promise.all(commands.map(command => executeCommandUntilSuccessful(command, dryRun)));
}
