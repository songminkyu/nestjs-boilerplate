import { Column, PrimaryColumn } from 'typeorm';

export class CreateEmployeeDto {
  @PrimaryColumn()
  emp_no: number;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  gender: string;

  @Column({ type: 'date' })
  hire_date: Date;
}
