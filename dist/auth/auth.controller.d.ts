import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    login(loginCredentials: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    getUsers(): Promise<User[]>;
}
