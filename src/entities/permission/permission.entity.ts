import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Role } from '@/entities/role/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentId: string;

  @Column()
  label: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column()
  type: number;

  @Column()
  route: string;

  @Column({ nullable: true })
  component: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: false })
  hide: boolean;

  // hideTab字段布尔值默认 false
  @Column({ default: false })
  hideTab: boolean;

  // frameSrc 字符串字段 默认为空
  @Column({ nullable: true })
  frameSrc: string;

  // newFeature 布尔值字段 默认为 false
  @Column({ default: false })
  newFeature: boolean;

  // status 0 1 默认是1
  // 0 禁用
  @Column({ default: 1 })
  status: number;

  @ManyToOne(() => Permission, (permission) => permission.children)
  parent: Permission;

  @OneToMany(() => Permission, (permission) => permission.parent)
  children: Permission[];

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
