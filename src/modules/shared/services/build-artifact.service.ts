import { container, singleton } from 'tsyringe';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Logger } from './logger';

export enum BuildTrigger {
    exists = 'exists',
    new = 'new',
    hashExists = 'hashExists',
}

@singleton()
export class BuildArtifactService {
    private configDirectory: string;
    private artifactPath: string;

    setConfigDirectory(configDirectory: string) {
        this.configDirectory = configDirectory;
        this.artifactPath = path.join(this.configDirectory, 'build.json');
    }

    /**
     * Adds whether or not a build took place.
     * @param label The label (or image name) that we're setting
     * @param buildTrigger The status of this label
     */
    async addBuild(label: string, buildTrigger: BuildTrigger) {
        // Create directory if it doesn't work
        await fs.mkdirp(this.configDirectory);
        const currentArtifacts = await this.getCurrentArtifacts();
        await fs.writeJson(this.artifactPath, {
            ...currentArtifacts,
            [label]: buildTrigger,
        });
    }

    private async getCurrentArtifacts() {
        try {
            return await fs.readJson(this.artifactPath, {
                throws: false,
            });
        } catch (e) {
            return {};
        }
    }
}
