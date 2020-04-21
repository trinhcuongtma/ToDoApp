import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { RestService } from './rest.service';
import { IList, ITask } from '../types/interface';

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
  //   return of ([
  //     {
  //       name: 'High-Priority tasks',
  //       id: 1,
  //       items: 10
  //     },
  //     {
  //       name: 'Low-Priority tasks',
  //       id: 2,
  //       items: 10
  //     }
  //   ]);
    return this.httpService.get(this.apiServer + '/lists')
      .pipe(
        map(d => {
          return d.body as IList[];
        }, throwError('Error')
      ));
  }

  addToDoList(list: IList): Observable<IList> {
    return of ({
      name: 'High-Priority tasks',
      id: 1,
      tasks: 10
    });
  }

  getToDoListInformation(listId: number): Observable<IList> {
    return of ({
      name: 'High-Priority tasks',
      id: 1,
      tasks: 10
    });
  }

  modifyToDoList(listId: number): Observable<IList> {
    return of ({
      name: 'High-Priority tasks',
      id: 1,
      tasks: 10
    });
  }

  deleteToDoList(listId: number): Observable<boolean> {
    return of (true);
  }

  getAllUserTask(): Observable<ITask[]> {
    return of ([
      {
        name: 'Make something awesome!',
        completed: true,
        listId: 1,
        createdAt: new Date(),
        completedAt: new Date(),
        id: 1
      }
    ]);
  }

  getTaskFromToDoList(listId: number): Observable<ITask[]> {
    return of ([
      {
        name: 'Make something awesome!',
        completed: true,
        listId: 1,
        createdAt: new Date(),
        completedAt: new Date(),
        id: 1
      }
    ]);
  }

  createTask(listId: number, task: ITask): Observable<ITask[]> {
    return of ([
      {
        name: 'Make something awesome!',
        completed: true,
        listId: 1,
        createdAt: new Date(),
        completedAt: new Date(),
        id: 1
      }
    ]);
  }

  getTaskInfomation(listId: number, taskId: number): Observable<ITask> {
    return of ({
        name: 'Make something awesome!',
        completed: true,
        listId: 1,
        createdAt: new Date(),
        completedAt: new Date(),
        id: 1
      });
  }

  modifyTask(listId: number, task: ITask): Observable<ITask> {
    return of ({
        name: 'Make something awesome!',
        completed: true,
        listId: 1,
        createdAt: new Date(),
        completedAt: new Date(),
        id: 1
      });
  }

  deleteTask(listId: number, taskId: number): Observable<boolean> {
    return of (true);
  }


}
