import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { RescuesDataService } from '../services/rescues-data.service';
import { AuthenticationService } from '../services/authentication-service.service';

@Component({
  selector: 'app-add-rescue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-rescue.component.html',
  styleUrl: './add-rescue.component.css'
})

export class AddRescueComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rescueService: RescuesDataService,
    private authorizationService: AuthenticationService
  ){}

  ngOnInit(): void {
      this.addForm = this.formBuilder.group({
        ID: ["", Validators.required],
        age_upon_outcome: ["", Validators.required],
        animal_id: ["", Validators.required],
        animal_type: ["", Validators.required],
        breed: ["", Validators.required],
        color: ["", Validators.required],
        date_of_birth: ["", Validators.required],
        name: ["", Validators.required],
        outcome_subtype: ["", Validators.required],
        outcome_type: ["", Validators.required],
        sex_upon_outcome: ["", Validators.required],
        location_lat: ["", Validators.required],
        location_long: ["", Validators.required],
        age_upon_outcome_in_weeks: ["", Validators.required],
      })
  }

  public onSubmit(){
    this.submitted = true;
    if(this.addForm.valid){
      this.rescueService.addRescue(this.addForm.value, this.authorizationService.getToken())
      .subscribe({
        next: (data:any) =>{
          console.log(data);
          this.router.navigate(['list-rescues']);
        },
        error: (error:any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }
  // get the form short name to access the form fields
  get f() { return this.addForm.controls;}

}

