import { BaseEntity } from 'src/app/@application/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  public static readonly SEARCH_TERMS = ['name', 'email', 'phoneNumber', 'designation'];
  public static readonly ORDERS = ['name', 'createdAt'];
  public static readonly RELATIONS = [];

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true, nullable: true })
  phoneNumber?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ select: false })
  password?: string;

  @Column({ nullable: true })
  designation?: string;

  constructor() {
    super();
  }
}
