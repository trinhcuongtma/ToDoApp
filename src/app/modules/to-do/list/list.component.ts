import { Component, OnInit } from '@angular/core';
import { IList } from 'src/app/types/interface';
import { ToDoService } from 'src/app/services/to-do.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[];
  toDoList: IList[];
  selectedList: IList;
  showForm = false;
  dataSource: MatTableDataSource<IList>;
  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    this.displayedColumns = ['id', 'name', 'tasks', 'action'];
    this.getToDoList();
  }

  getToDoList() {
    this.toDoService.getToDoList().subscribe((res: any) => {
      if (res) {
        this.toDoList = res;
        this.dataSource = new MatTableDataSource<IList>(res);
        console.log(res);
      }
    }, (e) => {
      console.log('getToDoList Error');
    });
  }

  deleteList(id: number) {
    this.toDoService.deleteToDoList(id).subscribe((res: any) => {
      if (res) {
        const index = this.toDoList.findIndex(x => x.id === id);
        if (index >= 0) {
          this.toDoList.splice(index, 1);
          this.dataSource.data = this.toDoList;
        }
      }
    }, (e) => {
      console.log('deleteToDoList Error');
    });
  }

  editList(list: IList) {
    this.selectedList = list;
    this.showForm = true;
  }

  addList() {
    this.selectedList = undefined;
    this.showForm = true;
  }

  closeToDoForm(event: any) {
    if (event) {
      const index = this.toDoList.findIndex(x => x.id === event.id);
      if (index >= 0) {
        const todo = this.toDoList.find(x => x.name === event.name && x.id !== event.id);
        if (todo) {
          this.showForm = false;
          alert('to do is exist in list !!!');
        } else {
          this.toDoList[index] = event;
          this.dataSource.data = this.toDoList;
        }
      } else {
        const todo = this.toDoList.find(x => x.name === event.name);
        if (todo) {
          this.showForm = false;
          alert('to do is exist in list !!!');
        } else {
          event.id = this.toDoList.length + 1;
          event.items = 1;
          this.toDoList.push(event);
          this.dataSource.data = this.toDoList;
        }
      }
    }
    this.showForm = false;
  }

}
