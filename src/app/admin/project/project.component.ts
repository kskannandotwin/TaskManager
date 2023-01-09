import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input('currentProject') project: Project | any = null;
  @Input('recordIndex') i: number = 0;

  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  constructor(public projectsService: ProjectsService) {}

  onEditClick($event: any, i: any) {
    this.editClick.emit({ $event, i });
  }

  onDeleteClick($event: any, i: any) {
    this.deleteClick.emit({ $event, i });
  }
}
