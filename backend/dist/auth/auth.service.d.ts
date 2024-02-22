import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dto/signin.dto';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    signin(signinDto: SigninDto): Promise<{
        access_token: string;
    }>;
    validate(signinDto: SigninDto): Promise<import("../users/entities/user.entity").User>;
}
