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
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const wishes_service_1 = require("../wishes/wishes.service");
const users_service_1 = require("../users/users.service");
let WishlistsService = class WishlistsService {
    constructor(wishlistsRepository, wishesService, usersService) {
        this.wishlistsRepository = wishlistsRepository;
        this.wishesService = wishesService;
        this.usersService = usersService;
    }
    async create(createWishlistDto, userId) {
        const { name, image, itemsIds, description } = createWishlistDto;
        const wishes = [];
        for (const id of itemsIds) {
            const wish = await this.wishesService.findOne(id);
            wishes.push(wish);
        }
        if (wishes.length !== itemsIds.length) {
            throw new common_1.BadRequestException('One or more wishes not found');
        }
        const owner = await this.usersService.findById(userId);
        return this.wishlistsRepository.save({
            name,
            image,
            description,
            items: wishes,
            owner,
        });
    }
    async findAll(userId) {
        return await this.wishlistsRepository.find({
            where: {
                owner: {
                    id: userId,
                },
            },
        });
    }
    async findOne(id) {
        const wishlist = await this.wishlistsRepository.findOne({
            where: { id: id },
            relations: { owner: true, items: true },
        });
        if (!wishlist) {
            throw new common_1.BadRequestException('Wishlist not found');
        }
        return wishlist;
    }
    async update(id, updateWishlistDto, userId) {
        const wishlist = await this.wishlistsRepository.findOne({
            where: { id: id },
            relations: { owner: true },
        });
        if (!wishlist) {
            throw new common_1.BadRequestException('Wishlist not found');
        }
        if (wishlist.owner.id !== userId) {
            throw new common_1.BadRequestException('You cannot update this wishlist, because you are not the owner');
        }
        const { name, image, itemsIds, description } = updateWishlistDto;
        const wishes = [];
        for (const id of itemsIds) {
            const wish = await this.wishesService.findOne(id);
            wishes.push(wish);
        }
        if (wishes.length !== itemsIds.length) {
            throw new common_1.BadRequestException('One or more wishes not found');
        }
        wishlist.name = name;
        wishlist.image = image;
        wishlist.description = description;
        wishlist.items = wishes;
        return this.wishlistsRepository.save(wishlist);
    }
    async remove(id, userId) {
        const wishlist = await this.findOne(id);
        if (wishlist.owner.id !== userId) {
            throw new common_1.BadRequestException('You cannot delete this wishlist, because you are not the owner');
        }
        return this.wishlistsRepository.remove(wishlist);
    }
};
WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wishes_service_1.WishesService,
        users_service_1.UsersService])
], WishlistsService);
exports.WishlistsService = WishlistsService;
//# sourceMappingURL=wishlists.service.js.map