import { BaseEntity } from 'src/app/@application/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('address')
export class Address extends BaseEntity {
  public static readonly SEARCH_TERMS = ['division', 'district', 'address'];
  public static readonly ORDERS = ['createdAt'];
  public static readonly RELATIONS = [];

  @Column({ nullable: true })
  division?: string;

  @Column({ nullable: true })
  district?: string;

  @Column({ nullable: true })
  upazila?: string;

  @Column({ nullable: true })
  union?: string;

  @Column({ nullable: true })
  village?: string;

  @Column({ nullable: true })
  address?: string;

  constructor() {
    super();
  }
}
