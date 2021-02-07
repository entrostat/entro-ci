import { hashDirectory } from '../../modules/shared/helpers/hash-directory';
import { BaseCommand } from '../../modules/shared/base-commands/base-command';

export default class HashDirectory extends BaseCommand {
    static description = 'Generates the hash of a directory and outputs it to screen.';

    static flags = {};

    static args = [
        {
            name: 'directory',
            description: `The directory that we're hashing`,
            required: true,
        },
    ];

    async run() {
        const { args, flags } = this.parse(HashDirectory);
        const hash = await hashDirectory(args.directory);
        this.log(hash);
    }
}
