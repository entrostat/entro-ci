import { BaseCommand } from './base-command';
import { buildDockerImage } from '../helpers/docker/build-docker-image';
import { pushDockerImage } from '../helpers/docker/push-docker-image';
import { generateDockerImageName } from '../helpers/docker/docker-image-name-builder';
import { pullDockerImage } from '../helpers/docker/pull-docker-image';
import { container } from 'tsyringe';
import { BuildArtefactService, BuildTrigger } from '../services/build-artefact.service';
import { packageJsonVersion } from '../helpers/package-json-version';

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

    // The path to the package.json file that has the version of the project
    // that we're building.
    package: string;
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
        const buildArtifactService = container.resolve(BuildArtefactService);
        const exists = await this.dockerImageExists(hash, flags);
        const projectVersion = `${flags.tag}-${await packageJsonVersion(flags.package)}`;
        if (exists) {
            const versionExists = await this.dockerImageExists(flags.tag, flags);
            if (versionExists) {
                await buildArtifactService.addBuild(flags.imageName, BuildTrigger.exists);
            } else {
                await buildArtifactService.addBuild(flags.imageName, BuildTrigger.hashExists);
            }
            // If it exists, we don't need to build it again but we should push
            //  it to its new tag.
            const existingImageName = generateDockerImageName(flags.imageName, hash, flags.registry);
            await pushDockerImage({
                localImageName: existingImageName,
                imageName: flags.imageName,
                tags: [flags.tag, projectVersion, `${flags.tag}-latest`],
                registry: flags.registry,
                dryRun: flags.dryRun,
            });
            return;
        }
        // Build the image locally
        const localImageName = await buildDockerImage({
            directory,
            imageName: flags.imageName,
            dryRun: flags.dryRun,
            dockerFileName: flags.dockerFileName,
        });

        // Push the image to the registry
        await pushDockerImage({
            localImageName,
            tags: this.getTags(hash, flags).concat([projectVersion, `${flags.tag}-latest`]),
            imageName: flags.imageName,
            registry: flags.registry,
            dryRun: flags.dryRun,
        });

        await buildArtifactService.addBuild(flags.imageName, BuildTrigger.new);
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

    /**
     * Check if the docker image has been built before
     * @param hash The hash that should be attached to the image
     * @param flags The flags for the build
     * @private
     */
    private async dockerImageExists(hash: string, flags: BuildFromHashFlags) {
        const dockerImageName = generateDockerImageName(flags.imageName, hash, flags.registry);
        this.log(`Checking for ${dockerImageName}`);
        try {
            await pullDockerImage(hash, flags.imageName, flags.registry, flags.dryRun);
            this.log(`The docker image ${dockerImageName} has already been built before!`);
            return true;
        } catch (e) {
            this.log(`The docker image ${dockerImageName} has NOT been built before!`);
            return false;
        }
    }
}
