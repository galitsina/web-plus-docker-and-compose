import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findWishes(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['wishes'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.wishes;
  }
  async findWishesByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['wishes'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.wishes;
  }

  async findOne(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneWithPassword(username: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect(['user.password'])
      .getOne();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findMany(query: string) {
    return this.usersRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });
  }

  async findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      try {
        const hashPassword = await hash(updateUserDto.password, 10);
        updateUserDto.password = hashPassword;
      } catch (err) {
        throw new Error(err);
      }
    }
    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.save(user);
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);

    try {
      const hashValue = await hash(user.password, 10);
      user.password = hashValue;
    } catch (err) {
      throw new Error(err);
    }

    return this.usersRepository.save(user);
  }
}
