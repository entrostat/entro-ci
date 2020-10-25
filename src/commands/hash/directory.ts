import { Command, flags } from '@oclif/command';
import { executeCommand } from '../../shared/helpers/execute-command';

export default class HashDirectory extends Command {
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
        // Check here for the command:
        // https://stackoverflow.com/questions/545387/linux-compute-a-single-hash-for-a-given-folder-contents

        let hash = await executeCommand(
            `find ${args.directory} -type f -print0 | sort -z | xargs -0 sha1sum | sha1sum`,
            message => {},
            this.error,
            false,
        );
        hash = hash.replace(/ +-/, '');
        hash = hash.replace(/\n/, '');
        this.log(hash);
    }
}
