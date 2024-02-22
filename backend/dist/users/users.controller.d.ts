import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getme(req: any): Promise<import("./entities/user.entity").User>;
    updateById(req: any, updateStudentDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    getMyWishes(req: any): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findMany(dto: FindUserDto): Promise<import("./entities/user.entity").User[]>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(username: string): Promise<import("./entities/user.entity").User>;
    findWishes(username: string): Promise<import("../wishes/entities/wish.entity").Wish[]>;
}
