import { BaseCommand } from '../../modules/shared/base-commands/base-command';
import { flags } from '@oclif/command';
import { container } from 'tsyringe';
import { BuildArtefactService, BuildTrigger } from '../../modules/shared/services/build-artefact.service';
import { executeCommand } from '../../modules/shared/helpers/execute-command';
import * as path from 'path';

export default class TriggerPostBuild extends BaseCommand {
    static description = `Trigger a script if the build with a certain image name triggered during this run`;

    static examples = [
        `entro-ci trigger:post-build --script=./scripts/deploy_prod.sh --image-name=myproject/backend`,
        `entro-ci trigger:post-build --script=./deploy_prod.sh --image-name=myproject/frontend --shell=/bin/zsh`,
        `entro-ci trigger:post-build --script=./deploy_prod.sh --image-name=myproject/backend-os --image-name=myproject/backend`,
        `entro-ci trigger:post-build --script=./deploy_prod.sh --image-name=myproject/backend-os --image-name=myproject/backend --all-true`,
    ];

    static flags = {
        'image-name': flags.string({
            char: 'i',
            description: `The image name or image names that should build in order for this to trigger. By default, the trigger works if any one of these names built.`,
            required: true,
            multiple: true,
        }),
        'all-true': flags.boolean({
            char: 'a',
            description: `Require all of the image names to have been built to trigger this.`,
            default: false,
        }),
        shell: flags.string({
            char: 'S',
            description: `The shell that should be used to trigger this script.`,
            default: '/bin/bash',
        }),
        script: flags.string({
            char: 's',
            description: `The path to the script you want to run.`,
            required: true,
        }),
    };

    static args = [];

    async run() {
        const { args, flags } = this.parse(TriggerPostBuild);
        const imageNames = flags['image-name'];
        const buildArtefactService = container.resolve(BuildArtefactService);
        const state = await buildArtefactService.getCurrentArtefacts();

        const builtImages = imageNames.map(imageName => state.buildState?.[imageName] === BuildTrigger.new);

        const shouldTrigger = flags['all-true'] ? builtImages.every(a => a) : builtImages.some(a => a);

        if (shouldTrigger) {
            this.log(`Changes have been made and this script is being triggered!`);
        } else {
            this.log(`There were no changes causing this script to trigger. Exiting now...`);
            this.exit(0);
        }
        this.log(`Running ${flags.script}`);
        const scriptPath = path.resolve(flags.script);
        await executeCommand(`${flags.shell} -c '${scriptPath}'`);
    }
}
