import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { Column } from 'typeorm';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
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
