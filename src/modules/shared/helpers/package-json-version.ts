import * as path from 'path';
import * as fs from 'fs-extra';

export async function packageJsonVersion(filePath: string) {
    const defaultVersion = 'unknown';
    try {
        const packageJsonPath = path.resolve(filePath);
        const packageJson = await fs.readJson(packageJsonPath);
        return `v${packageJson.version}` || defaultVersion;
    } catch (e) {
        return defaultVersion;
    }
}
