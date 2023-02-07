import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, ContentChildren, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../../../models/project';
import { ProjectsService } from '../../../services/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
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

    if (simpleChanges['project']) {
      // this.project.teamSize += 1;
    }
  }

  ngOnInit() {
    console.info('....ngOnInit called');
    this.mySubscription = this.projectsService.mySubject.subscribe((hide) => {
      this.hideDetails = hide;
    })
  }

  ngDoCheck() {
    console.info('......ngDocheck called');
  }

  ngAfterContentInit() {
    console.info('.....ngAfterContentInit called');
    console.log(this.selectionBoxes.toArray());
  }

  ngAfterContentChecked() {
    console.info('.....ngAfterContentChecked called');
    console.log(this.tbl);
  }

  ngAfterViewInit() {
    console.info('.....ngAfterViewInit called');
  }

  ngAfterViewChecked(): void {
    console.info('......ngAfterViewChecked called');
  }

  @ViewChild('tbl') tbl: ElementRef;

  onEditClick($event: any, i: any) {
    this.editClick.emit({ $event, i });
  }

  onDeleteClick($event: any, i: any) {
    this.deleteClick.emit({ $event, i });
  }

  ngOnDestroy() {
    console.info('.....ngOnDestroy called');
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
