import { Command, flags } from '@oclif/command';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as fs from 'fs-extra';
import { EntroCiYaml } from '../../modules/shared/interfaces/entro-ci-yaml';
import * as handlebars from 'handlebars';
import { packageJsonVersion } from '../../modules/shared/helpers/package-json-version';

export default class ProjectVersion extends Command {
    static description = `Returns the current version of the project. This command starts from the current directory and moves up until it finds a package.json file.`;

    static examples = [`entro-ci project:version`];

    static flags = {
        package: flags.string({
            char: 'p',
            default: './package.json',
            description: `The path of the package.json file that holds the current version`,
        }),
    };

    static args = [];

    async run() {
        const { flags } = this.parse(ProjectVersion);

        const packageJsonPath = path.resolve(flags.package);
        const mainVersion = await packageJsonVersion(packageJsonPath);

        this.log(mainVersion);
    }
}
