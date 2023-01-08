import { Component, Input } from '@angular/core';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input('currentProject') project: Project | any = null;
  @Input('recordIndex') i: number = 0;

  onEditClick($event: any, i: number) {

  }

  onDeleteClick($event: any, i: number) {

  }
}
