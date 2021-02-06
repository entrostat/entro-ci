import { Command, flags } from '@oclif/command';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as fs from 'fs-extra';
import { EntroCiYaml } from '../../modules/shared/interfaces/entro-ci-yaml';
import * as handlebars from 'handlebars';
import { packageJsonVersion } from '../../modules/shared/helpers/package-json-version';

export default class TemplatesUpdate extends Command {
    static description = `Updates files specified in the entro-ci.yaml file in the repository`;

    static flags = {
        file: flags.string({
            char: 'f',
            default: './entro-ci.yaml',
            description: 'The path to the yaml file with the config',
        }),
        package: flags.string({
            char: 'p',
            default: './package.json',
            description: `The path of the package.json file that holds the current version`,
        }),
        outputVersion: flags.string({
            char: 'V',
            required: false,
            description: `The version that you want to set (if you don't want to use the version in the package.json)`,
        }),
    };

    static args = [];

    async run() {
        const { args, flags } = this.parse(TemplatesUpdate);

        const filePath = path.resolve(flags.file);
        const fileData = await fs.readFile(filePath).then(d => d.toString());

        const json: EntroCiYaml = yaml.load(fileData) as any;

        if (!json) {
            this.log(`The file ${filePath} is empty. No need to update templates...`);
        }

        const packageJsonPath = path.resolve(flags.package);
        const mainVersion = await packageJsonVersion(packageJsonPath);

        const templates = json.templates || [];
        for (const template of templates) {
            const inputPath = path.resolve(template.input);
            const handlebarsTemplate = handlebars.compile(await fs.readFile(inputPath).then(d => d.toString()));
            const outputTemplate = handlebarsTemplate({
                version: flags.outputVersion || mainVersion,
            });
            if (template.output) {
                await fs.writeFile(path.resolve(template.output), outputTemplate);
            } else {
                const directory = path.dirname(inputPath);
                const inputFileName = path.basename(inputPath);
                const outputFileName = inputFileName.replace(/\.hbs$/, '');
                await fs.writeFile(path.join(directory, outputFileName), outputTemplate);
            }
        }
    }
}
