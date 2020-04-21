import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ITask, IList } from 'src/app/types/interface';
import { ToDoService } from 'src/app/services/to-do.service';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges {
  @Input() list?: IList;
  displayedColumns: string[];
  tasks: ITask[];
  selectedtask: ITask;
  showForm = false;
  dataSource: MatTableDataSource<ITask>;
  constructor(private toDoService: ToDoService) {
    this.displayedColumns = ['id', 'name', 'completed', 'action'];
  }
  ngOnInit() {
  }

  ngOnChanges() {
    if (this.list) {
      this.getListTask(this.list);
    } else {
      this.tasks = [];
    }
  }

  getListTask(list: IList) {
    this.toDoService.getTaskFromToDoList(list.id).subscribe((res: any) => {
      if (res) {
        this.tasks = res;
        this.dataSource = new MatTableDataSource<ITask>(this.tasks);
      }
    }, (e) => {
      console.log('getToDoList Error');
    });
  }

  // getAllTask() {
  //   forkJoin(
  //     this.toDoService.getAllUserTask(),
  //     this.toDoService.getToDoList()
  //   ).subscribe(res => {
  //     if (res) {
  //       this.convertToData(res[0], res[1]);
  //       this.dataSource = new MatTableDataSource<ITask>(this.tasks);
  //     }
  //   }, err => {
  //     console.log('get data has error');
  //   });
  // }

  convertToData(tasks: ITask[], lists: IList[]) {
    this.tasks = tasks.map((item: any) => {
      let lName = item.listId;
      const list = lists.find(x => x.id === item.listId);
      if (list) {
        lName = list.name;
      }
      return {
          id: item.id,
          listId: item.listId,
          name: item.name,
          listName: lName,
          completed: item.completed,
          completedAt: item.completedAt,
          createdAt: item.createdAt,

        };
    });
  }

  deleteTask(id: number, listId: number) {
    this.toDoService.deleteTask(listId, id).subscribe((res: any) => {
      if (res) {
        const index = this.tasks.findIndex(x => x.id === id && x.listId === listId);
        if (index >= 0) {
          this.tasks.splice(index, 1);
          this.dataSource.data = this.tasks;
        }
      }
    }, (e) => {
      console.log('deleteTask Error');
    });
  }

  editTask(task: ITask) {
    this.selectedtask = task;
    this.showForm = true;
  }

  addTask() {
    this.selectedtask = undefined;
    this.showForm = true;
  }

  closeTaskForm(event: any) {
    // if (event) {
    //   const index = this.toDoList.findIndex(x => x.id === event.id);
    //   if (index >= 0) {
    //     const todo = this.toDoList.find(x => x.name === event.name && x.id !== event.id);
    //     if (todo) {
    //       this.showForm = false;
    //       alert('to do is exist in list !!!');
    //     } else {
    //       this.toDoList[index] = event;
    //       this.dataSource.data = this.toDoList;
    //     }
    //   } else {
    //     const todo = this.toDoList.find(x => x.name === event.name);
    //     if (todo) {
    //       this.showForm = false;
    //       alert('to do is exist in list !!!');
    //     } else {
    //       event.id = this.toDoList.length + 1;
    //       event.items = 1;
    //       this.toDoList.push(event);
    //       this.dataSource.data = this.toDoList;
    //     }
    //   }
    // }
    this.showForm = false;
  }

}
