import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  // 获取配置
  getConfig() {
    const testUser = this.configService.get<string>('DTEST_USER');
    return {
      testUser,
    };
  }
}
