import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FiltersService } from '../services/filters.service';
import { SearchMapComponent } from '../search-map/search-map.component';
import { RescuesDataService } from '../services/rescues-data.service';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';
import { Rescue } from '../models/rescues';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, 
    MatSelectModule, MatSortModule, MatCheckboxModule, SearchMapComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './search-table.component.html',
  styleUrl: './search-table.component.css',
  providers: [RescuesDataService]
})

export class SearchTableComponent implements OnInit, AfterViewInit{

  rescues!: Rescue[];
  message: string = '';
  displayedColomns: string[];
  searchControl = new FormControl();

  //Used to hold current filtered data for use in searchBreed
  filterData!: Rescue[];
  //Used to hold the current filter term for use in searchBreed
  currentSearchTerm: string = 'all';

  inputText: string = '';
  //Position base until data is loaded from database
  tempPosition = {
    location_lat: 10.00,
    location_long: 10.00
  }

  startPosition;
  position;
  markerName;
  //Sets rescues data as data for the table
  dataSource = new MatTableDataSource(this.rescues);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  constructor(
    private filterService: FiltersService,
    private rescueDataService: RescuesDataService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  //Grabs rescues from database initially to fill out table
  private getRescues(): void {
    this.rescueDataService.getRescues()
      .subscribe({
        next: (value: any) => {
          this.rescues = value;
          this.isFiltered("all");
          if(value.length > 0){
            this.message = 'There are ' + value.length + ' rescues available.';
          }
          else{
            this.message = 'There are no rescues found in database!';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  //Checks if user is logged in and used to show options in html
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  //Moves to the addRescue page
  public addRescue(): void {
    this.router.navigate(['add-rescue']);
  }

  public editRescue(rescue: Rescue) {
    //Empties localStorage and then sets rescueCode to current selected testID
    localStorage.removeItem('rescueCode');
    localStorage.setItem('rescueCode', rescue.testID);
    //Then moves to the editRescue page
    this.router.navigate(['edit-rescue']);
  }

  public thisSelected(value): void {
    //sets position to new location of selected rescue
    let newMarker = {
      lat: value.location_lat,
      lng: value.location_long
    }
    this.position = newMarker;

    //sets marker name to selected rescue's name
    if(value.name != ""){
    this.markerName = value.name;
    }
    //If a name isn't found then name is set to no name
    else {
      this.markerName = "No name";
    }
  }

  //Despite name actually filters data doesn't check if it is filtered
  public isFiltered(value): void {
    //finalData is set by calling filterData from the filter service
    let finalData = this.filterService.filterData(this.rescues, value);
    //Once filtered data is retrieved it is mapped to the table data
    this.dataSource.data = finalData;
    this.updateColums();
    //Set currentSearchTerm and filterData for use in searchBreed function
    this.currentSearchTerm = value;
    this.filterData = finalData;
  }

  //Function to search by breed from the html
  public searchBreed(): void {
    
    //pulls inputText from text input in html
    let value = this.inputText;

    let finalData = [];
    //If the value is empty resets table data to current filter
    if(!value){
        //console.log(value);
        finalData = this.filterService.filterData(this.rescues, this.currentSearchTerm);
    }
    //If the value isn't empty then the current filtered data and the value is passed to the filterService to search by breed
    else{
      finalData = this.filterService.searchBreed(this.filterData, value);
    }
    //Once the final data is retrieved it is mapped to the table data
    this.dataSource.data = finalData;
    this.updateColums();
  }

  //Used to set displayed colomns based on if user is logged in or not
  private updateColums(){
    if(this.authenticationService.isLoggedIn()){
      this.displayedColomns = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype', 'edit_rescue'];
     }
     else{
      this.displayedColomns = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype'];
     }
  }

  async ngOnInit() {

      //Calls getRescues to retrieve rescues data from database
      this.getRescues();

      //Whenever search-table becomes the main page again we pull database for fresh table data
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.getRescues();
        }
      });
      
      //If we log out then displayed colomns must be updated to get rid of edit option
      this.authenticationService.loggedOut().subscribe(event => {
        console.log("logged out maybe?");
        this.updateColums();
      })
    }
    
    async ngAfterViewInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.startPosition = this.tempPosition;

      this.position = {
        lat: this.startPosition.location_lat,
        lng: this.startPosition.location_long
      };

      if (this.startPosition.name != ""){
        this.markerName = this.startPosition.name;
      }
      else {
        this.markerName = "No name";
      }

      //If logged in then user will see edit option
      if(this.authenticationService.isLoggedIn()){
        this.displayedColomns = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype', 'edit_rescue'];
       }
       //Else user will not see edit option
       else{
        this.displayedColomns = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype'];
       }
    }
  }
