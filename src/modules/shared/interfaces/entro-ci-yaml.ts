export interface EntroCiYaml {
    templates: {
        name: string;
        input: string;
        output?: string;
        packageJson?: string;
    }[];
}
