import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  urlPrefix: string = "http://localhost:9090"; // node js url
  //urlPrefix: string = "http://localhost:3000"; // json-server url

  constructor(private httpClient: HttpClient) { }

  hideDetails: boolean = false;
  
  toggleDetails() {
    this.hideDetails = !this.hideDetails;
  }

  getAllProjects(): Observable<Project[]> {   
    return this.httpClient
      .get<Project[]>(this.urlPrefix + '/api/projects', { responseType: 'json' }) // for node js
      // .get<Project[]>(this.urlPrefix + '/projects', { responseType: 'json' }) // for json-server
      .pipe(
        map((data: Project[]) => {
          for (let i = 0; i < data.length; i++) {
            // data[i].teamSize = data[i].teamSize * 100;
          }
          return data;
        })
      );
  }

  getProjectByProjectID(ProjectID: number): Observable<Project> {
    return this.httpClient.get<Project>(this.urlPrefix + "/api/projects/searchbyprojectid/" + ProjectID, { responseType: "json" }); // for node js
    // return this.httpClient.put<Project>(this.urlPrefix + "/projects" + existingProject.projectID, existingProject, { responseType: "json" }); // for json-server
  }

  insertProject(newProject: Project): Observable<Project> {
    var requestHeaders = new HttpHeaders();
    requestHeaders = requestHeaders.set("X-XSRF-TOKEN", sessionStorage['XSRFRequestToken']);
    return this.httpClient.post<Project>(this.urlPrefix + "/api/projects", newProject, { headers: requestHeaders, responseType: "json" });
  }

  updateProject(existingProject: Project): Observable<Project> {
    return this.httpClient.put<Project>(this.urlPrefix + "/api/projects", existingProject, { responseType: "json" }); // for node js
    // return this.httpClient.put<Project>(this.urlPrefix + "/projects" + existingProject.projectID, existingProject, { responseType: "json" }); // for json-server
  }

  deleteProject(ProjectID: number): Observable<string> {    
    return this.httpClient.delete<string>(this.urlPrefix + "/api/projects?ProjectID=" + ProjectID); // for node js
    // return this.httpClient.delete<string>(this.urlPrefix + "/projects/" + ProjectID); // for json-server
  }

  searchProjects(searchBy: string, searchText: string): Observable<Project[]> {
    var currentUser = { token: '' };
    var headers = new HttpHeaders;
    headers = headers.set('Authorization', 'Bearer');
    if (sessionStorage['currentUser'] != null) {
      currentUser = JSON.parse(sessionStorage['currentUser']);
      headers = headers.set("Authorization", "Bearer " + currentUser.token);
    }
    return this.httpClient.get<Project[]>(
      this.urlPrefix + '/api/projects/search/' + searchBy + '/' + searchText,
      { responseType: 'json' }
    );
  }
}
