import { executeCommand } from '../execute-command';

export async function dockerLogin(username: string, password: string): Promise<boolean> {
    try {
        await executeCommand(`docker login -u "${username}" -p "${password}"`, false);
        return true;
    } catch (e) {
        return false;
    }
}
