import { Command, flags } from '@oclif/command';
import { hashDirectory } from '../../modules/shared/helpers/hash-directory';

export default class DockerBuild extends Command {
    static description =
        'Checks if the Docker image has been built before and if it has not then it will build it and push it with the' +
        ' hash to the Docker registry';

    static flags = {
        directory: flags.string({
            char: 'd',
            required: true,
            description: 'The path to the directory that you want to build',
        }),
        'image-name': flags.string({
            char: 'i',
            required: true,
            description:
                'The name of the Docker image name without the version on it, eg: entrostat/entro-ci is correct and' +
                ' entrostat/entro-ci:latest is not valid',
        }),
        'docker-file-name': flags.string({
            char: 'f',
            default: 'Dockerfile',
            description: 'The name of the Docker file in the directory',
        }),
        registry: flags.string({
            char: 'r',
            description: 'The registry that should be used (by default Docker Hub is used)',
        }),
    };

    static args = [];

    async run() {
        const { args, flags } = this.parse(DockerBuild);

        const hash = await hashDirectory(flags.directory, this.log, this.error);
    }
}
