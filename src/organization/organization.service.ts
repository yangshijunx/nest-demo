import { Injectable } from '@nestjs/common';
import { Organization } from '@/entities/organization/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
// import { buildTree } from '@/utiils/tree';
import { classToPlain } from 'class-transformer';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private oranizationRepository: Repository<Organization>,
  ) {}
  async getAllOrganizations(): Promise<Organization[]> {
    // const data: Organization[] = await this.oranizationRepository.find();
    // return buildTree(data);
    const data: Organization[] = await this.oranizationRepository.find({
      relations: ['children'],
      where: {
        parent: IsNull(), // 只查询没有父部门的部门
      },
    });
    // const data = await this.oranizationRepository
    //   .createQueryBuilder('organization')
    //   .leftJoinAndSelect('organization.children', 'children') // 加载子部门
    //   .where('organization.parent IS NULL') // 使用原生 SQL 条件过滤没有父部门的部门
    //   .getMany();
    // 这种可以实现写类似于get的逻辑虚拟字段
    return data?.map((item) => classToPlain(item)) as Organization[];
  }
}
