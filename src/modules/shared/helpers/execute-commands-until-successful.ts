import { executeCommandUntilSuccessful } from './excute-command-until-successful';

export async function executeCommandsUntilSuccessful(
    commands: string[],
    log: (message: string) => void,
    error: (message: string) => void,
    dryRun = false,
): Promise<string[]> {
    return Promise.all(
        commands.map(command =>
            executeCommandUntilSuccessful(command, log, error, dryRun),
        ),
    );
}
