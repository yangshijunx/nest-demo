import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  parent_id: string;

  @Column()
  label: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  type: number;

  @Column()
  route: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  component: string;

  @Column({ nullable: true })
  frame_src: string;

  @Column({ nullable: true })
  hide_tab: boolean;

  @Column({ nullable: true })
  new_feature: boolean;

  @Column({ default: 1 })
  status: number;

  @ManyToOne(() => Permission, (permission) => permission.children)
  parent: Permission;

  @OneToMany(() => Permission, (permission) => permission.parent)
  children: Permission[];

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
