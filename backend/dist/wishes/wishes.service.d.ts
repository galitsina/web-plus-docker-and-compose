import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { UsersService } from 'src/users/users.service';
export declare class WishesService {
    private wishesRepository;
    private usersService;
    constructor(wishesRepository: Repository<Wish>, usersService: UsersService);
    create(userId: number, createWishDto: CreateWishDto): Promise<Wish>;
    returnLast(): Promise<Wish[]>;
    returnTopWishes(): Promise<Wish[]>;
    findOne(id: number): Promise<Wish>;
    update(id: number, updateWishDto: UpdateWishDto): Promise<Wish>;
    removeById(id: number): Promise<Wish>;
    copyWish(wishId: number, userId: number): Promise<Wish>;
}
