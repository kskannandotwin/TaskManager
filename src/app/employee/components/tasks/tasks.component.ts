import { Component, OnInit } from '@angular/core';
import { GroupedTask } from 'src/app/models/grouped-task';
import { LoginService } from 'src/app/services/login.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  taskGroups: GroupedTask[];

  constructor(private tasksService: TasksService, public loginService: LoginService) {

  }

  ngOnInit() {
    this.tasksService.getTasks().subscribe((response) => {
      this.taskGroups = response;
    });
  }
}
