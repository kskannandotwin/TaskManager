import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {
  project: Project;
  routeParamsSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private projectsService: ProjectsService) {
    this.project = new Project();
  }

  ngOnInit() {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe((params) => {
      let pid = params['projectid'];
      this.projectsService.getProjectByProjectID(pid).subscribe((proj: Project) => {
        this.project = proj;
      });
    });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
