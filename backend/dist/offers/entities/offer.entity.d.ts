import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class Offer {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    hidden: boolean;
    user: User;
    item: Wish;
}
