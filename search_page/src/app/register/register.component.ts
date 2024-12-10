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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

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

  public onRegisterSubmit(): void {
    console.log('In onRegisterSubmit');
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name){
      this.formError =  'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
    } else {
      console.log('credentials accepted');
      this.registerUser();
    }
  }


  public registerUser(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email,
      password: this.credentials.password
    } as User;

    //console.log('LoginComponent::doLogin');
    //console.log(this.credentials);
    this.authenticationService.register(newUser);

    this.router.navigate(['list-trips']);
  }

}
