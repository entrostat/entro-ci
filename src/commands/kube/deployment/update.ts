import { flags } from '@oclif/command';
import { executeCommand } from '../../../modules/shared/helpers/execute-command';
import { BaseCommand } from '../../../modules/shared/base-commands/base-command';

export default class KubeDeploymentUpdate extends BaseCommand {
    static description = 'Trigger an update on a deployment';

    static aliases = ['kdu'];

    static flags = {
        bin: flags.string({
            char: 'b',
            description: 'The path to the kubectl executable',
            required: false,
            default: 'kubectl',
        }),
    };

    static args = [
        { name: 'deployment', required: true, description: 'The name of the deployment that you would like to update' },
        { name: 'namespace', default: 'default', description: 'The namespace that the deployment is in' },
    ];

    async run() {
        const { args, flags } = this.parse(KubeDeploymentUpdate);

        this.log(`Updating deployment ${args.deployment}`);
        await executeCommand(
            `kubectl patch deployment "${args.deployment}" --namespace=${args.namespace} -p "{\\"spec\\":{\\"template\\":{\\"metadata\\":{\\"labels\\":{\\"date\\":\\"\`date +'%s'\`\\"}}}}}"`,
            this.log,
            this.error,
        );
    }
}
