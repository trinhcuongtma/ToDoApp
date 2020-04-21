import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { RestService } from './rest.service';
import { IList, ITask, IRequestCreateTask, IRequestModifyTask } from '../types/interface';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  apiServer = 'http://localhost:8080/api';
  // apiKey = 'bearer w0e1dZPw7jYNan5o7khjUHU-schsHt3svUvNsrnysoFhz-pkaDgO8ce2oGlb3FLw';
  constructor(private httpService: RestService) { }

  authenticateUser(userName: string, password: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${userName}:${password}`),
      'Content-Type': 'application/json'
    });
    return this.httpService.post(this.apiServer + '/auth/login', null, headers)
      .pipe(
        map(d => {
          return d.body as string;
        },
          throwError('Could not be authenticated')
        ));
  }

  logout(): Observable<boolean> {
    return this.httpService.post(this.apiServer + '/auth/logout', null)
      .pipe(
        map(d => {
          return true;
        },
          throwError('Could not be authenticated')
        ));
  }


  getToDoList(): Observable<IList[]> {
    return this.httpService.get(this.apiServer + '/lists')
      .pipe(
        map(d => {
          return d.body as IList[];
        }, throwError('Error')
      ));
  }

  addToDoList(listName: string): Observable<IList> {
    const request = {
      name: listName
    };
    return this.httpService.post(this.apiServer + '/lists', request)
      .pipe(
        map(d => {
          return d.body as IList;
        }, throwError('Error')
      ));
  }

  getToDoListInformation(listId: number): Observable<IList> {
    return this.httpService.get(this.apiServer + '/lists/' + listId)
      .pipe(
        map(d => {
          return d.body as IList;
        }, throwError('Error')
      ));
  }

  modifyToDoList(listId: number, listName: string): Observable<any> {
    const request = {
      name: listName
    };
    return this.httpService.put(this.apiServer + '/lists/' + listId, request)
    .pipe(
      map(d => {
        return d;
      }, throwError('Error')
    ));
  }

  deleteToDoList(listId: number): Observable<boolean> {
    return this.httpService.delete(this.apiServer + '/lists/' + listId)
      .pipe(
        map(d => {
          return true;
        }, throwError('Error')
      ));
  }

  getAllUserTask(): Observable<ITask[]> {
    return this.httpService.get(this.apiServer + '/tasks')
    .pipe(
      map(d => {
        return d.body as ITask[];
      }, throwError('Error')
    ));
  }

  getTaskFromToDoList(listId: number): Observable<ITask[]> {
    return this.httpService.get(this.apiServer + '/lists/' + listId + '/tasks')
      .pipe(
        map(d => {
          return d.body as ITask[];
        }, throwError('Error')
      ));
  }

  createTask(listId: number, request: IRequestCreateTask): Observable<ITask> {
    return this.httpService.post(this.apiServer + '/lists/' + listId + '/tasks', request)
      .pipe(
        map(d => {
          return d.body as ITask;
        }, throwError('Error')
      ));
  }

  getTaskInfomation(listId: number, taskId: number): Observable<ITask> {
    return this.httpService.get(this.apiServer + '/lists/' + listId + '/tasks/' + taskId)
      .pipe(
        map(d => {
          return d.body as ITask;
        }, throwError('Error')
      ));
  }

  modifyTask(Id: number, task: IRequestModifyTask): Observable<any> {
    return this.httpService.put(this.apiServer + '/lists/' + task.listId + '/tasks/' + Id, task)
      .pipe(
        map(d => {
          return d;
        }, throwError('Error')
      ));
  }

  deleteTask(listId: number, taskId: number): Observable<boolean> {
    return this.httpService.delete(this.apiServer + '/lists/' + listId + '/tasks/' + taskId)
      .pipe(
        map(d => {
          return true;
        }, throwError('Error')
      ));
  }


}
