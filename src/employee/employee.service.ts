import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Repository, DataSource } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      // DTO를 엔티티로 변환
      const employee = this.employeeRepository.create(createEmployeeDto);

      // 저장 및 반환
      return await this.employeeRepository.save(employee);
    } catch (error) {
      throw new Error(`직원 생성 실패: ${error.message}`);
    }
  }

  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeeRepository.find();
    } catch (error) {
      throw new Error(`모든 직원 조회 실패: ${error.message}`);
    }
  }

  async findEmpAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(emp_no: number): Promise<Employee> {
    try {
      const employee = await this.employeeRepository.findOne({
        where: { emp_no: emp_no },
      });

      if (!employee) {
        throw new NotFoundException(`직원 ID ${emp_no}를 찾을 수 없습니다`);
      }

      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`직원 조회 실패: ${error.message}`);
    }
  }

  async update(
    emp_no: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    try {
      // 직원 존재 여부 확인
      const employee = await this.findOne(emp_no);

      // 업데이트할 필드 설정
      const updatedEmployee = this.employeeRepository.merge(
        employee,
        updateEmployeeDto,
      );

      // 저장 및 반환
      return await this.employeeRepository.save(updatedEmployee);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`직원 업데이트 실패: ${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // 직원 존재 여부 확인
      const employee = await this.findOne(id);

      // 삭제
      await this.employeeRepository.remove(employee);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`직원 삭제 실패: ${error.message}`);
    }
  }

  async findOneById(emp_no: number): Promise<Employee> {
    const [employee] = await Promise.all([
      this.employeeRepository.findOne({
        where: { emp_no: emp_no },
      }),
    ]);

    if (!employee) {
      throw new NotFoundException(`Employee with id ${emp_no} not found`);
    }

    return employee;
  }
  async findEmployeeWithDepartments(empNo: number): Promise<Employee> {
    try {
      // 직원 정보 조회
      const employee = await this.findOne(empNo);

      // 부서 이력 정보 조회
      const deptEmployees = await this.dataSource.query(
        `SELECT 
          emp_no,
          dept_no,
          from_date,
          to_date
        FROM 
          dept_emp
        WHERE 
          emp_no = $1`,
        [empNo],
      );

      // 부서 이력 정보 매핑
      employee.department_employees = deptEmployees.map((de) => ({
        emp_no: de.emp_no,
        dept_no: de.dept_no,
        from_date: de.from_date,
        to_date: de.to_date,
      }));

      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`직원과 부서 정보 조회 실패: ${error.message}`);
    }
  }

  async createWithDepartment(
    createEmployeeDto: CreateEmployeeDto,
    departmentNo: string,
  ): Promise<Employee> {
    // 트랜잭션 시작
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 직원 엔티티 생성
      const employee = queryRunner.manager.create(Employee, createEmployeeDto);

      // 직원 저장
      const savedEmployee = await queryRunner.manager.save(employee);

      // 현재 날짜 생성
      const currentDate = new Date();

      // 기본 to_date (9999-01-01)
      const defaultEndDate = new Date('9999-01-01');

      // 부서 배정 정보 저장
      await queryRunner.query(
        `INSERT INTO dept_emp (emp_no, dept_no, from_date, to_date)
         VALUES ($1, $2, $3, $4)`,
        [savedEmployee.emp_no, departmentNo, currentDate, defaultEndDate],
      );

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();

      // 부서 정보가 포함된 직원 정보 반환
      return this.findEmployeeWithDepartments(savedEmployee.emp_no);
    } catch (error) {
      // 오류 발생 시 롤백
      await queryRunner.rollbackTransaction();
      throw new Error(`직원 및 부서 정보 생성 실패: ${error.message}`);
    } finally {
      // 리소스 해제
      await queryRunner.release();
    }
  }

  async getEmployeesByDepartment(deptNo: string): Promise<Employee[]> {
    try {
      // 현재 날짜
      const currentDate = new Date().toISOString().split('T')[0];

      // 특정 부서에 현재 소속된 직원 조회
      const employees = await this.dataSource.query(
        `SELECT e.* 
         FROM employee e
         JOIN dept_emp de ON e.emp_no = de.emp_no
         WHERE de.dept_no = $1
         AND de.from_date <= $2
         AND de.to_date >= $2`,
        [deptNo, currentDate],
      );

      // 결과를 Employee 엔티티 배열로 변환
      return employees.map((emp) => {
        const employee = new Employee();
        employee.emp_no = emp.emp_no;
        employee.first_name = emp.first_name;
        employee.last_name = emp.last_name;
        employee.birth_date = emp.birth_date;
        employee.gender = emp.gender;
        employee.hire_date = emp.hire_date;
        return employee;
      });
    } catch (error) {
      throw new Error(`부서별 직원 조회 실패: ${error.message}`);
    }
  }
  async getFuncRawEmployeeWithDepartmentHistory(
    emp_no: number,
  ): Promise<Employee> {
    try {
      // TypeORM에서 raw query를 실행하는 방식으로 함수 호출
      const results = await this.dataSource.query(
        'SELECT * FROM get_employee_with_department_history($1::integer)',
        [emp_no],
      );

      // 결과 확인
      if (!results || results.length === 0) {
        throw new NotFoundException(`Employee with emp_no ${emp_no} not found`);
      }

      // 첫 번째 행에서 직원 정보 추출
      const firstRow = results[0];

      // Employee 객체로 변환
      const employeeBase = {
        emp_no: firstRow.emp_no,
        first_name: firstRow.first_name,
        last_name: firstRow.last_name,
        birth_date:
          firstRow.birth_date instanceof Date
            ? firstRow.birth_date
            : new Date(firstRow.birth_date),
        gender: firstRow.gender,
        hire_date:
          firstRow.hire_date instanceof Date
            ? firstRow.hire_date
            : new Date(firstRow.hire_date),
      };

      // 부서 이력 정보를 추가하여 반환
      const departmentEmployees = results
        .filter((row) => row.dept_emp_emp_no !== null)
        .map((row) => ({
          emp_no: row.dept_emp_emp_no,
          dept_no: row.dept_emp_dept_no,
          from_date:
            row.dept_emp_from_date instanceof Date
              ? row.dept_emp_from_date
              : new Date(row.dept_emp_from_date),
          to_date:
            row.dept_emp_to_date instanceof Date
              ? row.dept_emp_to_date
              : new Date(row.dept_emp_to_date),
        }));

      // Employee 엔티티 생성
      const employee = new Employee();
      Object.assign(employee, employeeBase);
      employee.department_employees = departmentEmployees;

      return employee;
    } catch (error) {
      // 에러 처리
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(
          `Failed to retrieve employee with department history: ${error.message}`,
        );
      } else {
        throw new Error(
          'Failed to retrieve employee with department history: Unknown error',
        );
      }
    }
  }
  async getProcRawEmployeeByEmpNo(emp_no: number): Promise<Employee> {
    try {
      // 입력값 유효성 검사 강화
      if (!Number.isInteger(emp_no) || emp_no <= 0) {
        throw new Error('유효하지 않은 사원 번호 형식입니다');
      }

      // 트랜잭션 시작
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // 임시 테이블 생성
        await queryRunner.query(`
          CREATE TEMP TABLE temp_employee_proc_result (
            emp_no INTEGER PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            birth_date DATE NOT NULL,
            gender CHAR(1) CHECK (gender IN ('M', 'F')),
            hire_date DATE NOT NULL
          ) ON COMMIT DROP;
        `);

        // 세션 변수 설정 (독립 실행)
        await queryRunner.query(
          `SELECT set_config('app.emp_no', $1::text, true)`,
          [emp_no.toString()],
        );

        // 프로시저 실행
        await queryRunner.query(`
          DO $$
          DECLARE
            i_emp_no INTEGER := current_setting('app.emp_no')::INTEGER;
            o_emp_no INTEGER;
            o_first_name VARCHAR;
            o_last_name VARCHAR;
            o_birth_date DATE;
            o_gender CHAR(1);
            o_hire_date DATE;
          BEGIN
            -- 프로시저 실행
            CALL get_proc_employee_by_id(
              i_emp_no,
              o_emp_no, o_first_name, o_last_name, 
              o_birth_date, o_gender, o_hire_date
            );
            
            -- 임시 테이블에 결과 저장
            INSERT INTO temp_employee_proc_result 
            VALUES (
              o_emp_no, 
              o_first_name, 
              o_last_name, 
              o_birth_date, 
              o_gender, 
              o_hire_date
            );
          END $$;
        `);

        // 결과 조회
        const result = await queryRunner.query(
          `
          SELECT * FROM temp_employee_proc_result
          WHERE emp_no = $1::INTEGER
          LIMIT 1;
          `,
          [emp_no],
        );

        // 트랜잭션 커밋
        await queryRunner.commitTransaction();

        // 결과 검증
        if (!result || (Array.isArray(result) && result.length === 0)) {
          throw new NotFoundException(
            `사원 번호 ${emp_no}에 해당하는 정보가 없습니다`,
          );
        }

        // 결과 변환 - 엔티티로 변환
        const employeeData = result[0];

        // Employee 엔티티 객체로 변환
        const employee = new Employee();
        employee.emp_no = employeeData.emp_no;
        employee.first_name = employeeData.first_name;
        employee.last_name = employeeData.last_name;
        employee.birth_date = employeeData.birth_date;
        employee.gender = employeeData.gender;
        employee.hire_date = employeeData.hire_date;

        return employee;
      } catch (error) {
        // 오류 발생 시 롤백
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        // 리소스 해제
        await queryRunner.release();
      }
    } catch (error) {
      // 오류 처리
      if (error instanceof NotFoundException) throw error;
      const message =
        error instanceof Error ? error.message : '알 수 없는 오류';
      throw new Error(`사원 정보 조회 실패: ${message}`);
    }
  }
  async getFuncRawEmployeeByEmpNo(emp_no: number): Promise<Employee> {
    try {
      // 입력값 유효성 검사
      if (!Number.isInteger(emp_no) || emp_no <= 0) {
        throw new Error('유효하지 않은 사원 번호 형식입니다');
      }

      // TypeORM의 query 메서드를 사용하여 PostgreSQL 함수 호출
      const result = await this.dataSource.query(
        'SELECT * FROM get_employee_by_id($1::integer)',
        [emp_no],
      );

      // 결과 확인
      if (!result || (Array.isArray(result) && result.length === 0)) {
        throw new NotFoundException(`Employee with emp_no ${emp_no} not found`);
      }

      // 결과 데이터 추출
      const employeeData = result[0];

      // Employee 엔티티 객체로 변환
      const employee = new Employee();
      employee.emp_no = employeeData.emp_no;
      employee.first_name = employeeData.first_name;
      employee.last_name = employeeData.last_name;
      employee.birth_date =
        employeeData.birth_date instanceof Date
          ? employeeData.birth_date
          : new Date(employeeData.birth_date);
      employee.gender = employeeData.gender;
      employee.hire_date =
        employeeData.hire_date instanceof Date
          ? employeeData.hire_date
          : new Date(employeeData.hire_date);

      return employee;
    } catch (error) {
      // 예외 처리
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(`직원 정보 함수 호출 실패: ${error.message}`);
      } else {
        throw new Error('직원 정보 함수 호출 실패: 알 수 없는 오류');
      }
    }
  }
  async getEmployeeWithDepartmentHistory(emp_no: number): Promise<Employee> {
    try {
      // TypeORM의 findOne 메서드를 사용하여 직원 데이터 조회
      const employee = await this.employeeRepository.findOne({
        where: { emp_no: emp_no },
      });

      if (!employee) {
        throw new NotFoundException(
          `직원 번호 ${emp_no}에 해당하는 정보가 없습니다`,
        );
      }

      // TypeORM의 query 메서드를 사용하여 부서 이력 조회
      const departmentEmployees = await this.dataSource.query(
        `SELECT 
        emp_no, 
        dept_no, 
        from_date, 
        to_date 
      FROM 
        dept_emp 
      WHERE 
        emp_no = $1`,
        [emp_no],
      );

      // 부서 이력을 IDepartmentEmployee 형식으로 변환하여 추가
      employee.department_employees = departmentEmployees.map((de) => ({
        emp_no: de.emp_no,
        dept_no: de.dept_no,
        from_date:
          de.from_date instanceof Date
            ? de.from_date.toISOString().split('T')[0]
            : de.from_date,
        to_date:
          de.to_date instanceof Date
            ? de.to_date.toISOString().split('T')[0]
            : de.to_date,
      }));

      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`직원 및 부서 이력 조회 실패: ${error.message}`);
    }
  }
}
