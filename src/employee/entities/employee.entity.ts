import { Entity, Column, PrimaryColumn } from 'typeorm';
export class DepartmentEmployee {
  @PrimaryColumn()
  emp_no: number;

  @Column()
  dept_no: string;

  @Column({ type: 'date' })
  from_date: string | Date; // Date 타입도 허용하도록 수정

  @Column({ type: 'date' })
  to_date: string | Date; // Date 타입도 허용하도록 수정
}

@Entity()
export class Employee {
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

  department_employees?: DepartmentEmployee[];
}
