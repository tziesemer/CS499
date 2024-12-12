import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RescuesDataService } from '../services/rescues-data.service';
import { Rescue } from '../models/rescues';
import { formatDate } from '@angular/common';
import { AuthenticationService } from '../services/authentication-service.service';

@Component({
  selector: 'app-edit-rescue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-rescue.component.html',
  styleUrl: './edit-rescue.component.css'
})


export class EditRescueComponent implements OnInit {
  public editForm!:FormGroup;
  rescue!: Rescue;
  submitted = false;
  message: string='';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rescueDataService: RescuesDataService,
    private authorizationService: AuthenticationService
  ){}

  ngOnInit(): void {
      //Retrieve stashed rescue ID
      let rescueCode = localStorage.getItem("rescueCode");
      if(!rescueCode){
        alert("Something wrong, couldn't find where I stashed rescueCode!");
        this.router.navigate(['']);
        return;
      }
      //Uncomment following lines for debugging
      // console.log('EditRescueComponent::ngOnInit');
      // console.log('rescueCode:' + rescueCode);

      this.editForm = this.formBuilder.group({
        testID: ["", Validators.required],
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

      this.rescueDataService.getRescue(rescueCode)
        .subscribe({
          next:(value: any) => {
            this.rescue = value;
            //Populate our record into the form
            this.editForm.patchValue(value[0]);
            if(!value)
            {
              this.message = 'No Rescue Retrieved!';
            }
            else{
              this.message = 'Rescue: ' + rescueCode + ' retrieved';
            }
            console.log(this.message);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
  }

  public onSubmit()
  {
    this.submitted = true;

    if(this.editForm.valid)
    {
      this.rescueDataService.updateRescue(this.editForm.value, this.authorizationService.getToken())
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['list-rescues']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
    }
  }

  public deleteRescue()
  {
    this.rescueDataService.deleteRescue(this.editForm.value.testID, this.authorizationService.getToken())
      .subscribe({
        next: (value: any) => {
          this.router.navigate(['list-rescues'])
        },
        error: (error: any) => {
          console.log('error: ' + error);
        }
      })
  
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls;}

}

