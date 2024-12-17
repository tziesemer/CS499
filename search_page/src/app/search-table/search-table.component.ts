import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FiltersService } from '../services/filters.service';
import { rescue_outcomes } from '../data/aac_shelter_outcomes';
import { SearchMapComponent } from '../search-map/search-map.component';


@Component({
  selector: 'app-search-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, 
    MatSelectModule, MatSortModule, MatCheckboxModule, SearchMapComponent],
  templateUrl: './search-table.component.html',
  styleUrl: './search-table.component.css'
})

export class SearchTableComponent implements AfterViewInit {
 
//Pulls in rescue data from rescue_outcomes
  realRescues: Array<any> = rescue_outcomes;

  // Sets a starting position based on the pulled data for the search-map component
  startPosition = this.realRescues[0];
  position = {
    lat: this.startPosition.location_lat,
    lng: this.startPosition.location_long
  };

  markerName = this.startPosition.name;
//This controls which coloums are shown in the html table
  displayedColomns: string[] = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype'];
//This sets the data source for the table
  dataSource = new MatTableDataSource(this.realRescues);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  constructor(
    //This creates the filter service so it can be utilized later
    private filterService: FiltersService
  ) {}
//Function activated by the radio buttons in the table. Updates the map based on which row is selected
  public thisSelected(value): void {
    let newMarker = {
      lat: value.location_lat,
      lng: value.location_long
    }
    this.position = newMarker;

    //If name is empty then the markerName will just display No name rather than being empty or showing no data
    if(value.name != ""){
    this.markerName = value.name;
    }
    else {
      this.markerName = "No name";
    }
  }
//Function activated whenever a filter radio button is selected to call the filter function from the filter service
  public isFiltered(value): void {
    
    let finalData = this.filterService.filterData(this.realRescues, value);
    //Resets table data to mach filtered data
    this.dataSource.data = finalData;
  }

  async ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.startPosition.name != ""){
        this.markerName = this.startPosition.name;
      }
      else {
        this.markerName = "No name";
      }
      
    }
  }
