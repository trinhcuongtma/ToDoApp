import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToDoService } from 'src/app/services/to-do.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  isLoginFailed = false;
  constructor(
    private formBuilder: FormBuilder,
    private toDoService: ToDoService,
    private route: Router
  ) {
    this.initializeForm();
   }

  ngOnInit() {
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  login() {
    let username = '';
    let password = '';
    if (this.loginForm) {
      username = this.loginForm.value.username;
      password = this.loginForm.value.password;
    }
    this.toDoService.authenticateUser(username, password).subscribe((res: any) => {
      if (res) {
        localStorage.setItem('apikey', res.apiKey);
        this.route.navigate(['/']);
      }
      this.isLoginFailed = false;
    }, (e) => {
      this.isLoginFailed = true;
      console.log('login false');
    });
  }

}
