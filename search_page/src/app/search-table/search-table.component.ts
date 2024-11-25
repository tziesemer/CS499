import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rescues } from '../data/resucues';


@Component({
  selector: 'app-search-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-table.component.html',
  styleUrl: './search-table.component.css'
})
export class SearchTableComponent implements OnInit {

  rescues: Array<any> = rescues;

  selectedValue: string = '0'; // Default value
  
  onSelectionChange(e: any){
    console.log('Selected option:', e.target.value);
  }
  constructor() {}

  ngOnInit(): void {
      
  }

}
