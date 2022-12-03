import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  urlPrefix: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.urlPrefix + '/projects', { responseType: 'json' }).pipe(map((data: Project[]) => {
      for (let i = 0; i < data.length; i++) {
        data[i].teamSize = data[i].teamSize * 100;
      }
      return data;
    }));
  }

  insertProject(newProject: Project): Observable<Project> {
    return this.httpClient.post<Project>(this.urlPrefix + '/projects', newProject, { responseType: 'json' });
  }

  updateProject(existingProject: Project): Observable<Project> {
    return this.httpClient.put<Project>(this.urlPrefix + '/projects/' + existingProject.projectID, existingProject, { responseType: 'json' });
  }

  deleteProject(ProjectID: number): Observable<string> {
    return this.httpClient.delete<string>(this.urlPrefix + '/projects/' + ProjectID);
  }
}
