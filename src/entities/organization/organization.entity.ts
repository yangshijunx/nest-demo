import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

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

  // 父级id
  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => Organization, (organization) => organization.children)
  @JoinColumn({ name: 'parentId' })
  parent: Organization;

  @OneToMany(() => Organization, (organization) => organization.parent)
  children: Organization[];

  // Getter method for statusLabel
  @Expose()
  get statusLabel(): string {
    return this.status ? 'enable' : 'disable';
  }

  //   @OneToMany(() => User, (user) => user.organization)
  //   users: User[];
}
