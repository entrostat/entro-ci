import { Command } from '@oclif/command';
import { buildDockerImage } from '../helpers/docker/build-docker-image';
import { pushDockerImage } from '../helpers/docker/push-docker-image';
import { dockerImageExists } from '../helpers/docker/docker-image-exists';

export abstract class BuildImageWorkflowBaseCommand extends Command {
    async buildFromHash(hash: string, directory: string, flags: any) {
        await this.assertDoesNotExist(flags, hash);
        this.log(`The image was not found in the registry, building the image now...`);

        const localImageName = await buildDockerImage(
            directory,
            flags['image-name'],
            this.log,
            this.warn,
            flags['docker-file-name'],
            flags.registry,
            flags['dry-run'],
        );

        const tags = this.getTags(hash, flags);

        await pushDockerImage(
            localImageName,
            tags,
            flags['image-name'],
            this.log,
            this.warn,
            flags['dry-run'],
            flags.registry,
        );
    }

    private async assertDoesNotExist(flags: any, hash: string) {
        const exists = await dockerImageExists(flags['image-name'], hash, this.log, this.warn, flags.registry);

        if (exists) {
            this.log(`The image already exists, there is no need to build it again!`);
            this.exit(0);
        }
    }

    private getTags(hash: string, flags: any) {
        const tags = [hash];
        if (flags['tag']) {
            tags.push(flags['tag']);
        }
        return tags;
    }
}
