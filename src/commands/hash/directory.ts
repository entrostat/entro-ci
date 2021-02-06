import { hashDirectory } from '../../modules/shared/helpers/hash-directory';
import { BaseCommand } from '../../modules/shared/base-commands/base-command';

export default class HashDirectory extends BaseCommand {
    static description = 'Generates the hash of a directory and outputs it to screen.';

    static flags = {};

    static args = [
        {
            name: 'directory',
        },
    ];

    async run() {
        const { args, flags } = this.parse(HashDirectory);
        if (!args.directory) {
            this.error(`Please specify the directory path...`);
        }
        const hash = await hashDirectory(args.directory, this.log, this.error);
        this.log(hash);
    }
}
