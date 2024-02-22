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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_1 = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    findAll() {
        return this.usersRepository.find();
    }
    async findWishes(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['wishes'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.wishes;
    }
    async findWishesByUsername(username) {
        const user = await this.usersRepository.findOne({
            where: { username },
            relations: ['wishes'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.wishes;
    }
    async findOne(username) {
        const user = await this.usersRepository.findOneBy({ username });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findOneWithPassword(username) {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .addSelect(['user.password'])
            .getOne();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findMany(query) {
        return this.usersRepository.find({
            where: [{ username: (0, typeorm_2.Like)(`%${query}%`) }, { email: (0, typeorm_2.Like)(`%${query}%`) }],
        });
    }
    async findById(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async updateById(id, updateUserDto) {
        if (updateUserDto.password) {
            try {
                const hashPassword = await (0, bcrypt_1.hash)(updateUserDto.password, 10);
                updateUserDto.password = hashPassword;
            }
            catch (err) {
                throw new Error(err);
            }
        }
        const user = await this.usersRepository.preload(Object.assign({ id: id }, updateUserDto));
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.usersRepository.save(user);
    }
    async signup(createUserDto) {
        const user = await this.usersRepository.create(createUserDto);
        try {
            const hashValue = await (0, bcrypt_1.hash)(user.password, 10);
            user.password = hashValue;
        }
        catch (err) {
            throw new Error(err);
        }
        return this.usersRepository.save(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map