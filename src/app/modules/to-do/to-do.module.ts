import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ToDoComponent } from './to-do.component';
import { ToDoRoutingModule } from './to-do-routing.module';
import { ListComponent } from './list/list.component';
import { ListFormComponent } from './list/list-form/list-form.component';
import { TaskComponent } from './list/list-form/task/task.component';
import { TaskFormComponent } from './list/list-form/task/task-form/task-form.component';

@NgModule({
  declarations: [ToDoComponent, TaskComponent, ListComponent, ListFormComponent, TaskFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    CdkTableModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    ToDoRoutingModule
  ]
})
export class ToDoModule { }
