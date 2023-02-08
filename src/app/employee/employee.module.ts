import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';

@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ],
  exports: [
    TasksComponent
  ]
})
export class EmployeeModule { }
