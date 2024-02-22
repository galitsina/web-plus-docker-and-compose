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
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const wish_entity_1 = require("./entities/wish.entity");
const typeorm_2 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
let WishesService = class WishesService {
    constructor(wishesRepository, usersService) {
        this.wishesRepository = wishesRepository;
        this.usersService = usersService;
    }
    async create(userId, createWishDto) {
        const owner = await this.usersService.findById(userId);
        const wish = await this.wishesRepository.create(Object.assign(Object.assign({}, createWishDto), { owner }));
        return this.wishesRepository.save(wish);
    }
    async returnLast() {
        return this.wishesRepository.find({
            order: { createdAt: 'DESC' },
            take: 40,
        });
    }
    async returnTopWishes() {
        return this.wishesRepository.find({
            order: { copied: 'DESC' },
            take: 20,
        });
    }
    async findOne(id) {
        const wish = await this.wishesRepository.findOne({
            where: { id: id },
            relations: { owner: true, offers: true },
        });
        if (!wish) {
            throw new common_1.NotFoundException('Wish not found');
        }
        return wish;
    }
    async update(id, updateWishDto) {
        const wish = await this.wishesRepository.preload(Object.assign({ id: id }, updateWishDto));
        if (wish.offers.length > 0 && updateWishDto.price) {
            throw new common_1.BadRequestException('You cannot change price of wish with offers');
        }
        if (!wish) {
            throw new common_1.NotFoundException('Wish not found');
        }
        return this.wishesRepository.save(wish);
    }
    async removeById(id) {
        const wish = await this.findOne(id);
        return this.wishesRepository.remove(wish);
    }
    async copyWish(wishId, userId) {
        const wish = await this.findOne(wishId);
        if (!wish) {
            throw new common_1.NotFoundException('Wish not found');
        }
        const owner = wish.owner.id;
        if (owner === userId) {
            throw new common_1.BadRequestException('You cannot copy your own wish');
        }
        wish.copied += 1;
        const user = await this.usersService.findById(userId);
        const copy = await this.wishesRepository.create(Object.assign(Object.assign({}, wish), { owner: user, copied: 0, id: undefined }));
        this.wishesRepository.save(wish);
        return this.wishesRepository.save(copy);
    }
};
WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService])
], WishesService);
exports.WishesService = WishesService;
//# sourceMappingURL=wishes.service.js.map