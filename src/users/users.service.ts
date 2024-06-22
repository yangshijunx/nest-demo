import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { Role } from '@/entities/role/role.entity';
import { Permission } from '@/entities/permission/permission.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    // 将 TypeORM 的 Repository 注入到服务类中，以便你可以在服务中使用 Repository 对象来执行数据库操作
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles', 'roles.permissions'],
      // relations: ['roles'],
    });
  }
  // 获取用户权限
  async getUserPermissions(user: User): Promise<Permission[]> {
    // console.log('进入逻辑', user);
    const permissions = user.roles.flatMap((role) => role.permissions);
    return this.buildPermissionTree(permissions);
    // return permissions;
  }

  // 获取用户权限树
  private buildPermissionTree(permissions: Permission[]): Permission[] {
    const permissionMap = {};
    const tree = [];

    // 初始化每个权限对象并创建一个映射
    permissions.forEach((permission) => {
      permission.children = [];
      permissionMap[permission.id] = permission;
    });

    // 构建树结构
    permissions.forEach((permission) => {
      if (permission.parentId === null) {
        tree.push(permission);
      } else {
        const parent = permissionMap[permission.parentId];
        if (parent) {
          parent.children.push(permission);
        }
      }
    });

    return tree;
  }
  // 获取配置
  getConfig() {
    const testUser = this.configService.get<string>('DTEST_USER');
    const lang = this.configService.get<string>('DTEST_APP_LANG');
    return {
      testUser,
      lang,
    };
  }
}
