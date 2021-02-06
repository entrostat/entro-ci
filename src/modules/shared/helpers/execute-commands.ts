import { executeCommand } from './execute-command';

export async function executeCommands(commands: string[], dryRun = false): Promise<string[]> {
    return Promise.all(commands.map(command => executeCommand(command, dryRun)));
}
