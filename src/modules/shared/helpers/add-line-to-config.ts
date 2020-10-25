import { promises as fs } from 'fs';

export async function addLineToConfig(path: string, line: string) {
    const config = await fs.readFile(path).then(d => d.toString());
    if (config.indexOf(line) > -1) {
        return;
    }
    const newConfig = `${config}\n${line}`;
    await fs.writeFile(path, newConfig);
}
