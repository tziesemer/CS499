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
  filterData!: Rescue[];
  currentSearchTerm: string = 'all';
  inputText: string = '';

  tempPosition = {
    location_lat: 10.00,
    location_long: 10.00
  }
  startPosition;
  position;
  markerName;
  dataSource = new MatTableDataSource(this.rescues);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  constructor(
    private filterService: FiltersService,
    private rescueDataService: RescuesDataService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

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

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public addRescue(): void {
    this.router.navigate(['add-rescue']);
  }

  public editRescue(rescue: Rescue) {
    localStorage.removeItem('rescueCode');
    localStorage.setItem('rescueCode', rescue.testID);
    this.router.navigate(['edit-rescue']);
  }


  public thisSelected(value): void {
    let newMarker = {
      lat: value.location_lat,
      lng: value.location_long
    }
    this.position = newMarker;
    if(value.name != ""){
    this.markerName = value.name;
    }
    else {
      this.markerName = "No name";
    }
  }

  public isFiltered(value): void {
    
    let finalData = this.filterService.filterData(this.rescues, value);
    this.dataSource.data = finalData;
    this.updateColums();
    this.currentSearchTerm = value;
    this.filterData = finalData;
  }

  public searchBreed(): void {
    
    let value = this.inputText;

    let finalData = [];
    if(!value){
        //console.log(value);
        finalData = this.filterService.filterData(this.rescues, this.currentSearchTerm);
    }
    else{
      finalData = this.filterService.searchBreed(this.filterData, value);
    }
    this.dataSource.data = finalData;
    this.updateColums();
  }

  private updateColums(){
    if(this.authenticationService.isLoggedIn()){
      this.displayedColomns = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype', 'edit_rescue'];
     }
     else{
      this.displayedColomns = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype'];
     }
  }
  async ngOnInit() {

      this.getRescues();

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.getRescues();
        }
      });
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

      if(this.authenticationService.isLoggedIn()){
        this.displayedColomns = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype', 'edit_rescue'];
       }
       else{
        this.displayedColomns = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype'];
       }
    }
  }
