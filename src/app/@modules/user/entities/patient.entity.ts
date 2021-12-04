import { BaseEntity } from 'src/app/@application/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('patients')
export class Patient extends BaseEntity {
  public static readonly SEARCH_TERMS = [
    'firstName',
    'lastName',
    'phoneNumber',
    'email',
    'gender',
  ];
  public static readonly ORDERS = ['createdAt'];
  public static readonly RELATIONS = [];

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true, unique: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  dob?: string;

  @Column({ nullable: true })
  hid?: string;

  constructor() {
    super();
  }
}
