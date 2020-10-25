import { executeCommand } from './execute-command';

export async function executeCommands(
    commands: string[],
    log: (message: string) => void,
    error: (message: string) => void,
    dryRun = false,
): Promise<string[]> {
    return Promise.all(
        commands.map(command => executeCommand(command, log, error, dryRun)),
    );
}
