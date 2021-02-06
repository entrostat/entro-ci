import Command from '@oclif/command';
import * as fs from 'fs-extra';
import * as path from 'path';
import { IConfig } from '@oclif/config';
import { container } from 'tsyringe';
import { Logger } from '../services/logger';
import { BuildArtefactService } from '../services/build-artefact.service';

export abstract class BaseCommand extends Command {
    constructor(argv: string[], config: IConfig) {
        super(argv, config);
        this.initServices();
    }

    async initServices() {
        const logger = container.resolve(Logger);
        logger.extractLoggers(this);

        const buildArtifactService = container.resolve(BuildArtefactService);
        buildArtifactService.setConfigDirectory(this.config.configDir);
    }

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
