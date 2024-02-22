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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const offer_entity_1 = require("./entities/offer.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const wish_entity_1 = require("../wishes/entities/wish.entity");
let OffersService = class OffersService {
    constructor(offersRepository, dataSource) {
        this.offersRepository = offersRepository;
        this.dataSource = dataSource;
    }
    async create(createOfferDto, userId) {
        const { amount, itemId } = createOfferDto;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const offerOwner = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { id: userId },
            });
            if (!offerOwner) {
                throw new common_1.BadRequestException('User not found');
            }
            const wish = await queryRunner.manager.findOne(wish_entity_1.Wish, {
                where: { id: itemId },
                relations: { owner: true },
            });
            if (wish.owner.id === userId) {
                throw new common_1.BadRequestException('You cannot offer on your own wish');
            }
            const raised = amount + wish.raised;
            if (raised > wish.price) {
                throw new common_1.BadRequestException({
                    message: 'Offer amount is too high',
                    raised: raised,
                    price: wish.price,
                });
            }
            wish.raised = raised;
            await queryRunner.manager.update(wish_entity_1.Wish, itemId, { raised });
            await queryRunner.commitTransaction();
            return await this.offersRepository.save(Object.assign(Object.assign({}, createOfferDto), { user: offerOwner, amount, item: wish }));
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return await this.offersRepository.find({
            where: { hidden: false },
            relations: { user: true, item: true },
        });
    }
    async findOne(id) {
        return await this.offersRepository.findOne({
            where: { id: id },
            relations: { user: true, item: true },
        });
    }
};
OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map