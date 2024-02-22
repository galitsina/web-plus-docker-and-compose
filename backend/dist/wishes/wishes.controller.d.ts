import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
export declare class WishesController {
    private readonly wishesService;
    constructor(wishesService: WishesService);
    create(req: any, createWishDto: CreateWishDto): Promise<import("./entities/wish.entity").Wish>;
    returnLast(): Promise<import("./entities/wish.entity").Wish[]>;
    returnTopWishes(): Promise<import("./entities/wish.entity").Wish[]>;
    findOne(id: number): Promise<import("./entities/wish.entity").Wish>;
    update(id: number, updateWishDto: UpdateWishDto): Promise<import("./entities/wish.entity").Wish>;
    remove(id: number): Promise<import("./entities/wish.entity").Wish>;
    copy(id: number, req: any): Promise<import("./entities/wish.entity").Wish>;
}
