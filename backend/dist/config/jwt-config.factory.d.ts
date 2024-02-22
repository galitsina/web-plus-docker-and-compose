import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
export declare class JwtConfigFactory implements JwtOptionsFactory {
    private configService;
    constructor(configService: ConfigService);
    createJwtOptions(): JwtModuleOptions;
}
