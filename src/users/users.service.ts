import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    // 将 TypeORM 的 Repository 注入到服务类中，以便你可以在服务中使用 Repository 对象来执行数据库操作
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }
  // 获取配置
  getConfig() {
    const testUser = this.configService.get<string>('DTEST_USER');
    return {
      testUser,
    };
  }
}
