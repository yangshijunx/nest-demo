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
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => Permission, (permission) => permission.children)
  parent: Permission;

  @OneToMany(() => Permission, (permission) => permission.parent)
  children: Permission[];

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
