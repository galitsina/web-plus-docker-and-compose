import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class OffersService {
    private offersRepository;
    private dataSource;
    constructor(offersRepository: Repository<Offer>, dataSource: DataSource);
    create(createOfferDto: CreateOfferDto, userId: number): Promise<{
        user: User;
        amount: number;
        item: Wish;
        itemId: number;
        hidden: boolean;
    } & Offer>;
    findAll(): Promise<Offer[]>;
    findOne(id: number): Promise<Offer>;
}
