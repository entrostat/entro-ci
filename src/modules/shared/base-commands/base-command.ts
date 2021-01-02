import Command from '@oclif/command';
import * as fs from 'fs-extra';
import * as path from 'path';

export class BaseCommand extends Command {
    async getConfig() {
        try {
            if (!(await fs.stat(this.getConfigPath()))) {
                return {};
            }
            return fs.readJson(this.getConfigPath());
        } catch (e) {
            return {};
        }
    }

    async addToConfig(data: any) {
        const originalConfig = await this.getConfig();
        const newConfig = { ...originalConfig, ...data };

        await fs.mkdirp(this.config.configDir);
        await fs.writeJson(this.getConfigPath(), newConfig);
    }

    getConfigPath() {
        return path.join(this.config.configDir, 'config.json');
    }
}
