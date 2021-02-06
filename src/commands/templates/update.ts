import { Command, flags } from '@oclif/command';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as fs from 'fs-extra';

export default class TemplatesUpdate extends Command {
    static description = `Updates files specified in the entro-ci.yaml file in the repository`;

    static flags = {
        file: flags.string({
            char: 'f',
            default: './entro-ci.yaml',
            description: 'The path to the yaml file with the config',
        }),
    };

    static args = [];

    async run() {
        const { args, flags } = this.parse(TemplatesUpdate);

        const filePath = path.resolve(flags.file);
        const fileData = await fs.readFile(filePath).then(d => d.toString());

        const json = yaml.load(fileData);
        console.log(json);
    }
}
