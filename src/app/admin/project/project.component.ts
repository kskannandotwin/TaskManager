import { Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, SimpleChanges } from '@angular/core';
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

  constructor(public projectsService: ProjectsService) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    console.info('.....ngOnChanges called');

    for (let propName in simpleChanges) {
      let chng = simpleChanges[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }

    if(simpleChanges['project']) {
      this.project.teamSize += 1;
    }
  }

  ngOnInit() {
    this.mySubscription = this.projectsService.mySubject.subscribe((hide) => {
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

  @ContentChildren('selectionBox') selectionBoxes: QueryList<CheckBoxPrinterComponent>;

  isAllCheckedChange(b: boolean) {
    let selectionBox = this.selectionBoxes.toArray();
    if (b) {
      for (let i = 0; i < selectionBox.length; i++) {
        selectionBox[i].check()
      }
    } else {
      for (let i = 0; i < selectionBox.length; i++) {
        selectionBox[i].unCheck();
      }
    }
  }
}
