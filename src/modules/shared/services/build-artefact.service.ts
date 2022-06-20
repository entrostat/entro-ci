import { singleton } from 'tsyringe';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Expose, plainToInstance, Type } from 'class-transformer';

export enum BuildTrigger {
    exists = 'exists',
    new = 'new',
    hashExists = 'hashExists',
}

export class ImageBuildStates {
    [imageName: string]: BuildTrigger;
}

export class BuildArtefactState {
    @Expose()
    @Type(() => ImageBuildStates)
    buildState: ImageBuildStates;
}

@singleton()
export class BuildArtefactService {
    private configDirectory: string;
    private artefactPath: string;

    setConfigDirectory(configDirectory: string) {
        this.configDirectory = configDirectory;
        this.artefactPath = path.join(this.configDirectory, 'build.json');
    }

    /**
     * Adds whether or not a build took place.
     * @param label The label (or image name) that we're setting
     * @param buildTrigger The status of this label
     */
    async addBuild(label: string, buildTrigger: BuildTrigger) {
        // Create directory if it doesn't work
        await fs.mkdirp(this.configDirectory);
        const currentArtifacts = await this.getCurrentArtefacts();
        await fs.writeJson(this.artefactPath, {
            ...currentArtifacts,
            buildState: {
                ...(currentArtifacts.buildState || {}),
                [label]: buildTrigger,
            },
        });
    }

    async getCurrentArtefacts() {
        return plainToInstance(BuildArtefactState, await this.readCurrentArtefactsFromFs());
    }

    private async readCurrentArtefactsFromFs(): Promise<object> {
        try {
            return await fs.readJson(this.artefactPath, {
                throws: false,
            });
        } catch (e) {
            return {};
        }
    }
}
