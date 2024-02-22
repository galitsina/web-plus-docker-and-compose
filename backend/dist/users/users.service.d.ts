import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findWishes(id: number): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findWishesByUsername(username: string): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findOne(username: string): Promise<User>;
    findOneWithPassword(username: string): Promise<User>;
    findMany(query: string): Promise<User[]>;
    findById(id: number): Promise<User>;
    updateById(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    signup(createUserDto: CreateUserDto): Promise<User>;
}
