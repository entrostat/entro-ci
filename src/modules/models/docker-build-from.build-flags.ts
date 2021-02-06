import { IsArray, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { AliasKey } from '../shared/transforms/alias-key.transform';

export class DockerBuildFromBuildFlags {
    @IsString()
    @Expose()
    @AliasKey('image-name')
    imageName: string;

    @IsString()
    @Expose()
    @AliasKey('docker-file-path')
    dockerFilePath: string;

    @IsString()
    @Expose()
    @AliasKey('docker-file-name')
    dockerFileName: string;

    @IsArray()
    @Expose()
    @AliasKey('watch-file')
    watchFile: string[];

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
