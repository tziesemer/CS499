import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FiltersService } from '../services/filters.service';
import { SearchMapComponent } from '../search-map/search-map.component';
import { RescuesDataService } from '../services/rescues-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';
import { Rescue } from '../models/rescues';

@Component({
  selector: 'app-search-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, 
    MatSelectModule, MatSortModule, MatCheckboxModule, SearchMapComponent],
  templateUrl: './search-table.component.html',
  styleUrl: './search-table.component.css',
  providers: [RescuesDataService]
})

export class SearchTableComponent implements OnInit, AfterViewInit{
  rescues!: Rescue[];
  message: string = '';

  tempPosition = {
    location_lat: 10.00,
    location_long: 10.00
  }
  startPosition;
  position;
  markerName;
  dataSource = new MatTableDataSource(this.rescues);
  
  private getRescues(): void {
    this.rescueDataService.getRescues()
      .subscribe({
        next: (value: any) => {
          this.rescues = value;
          this.isFiltered("all");
          console.log(this.rescues[0]);
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

  displayedColomns: string[] = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  constructor(
    private filterService: FiltersService,
    private rescueDataService: RescuesDataService,
    private authenticationService: AuthenticationService
  ) {}

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
  }

  async ngOnInit() {
      this.getRescues();
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
    }
  }
