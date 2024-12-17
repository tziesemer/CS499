import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(
  ) { }
//Function to take in the array of documents and use the provided filter to return a filtered array
  filterData(data, filter){
//finalData is the array to be sent back after filter is applied
    let finalData = [];

    switch(filter){
      case "all":
        finalData = data;
        break;
        // Each filter takes the smallest component of breed to search through the provided data then the sex_upon_outcome and age are checked.
      case "water":
        data.forEach((element) => {
          if((element.breed.includes('Newf') || element.breed.includes('Chesa') || element.breed.includes('Lab')) && element.sex_upon_outcome == "Intact Female" && (element.age_upon_outcome_in_weeks >= 26.0 && element.age_upon_outcome_in_weeks <= 156)){
            finalData.push(element);
          }
        })
        break;
      case "mountain":
        data.forEach((element) => {
          if((element.breed.includes('German') || element.breed.includes('Mala') || element.breed.includes('Old English') || element.breed.includes('Husk') || element.breed.includes('Rott')) && element.sex_upon_outcome == "Intact Male" && (element.age_upon_outcome_in_weeks >= 26.0 && element.age_upon_outcome_in_weeks <= 156)){
            finalData.push(element);
          }
        })
        break;
      case "disaster":
        data.forEach((element) => {
          if((element.breed.includes('German') || element.breed.includes('Golden') || element.breed.includes('Blood') || element.breed.includes('Dober') || element.breed.includes('Rott')) && element.sex_upon_outcome == "Intact Female" && (element.age_upon_outcome_in_weeks >= 20.0 && element.age_upon_outcome_in_weeks <= 300)){
            finalData.push(element);
          }
        })
        break;
        //If all or a not applicable filter are sent through then the data is returned unfiltered 
      default:
        finalData = data;
    }

    return finalData;
  }

}
