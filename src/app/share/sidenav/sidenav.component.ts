import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/services/to-do.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private toDoService: ToDoService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.toDoService.logout().subscribe((res: any) => {
      if (res) {
        localStorage.removeItem('apikey');
        window.location.reload();
      }
    }, (e) => {
      console.log('logout false');
    });
  }

}
