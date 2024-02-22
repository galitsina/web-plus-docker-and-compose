import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class Wishlist {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    image: string;
    owner: User;
    items: Wish[];
}
