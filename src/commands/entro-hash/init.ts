import { flags } from '@oclif/command';
import { BaseCommand } from '../../modules/shared/base-commands/base-command';
import { getHashValue } from '../../modules/shared/helpers/entro-hash/get-hash-value';
import { setHashValue } from '../../modules/shared/helpers/entro-hash/set-hash-value';

export default class EntroHashInit extends BaseCommand {
    static description = 'Set the URL and auth details for the Entro Hash Storage CLI';

    static flags = {
        url: flags.string({
            char: 'u',
            description: 'The Entro Hash Store API URL',
            required: true,
        }),
        token: flags.string({
            char: 't',
            description: 'The token for the Entro Hash Store API',
            required: true,
        }),
    };

    static args = [];

    async run() {
        const { args, flags } = this.parse(EntroHashInit);
        const { url, token } = flags;
        await this.addToConfig({ url, token });
        this.log(`Added URL ${url} and token ${token} to config`);
    }
}
