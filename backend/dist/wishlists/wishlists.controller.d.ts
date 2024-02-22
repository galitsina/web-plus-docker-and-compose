import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    create(createWishlistDto: CreateWishlistDto, req: any): Promise<{
        name: string;
        image: string;
        description: string;
        items: import("../wishes/entities/wish.entity").Wish[];
        owner: import("../users/entities/user.entity").User;
    } & import("./entities/wishlist.entity").Wishlist>;
    findAll(req: any): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    findOne(id: number): Promise<import("./entities/wishlist.entity").Wishlist>;
    update(id: number, updateWishlistDto: UpdateWishlistDto, req: any): Promise<import("./entities/wishlist.entity").Wishlist>;
    remove(id: number, req: any): Promise<import("./entities/wishlist.entity").Wishlist>;
}
