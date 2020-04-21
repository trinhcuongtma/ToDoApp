import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ITask, IList, IRequestCreateTask, IRequestModifyTask } from 'src/app/types/interface';
import { ToDoService } from 'src/app/services/to-do.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  dataSource: MatTableDataSource<ITask>;
  taskForm: FormGroup | any;
  buttonLabel = 'Add';
  constructor(
    private toDoService: ToDoService,
    private formBuilder: FormBuilder,
  ) {
    this.displayedColumns = ['id', 'name', 'completed', 'action'];
    this.initializeForm();
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

  initializeForm() {
    this.taskForm = this.formBuilder.group({
      name: new FormControl(null),
      completed: new FormControl(false),
    });
  }

  setFormData() {
    if (this.selectedtask) {
      this.taskForm.controls.name.setValue(this.selectedtask.name);
      this.taskForm.controls.completed.setValue(this.selectedtask.completed);
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

  deleteTask(id: number, listId: number) {
    this.toDoService.deleteTask(this.list.id, id).subscribe((res: any) => {
      if (res) {
        const index = this.tasks.findIndex(x => x.id === id && x.list_id === listId);
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
    this.buttonLabel = 'Update';
    this.setFormData();
  }

  saveTask() {
    if (this.selectedtask) {
      this.modifyTask();
    } else {
      this.addTask();
    }
  }

  addTask() {
    if (this.taskForm) {
      const task: IRequestCreateTask = {
        completed: this.taskForm.value.completed,
        name: this.taskForm.value.name,
      };
      this.toDoService.createTask(this.list.id, task).subscribe((res: any) => {
        if (res) {
          this.tasks.push(res);
          this.dataSource.data = this.tasks;
          this.clearForm();
        }
      }, (e) => {
        console.log('addTask has Error');
      });
    }
  }

  modifyTask() {
    if (this.taskForm) {
      const task: IRequestModifyTask = {
        completed: this.taskForm.value.completed,
        name: this.taskForm.value.name,
        listId: this.list.id
      };
      this.toDoService.modifyTask(this.selectedtask.id, task).subscribe((res: any) => {
        if (res) {
          const index = this.tasks.findIndex(x => x.id === res.id);
          this.tasks[index] = res;
          this.dataSource.data = this.tasks;
          this.clearForm();
        }
      }, (e) => {
        console.log('modifyTask has Error');
      });
    }
  }

  clearForm() {
    if (this.taskForm) {
      this.taskForm.controls.name.setValue(null);
      this.taskForm.controls.completed.setValue(false);
      this.selectedtask = undefined;
    }
  }

}
