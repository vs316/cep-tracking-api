/* eslint-disable prettier/prettier */
// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   IntegerType,
//   JoinColumn,
//   ManyToOne,
// } from 'typeorm';
// import { User } from './user.entity';

// @Entity({ name: 'shipment' })
// export class Shipment {
//   @PrimaryGeneratedColumn()
//   shipment_id: IntegerType;

//   @ManyToOne(() => User, (user) => user.shipments)
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @Column()
//   from_address_id: IntegerType;

//   @Column()
//   to_address_id: IntegerType;

//   @Column({ type: 'varchar2' })
//   shipment_type: string;

//   @Column({ type: 'varchar2' })
//   status: string;

//   @Column({ type: 'tinyint' })
//   is_draft: boolean;

//   @Column({ type: 'tinyint' })
//   is_finalized: boolean;

//   @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
//   created_at: Date;

//   @Column({
//     type: 'datetime',
//     default: () => 'CURRENT_TIMESTAMP',
//     onUpdate: 'CURRENT_TIMESTAMP',
//   })
//   updated_at: Date;
// }
