import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: true,
    default: false,
  })
  isActive?: boolean;

  @Column({ nullable: true, select: false })
  createdBy?: string;

  @Column({ nullable: true, select: false })
  updatedBy?: string;

  @Column({ nullable: true, select: false })
  deletedBy?: string;

  @CreateDateColumn({ select: false })
  createdAt?: Date;

  @UpdateDateColumn({ select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
