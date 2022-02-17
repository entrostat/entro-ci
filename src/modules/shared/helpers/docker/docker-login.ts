import { executeCommand } from '../execute-command';

export async function dockerLogin(username: string, password: string, registry?: string): Promise<boolean> {
    try {
        await executeCommand(`docker login -u "${username}" -p "${password}" ${registry}`, false);
        return true;
    } catch (e) {
        return false;
    }
}
