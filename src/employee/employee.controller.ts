import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from '@/employee/entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeService.create(createEmployeeDto);
  }

  @Get()
  async findAll() {
    return await this.employeeService.findEmpAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.employeeService.findOneById(id);
  }
  @Patch(':emp_no')
  async update(
    @Param('emp_no') emp_no: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return await this.employeeService.update(emp_no, updateEmployeeDto);
  }

  @Delete(':emp_no')
  async remove(@Param('emp_no') emp_no: string) {
    return this.employeeService.remove(+emp_no);
  }

  @Get('/withdepartment/:emp_no')
  async get_employee_with_department(
    @Param('emp_no') emp_no: number,
  ): Promise<Employee> {
    return await this.employeeService.getFuncRawEmployeeWithDepartmentHistory(
      emp_no,
    );
  }
  @Get('/proc/raw/:emp_no')
  async get_proc_employee_by_emp_no(
    @Param('emp_no') emp_no: number,
  ): Promise<Employee> {
    return await this.employeeService.getProcRawEmployeeByEmpNo(emp_no);
  }
}
