import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { AliasKey } from '../shared/transforms/alias-keys.transform';

export class DockerBuildFlags {
    @IsString()
    @Expose()
    directory: string;

    @IsString()
    @Expose()
    @AliasKey('image-name')
    imageName: string;

    @IsString()
    @Expose()
    @AliasKey('docker-file-name')
    dockerFileName: string;

    @IsString()
    @Expose()
    registry: string;

    @IsString()
    @Expose()
    tag: string;

    @IsString()
    @Expose()
    @AliasKey('dry-run')
    dryRun: boolean;
}
