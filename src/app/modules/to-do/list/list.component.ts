import { Component, OnInit } from '@angular/core';
import { IList, ITask } from 'src/app/types/interface';
import { ToDoService } from 'src/app/services/to-do.service';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { TaskInfo } from '../share/todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[];
  toDoList: IList[];
  taskColumns: string[];
  selectedListId: number;
  showForm = false;
  dataSource: MatTableDataSource<IList>;
  taskDataSource: MatTableDataSource<TaskInfo>;
  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    this.displayedColumns = ['id', 'name', 'tasks', 'action'];
    this.taskColumns = ['id', 'name', 'listName', 'completed'];
    this.getData();
  }

  getData() {
    this.toDoService.getToDoList().subscribe((res: any) => {
      if (res) {
        this.toDoList = res;
        this.dataSource = new MatTableDataSource<IList>(res);
      }
    }, (e) => {
      console.log('getToDoList Error');
    });

    forkJoin(
      this.toDoService.getToDoList(),
      this.toDoService.getAllUserTask()
    ).subscribe (res => {
      this.toDoList = res[0];
      const taskList = res[1].map( item => {
        const list = this.toDoList.find(x => x.id === item.list_id);
        const taskInfo: TaskInfo = {
          id: item.id,
          name: item.name,
          completed: item.completed,
          listName: list ? list.name : '',
        };
        return taskInfo;
      });
      this.taskDataSource = new MatTableDataSource<TaskInfo>(taskList);
      this.dataSource = new MatTableDataSource<IList>(res[0]);
    }, err => {
      console.log('get data has error');
    });
  }

  deleteList(id: number) {
    this.toDoService.deleteToDoList(id).subscribe((res: any) => {
      if (res) {
        this.getData();
      }
    }, (e) => {
      console.log('deleteToDoList Error');
    });
  }

  editList(list: IList) {
    this.selectedListId = list.id;
    this.showForm = true;
  }

  addList() {
    this.selectedListId = undefined;
    this.showForm = true;
  }

  closeToDoForm(event: any) {
    if (event) {
      const index = this.toDoList.findIndex(x => x.id === event.id);
      if (index >= 0) {
        const todo = this.toDoList.find(x => x.name === event.name && x.id !== event.id);
        if (todo) {
          alert('list name is exist in list !!!');
        } else {
          this.editToDoList(event.id, event.name);
        }
      } else {
        const todo = this.toDoList.find(x => x.name === event.name);
        if (todo) {
          alert('list name is exist in list !!!');
        } else {
          if (event && event.name) {
            this.addToDoList(event.name);
          }
        }
      }
    } else {
      this.showForm = false;
    }
    this.getData();
  }

  addToDoList(name: string) {
    this.toDoService.addToDoList(name).subscribe((res: any) => {
      if (res) {
        this.showForm = false;
        this.toDoList.push(res);
        this.dataSource.data = this.toDoList;
      }
    }, (e) => {
      console.log('addToDoList has Error');
    });
  }

  editToDoList(listId: number, name: string) {
    this.toDoService.modifyToDoList(listId, name).subscribe((res: any) => {
      if (res) {
        this.showForm = false;
        const index = this.toDoList.findIndex(x => x.id === res.id);
        this.toDoList[index] = res;
        this.dataSource.data = this.toDoList;
      }
    }, (e) => {
      console.log('addToDoList has Error');
    });
  }

}
