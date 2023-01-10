import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

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

  mySubscription: Subscription;
  hideDetails: boolean = false;

  constructor(public projectsService: ProjectsService) {}

  ngOnInit() {
    this.mySubscription =  this.projectsService.mySubject.subscribe((hide) => {
      this.hideDetails = hide;
    })
  }

  onEditClick($event: any, i: any) {
    this.editClick.emit({ $event, i });
  }

  onDeleteClick($event: any, i: any) {
    this.deleteClick.emit({ $event, i });
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

  @ContentChild('selectionBox') selectionBox: CheckBoxPrinterComponent;

  isAllCheckedChange(b: boolean) {
    if(b) {
      this.selectionBox.check();
    } else {
      this.selectionBox.unCheck();
    }
  }
}
