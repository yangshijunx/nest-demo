import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // desc
  @Column()
  desc: string;

  //   status 布尔值默认 true
  @Column({ default: true })
  status: boolean;

  //   order 排序
  @Column({ default: 0 })
  order: number;

  // 创建时间 默认当前时间
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  // 更新时间 默认当前时间
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @ManyToOne(() => Organization, (organization) => organization.children)
  parent: Organization;

  @OneToMany(() => Organization, (organization) => organization.parent)
  children: Organization[];

  //   @OneToMany(() => User, (user) => user.organization)
  //   users: User[];
}
