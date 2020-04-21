import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoComponent } from './modules/to-do/to-do.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'to-do', loadChildren: './modules/to-do/to-do.module#ToDoModule',
    canActivate: [AuthGuard] },
  { path: '', redirectTo: '/to-do', pathMatch: 'full' },
  { path: '**', redirectTo: '/to-do', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
