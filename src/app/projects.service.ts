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

  getAllProjects(): Observable<Project[]> {
    var currentUser = { token: '' };
    var headers = new HttpHeaders;
    headers = headers.set('Authorization', 'Bearer');
    if (sessionStorage['currentUser'] != null) {
      currentUser = JSON.parse(sessionStorage['currentUser']);
      headers = headers.set("Authorization", "Bearer " + currentUser.token);
    }
    return this.httpClient
      .get<Project[]>(this.urlPrefix + '/api/projects', { headers: headers, responseType: 'json' }) // for node js
      // .get<Project[]>(this.urlPrefix + '/projects', { responseType: 'json' }) // for json-server
      .pipe(
        map((data: Project[]) => {
          for (let i = 0; i < data.length; i++) {
            data[i].teamSize = data[i].teamSize * 100;
          }
          return data;
        })
      );
  }

  insertProject(newProject: Project): Observable<Project> {
    var currentUser = { token: '' };
    var headers = new HttpHeaders;
    headers = headers.set('Authorization', 'Bearer');
    if (sessionStorage['currentUser'] != null) {
      currentUser = JSON.parse(sessionStorage['currentUser']);
      headers = headers.set("Authorization", "Bearer " + currentUser.token);
    }
    return this.httpClient.post<Project>(this.urlPrefix + "/api/projects", newProject, { headers: headers, responseType: "json" }); // for node js
    // return this.httpClient.post<Project>(this.urlPrefix + "/projects", newProject, { responseType: "json" }); // for json-server
  }

  updateProject(existingProject: Project): Observable<Project> {
    var currentUser = { token: '' };
    var headers = new HttpHeaders;
    headers = headers.set('Authorization', 'Bearer');
    if (sessionStorage['currentUser'] != null) {
      currentUser = JSON.parse(sessionStorage['currentUser']);
      headers = headers.set("Authorization", "Bearer " + currentUser.token);
    }
    return this.httpClient.put<Project>(this.urlPrefix + "/api/projects", existingProject, { headers: headers, responseType: "json" }); // for node js
    // return this.httpClient.put<Project>(this.urlPrefix + "/projects" + existingProject.projectID, existingProject, { responseType: "json" }); // for json-server
  }

  deleteProject(ProjectID: number): Observable<string> {
    var currentUser = { token: '' };
    var headers = new HttpHeaders;
    headers = headers.set('Authorization', 'Bearer');
    if (sessionStorage['currentUser'] != null) {
      currentUser = JSON.parse(sessionStorage['currentUser']);
      headers = headers.set("Authorization", "Bearer " + currentUser.token);
    }
    return this.httpClient.delete<string>(this.urlPrefix + "/api/projects?ProjectID=" + ProjectID, { headers: headers }); // for node js
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
      { headers: headers, responseType: 'json' }
    );
  }
}
