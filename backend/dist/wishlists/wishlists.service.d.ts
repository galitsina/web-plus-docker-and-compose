import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { UsersService } from 'src/users/users.service';
export declare class WishlistsService {
    private wishlistsRepository;
    private wishesService;
    private usersService;
    constructor(wishlistsRepository: Repository<Wishlist>, wishesService: WishesService, usersService: UsersService);
    create(createWishlistDto: CreateWishlistDto, userId: number): Promise<{
        name: string;
        image: string;
        description: string;
        items: Wish[];
        owner: import("../users/entities/user.entity").User;
    } & Wishlist>;
    findAll(userId: number): Promise<Wishlist[]>;
    findOne(id: number): Promise<Wishlist>;
    update(id: number, updateWishlistDto: UpdateWishlistDto, userId: number): Promise<Wishlist>;
    remove(id: number, userId: number): Promise<Wishlist>;
}
