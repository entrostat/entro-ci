import { buildDockerImage } from '../helpers/docker/build-docker-image';
import { pushDockerImage } from '../helpers/docker/push-docker-image';
import { getHashValue } from '../helpers/entro-hash/get-hash-value';
import { BaseCommand } from './base-command';
import { setHashValue } from '../helpers/entro-hash/set-hash-value';
import { generateDockerImageName } from '../helpers/docker/docker-image-name-builder';
import { pullDockerImage } from '../helpers/docker/pull-docker-image';

export interface BuildFromHashFlags {
    // The name of the image that is pushed to the registry
    imageName: string;

    // The docker file name (default: Dockerfile)
    dockerFileName: string;

    // The docker registry where the docker image is pushed
    registry: string;

    // Whether we're just doing a test run or if we're running this live
    dryRun: boolean;

    // The tag attached to the image, eg. 'stable', 'latest', 'abc'
    tag: string;
}

export abstract class BuildImageWorkflowBaseCommand extends BaseCommand {
    /**
     * Builds the docker image based on the hash that we've sent in. We look to
     * see if it has been built before we try to build it again (to save time)
     * @param hash The hash of the folder or directory that we are looking to
     * build
     * @param directory The directory where the Dockerfile is stored
     * @param flags The flags required during the build process
     */
    async buildFromHash(hash: string, directory: string, flags: BuildFromHashFlags) {
        const baseBuild = await this.checkBaseHashAndBuild(hash, directory, flags);
        await this.checkAndPushHashWithImageName(hash, directory, flags, baseBuild.builtLocally);
    }

    /**
     * Checks the main hash and only builds the image if the base hash doesn't
     * exit
     * @param hash The base hash that we're checking
     * @param directory The directory where Dockerfile is
     * @param flags The flags for the build process
     * @private
     */
    private async checkBaseHashAndBuild(hash: string, directory: string, flags: BuildFromHashFlags) {
        const exists = await getHashValue(hash, await this.getConfig());
        if (exists) {
            // If it already exists, there is no need to build it again, we
            // don't pull the image unless we need it for the tags
            this.log(`The image already exists, there is no need to build it again!`);
            return {
                builtLocally: false,
                localImageName: generateDockerImageName(flags.imageName, 'local-build'),
            };
        }

        // Build the image locally
        const localImageName = await buildDockerImage(
            directory,
            flags.imageName,
            flags.dockerFileName,
            flags.registry,
            flags.dryRun,
        );

        // Push the image to the registry
        await pushDockerImage(localImageName, this.getTags(hash, flags), flags.imageName, flags.dryRun, flags.registry);

        // Set the hash now that it has been built
        await setHashValue(
            hash,
            {
                hash: true,
                imageName: flags.imageName,
            },
            await this.getConfig(),
        );

        return {
            builtLocally: true,
            localImageName,
        };
    }

    /**
     * Sometimes, we need to push the base to all image names even if the base
     * hash has already been built
     * @param hash The hash that we're looking for
     * @param directory The directory with the Dockerfile
     * @param flags The flags for the build process
     * @param baseBuiltLocally Whether or not the base was already built in
     * this process or if it needs to be pulled
     * @private
     */
    private async checkAndPushHashWithImageName(
        hash: string,
        directory: string,
        flags: BuildFromHashFlags,
        baseBuiltLocally: boolean,
    ) {
        const imageHash = `${flags.imageName}-${hash}`;
        const exists = await getHashValue(imageHash, await this.getConfig());
        if (exists) {
            // There's nothing to do from this point
            this.log(`The image ${flags.imageName}, there is no need to build it again!`);
            return;
        }
        if (!baseBuiltLocally) {
            try {
                // This was built before, we just need to pull it so that we can
                // push it under a different image name
                this.log(`Pulling the base image from the registry`);
                await pullDockerImage(hash, flags.imageName, flags.registry, flags.dryRun);
            } catch (e) {
                this.log(`Failed to pull the image so we'll just build it!`);
            }
        }
        const baseImageName = generateDockerImageName(flags.imageName, hash, flags.registry);
        await pushDockerImage(baseImageName, this.getTags(hash, flags), flags.imageName, flags.dryRun, flags.registry);
        await setHashValue(
            imageHash,
            {
                hash: true,
                imageName: flags.imageName,
            },
            await this.getConfig(),
        );
        this.log(`Pushed the base image to ${flags.imageName}`);
    }

    /**
     * Returns the tag with the hash and a tag specified in the CLI (optional)
     * @param hash The base hash
     * @param flags The flags during the build process
     * @private
     */
    private getTags(hash: string, flags: BuildFromHashFlags) {
        const tags = [hash];
        if (flags.tag) {
            tags.push(flags.tag);
        }
        return tags;
    }
}
