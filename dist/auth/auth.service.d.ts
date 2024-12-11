import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userRepository;
    private JwtService;
    private ConfigService;
    constructor(userRepository: Repository<User>, JwtService: JwtService, ConfigService: ConfigService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    login(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    validateUser(authCredentialsDto: AuthCredentialsDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    hashPassword(password: string): Promise<string>;
}
