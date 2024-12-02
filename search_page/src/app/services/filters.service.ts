import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor() { }


  filterData(data, filter){

    let finalData = [];

    switch(filter){
      case "all":
        finalData = data;
        break;
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
      default:
        finalData = data;
    }

    return finalData;
  }
}
