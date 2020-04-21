import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './to-do.component';

const toDoRoutingRoutes: Routes = [
  {
    path: '',
    component: ToDoComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(toDoRoutingRoutes) ],
  exports: [ RouterModule ]
})
export class ToDoRoutingModule { }
