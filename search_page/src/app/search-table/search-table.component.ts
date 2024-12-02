import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { rescues } from '../data/testData';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FiltersService } from '../services/filters.service';
import { rescue_outcomes } from '../data/aac_shelter_outcomes';

@Component({
  selector: 'app-search-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, 
    MatSelectModule, MatSortModule, MatCheckboxModule],
  templateUrl: './search-table.component.html',
  styleUrl: './search-table.component.css'
})

export class SearchTableComponent implements AfterViewInit {
  rescues: Array<any> = rescues;
  realRescues: Array<any> = rescue_outcomes;
  displayedColomns: string[] = ['select','name', 'animal_type', 'age_upon_outcome', 'breed', 'sex_upon_outcome', 'outcome_type', 'outcome_subtype'];
  dataSource = new MatTableDataSource(this.realRescues);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  constructor(
    private filterService: FiltersService
  ) {}
  public thisSelected(value): void {
    console.log(value);
  }

  public isFiltered(value): void {
    
    let finalData = this.filterService.filterData(this.realRescues, value);
    this.dataSource.data = finalData;
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

}
