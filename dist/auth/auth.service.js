"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userRepository, JwtService, ConfigService) {
        this.userRepository = userRepository;
        this.JwtService = JwtService;
        this.ConfigService = ConfigService;
    }
    async signUp(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const newUser = new user_entity_1.User();
        const hashedPassword = await this.hashPassword(password);
        newUser.username = username;
        newUser.password = hashedPassword;
        try {
            await this.userRepository.save(newUser);
        }
        catch (error) {
            if (error.code == 23505) {
                throw new common_1.ConflictException('Username already exists');
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async login(authCredentialsDto) {
        const validUser = await this.validateUser(authCredentialsDto);
        const payload = {
            userId: validUser.id,
            username: validUser.username,
        };
        const accessToken = this.JwtService.sign(payload);
        return { accessToken };
    }
    async validateUser(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const userFound = await this.userRepository.findOne({
            where: { username },
        });
        if (userFound) {
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (isMatch) {
                return userFound;
            }
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async getAllUsers() {
        return await this.userRepository.find();
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map