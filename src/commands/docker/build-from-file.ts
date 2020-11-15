import { flags } from '@oclif/command';
import { BuildImageWorkflowBaseCommand } from '../../modules/shared/base-commands/build-image-workflow.base-command';
import * as path from 'path';
import { hashFile } from '../../modules/shared/helpers/hash-file';
import { hashFiles } from '../../modules/shared/helpers/hash-files';

export default class DockerBuildFromFile extends BuildImageWorkflowBaseCommand {
    static description =
        'Checks to see if a specific Dockerfile has changed (not the contents of a directory) and builds if this is the case';

    static flags = {
        'image-name': flags.string({
            char: 'i',
            required: true,
            description:
                'The name of the Docker image name without the version on it, eg: entrostat/entro-ci is correct and' +
                ' entrostat/entro-ci:latest is not valid',
        }),
        'docker-file-path': flags.string({
            char: 'f',
            required: true,
            description: 'The path to the Docker file',
        }),
        'watch-file': flags.string({
            char: 'w',
            required: false,
            multiple: true,
            description:
                'One or more files that should be "watched" for change that fall into this Dockerfile. So it is not a whole folder but a file or two.',
        }),
        registry: flags.string({
            char: 'r',
            description: 'The registry that should be used (by default Docker Hub is used)',
        }),
        tag: flags.string({
            char: 't',
            description:
                'The tag version that should be pushed to the registry so that it can be used in automated deployments',
        }),
        'dry-run': flags.boolean({
            char: 'R',
            default: false,
            description: 'Whether to run this live or do a dry run',
        }),
    };

    static args = [];

    async run() {
        const { args, flags } = this.parse(DockerBuildFromFile);
        const filePath = path.resolve(flags['docker-file-path']);
        const watchedFilePaths = flags['watch-file'].map(file => path.resolve(file));
        const hash = watchedFilePaths.length
            ? await hashFiles(watchedFilePaths.concat([filePath]), this.log, this.error)
            : await hashFile(filePath, this.log, this.error);
        const modifiedFlags: any = flags;
        modifiedFlags['docker-file-name'] = path.basename(flags['docker-file-path']);
        await this.buildFromHash(hash, path.dirname(flags['docker-file-path']), flags);
    }
}
