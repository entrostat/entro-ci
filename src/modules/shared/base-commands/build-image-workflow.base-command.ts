import { buildDockerImage } from '../helpers/docker/build-docker-image';
import { pushDockerImage } from '../helpers/docker/push-docker-image';
import { getHashValue } from '../helpers/entro-hash/get-hash-value';
import { BaseCommand } from './base-command';
import { setHashValue } from '../helpers/entro-hash/set-hash-value';

export abstract class BuildImageWorkflowBaseCommand extends BaseCommand {
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

        await setHashValue(
            hash,
            {
                hash: true,
                imageName: flags['image-name'],
            },
            await this.getConfig(),
        );
    }

    private async assertDoesNotExist(flags: any, hash: string) {
        const exists = await getHashValue(hash, await this.getConfig());

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
