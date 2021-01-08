import { buildDockerImage } from '../helpers/docker/build-docker-image';
import { pushDockerImage } from '../helpers/docker/push-docker-image';
import { getHashValue } from '../helpers/entro-hash/get-hash-value';
import { BaseCommand } from './base-command';
import { setHashValue } from '../helpers/entro-hash/set-hash-value';

export interface BuildFromHashFlags {
    imageName: string;
    dockerFileName: string;
    registry: string;
    dryRun: boolean;
    tag: string;
}

export abstract class BuildImageWorkflowBaseCommand extends BaseCommand {
    async buildFromHash(hash: string, directory: string, flags: BuildFromHashFlags) {
        await this.assertDoesNotExist(flags, hash);
        this.log(`The image was not found in the registry, building the image now...`);

        const localImageName = await buildDockerImage(
            directory,
            flags.imageName,
            this.log,
            this.warn,
            flags.dockerFileName,
            flags.registry,
            flags.dryRun,
        );

        const tags = this.getTags(hash, flags);

        await pushDockerImage(localImageName, tags, flags.imageName, this.log, this.warn, flags.dryRun, flags.registry);

        await setHashValue(
            hash,
            {
                hash: true,
                imageName: flags.imageName,
            },
            await this.getConfig(),
        );
    }

    private async assertDoesNotExist(flags: BuildFromHashFlags, hash: string) {
        const exists = await getHashValue(hash, await this.getConfig());

        if (exists) {
            this.log(`The image already exists, there is no need to build it again!`);
            this.exit(0);
        }
    }

    private getTags(hash: string, flags: BuildFromHashFlags) {
        const tags = [hash];
        if (flags.tag) {
            tags.push(flags.tag);
        }
        return tags;
    }
}
