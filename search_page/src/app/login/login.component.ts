import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';
import { User } from '../models/users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public formError: string = '';
  submitted = false;

  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ){}

  ngOnInit(): void {
    
  }

  public onLoginSubmit(): void {
    console.log('In onLoginSubmit');
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name){
      console.log('no credentials');
      this.formError =  'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
    } else {
      console.log('credentials accepted');
      this.doLogin();
    }
  }

  public doLogin(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email,
      password: this.credentials.password
    } as User;

    //console.log('LoginComponent::doLogin');
    //console.log(this.credentials);
    this.authenticationService.login(newUser);

    if(this.authenticationService.isLoggedIn()){
      console.log('Router direct');
      this.router.navigate(['list-rescues']);
    } else {
      var timer = setTimeout(() => {
        if(this.authenticationService.isLoggedIn()){
          //console.log('Router pause');
          this.router.navigate(['list-rescues']);
        }
      }, 1000);
    }
  }

}
