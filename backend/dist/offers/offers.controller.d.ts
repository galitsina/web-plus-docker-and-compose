import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    create(createOfferDto: CreateOfferDto, req: any): Promise<{
        user: import("../users/entities/user.entity").User;
        amount: number;
        item: import("../wishes/entities/wish.entity").Wish;
        itemId: number;
        hidden: boolean;
    } & import("./entities/offer.entity").Offer>;
    findAll(): Promise<import("./entities/offer.entity").Offer[]>;
    findOne(id: number): Promise<import("./entities/offer.entity").Offer>;
}
