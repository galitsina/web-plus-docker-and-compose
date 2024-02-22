import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    signin(signinDto: SigninDto): Promise<{
        access_token: string;
    }>;
    signup(signupDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
}
