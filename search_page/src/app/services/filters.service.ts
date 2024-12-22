import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(
  ) { }

  filterData(data, filter){

    let finalData = [];

    console.log("in filterData");

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

  searchBreed(data, searchBreedTerm){

    let finalData = [];
    console.log("In searchBreed");
    console.log(searchBreedTerm);

    data.forEach((element) => {
      if(element.breed.toLowerCase().includes(searchBreedTerm.toLowerCase())){
        finalData.push(element);
      }
    })

    return finalData;
  }

  pieData(data): Observable<any[]> {
    let total = {
      'breed': '',
      'amount': 0
    }
    let breeds = [];
    for(let element of data) {
      let isFound = false;
      for (let item of breeds) {
        if(item.breed == element.breed){
          item.amount += 1;
          isFound = true;
          break;
        }
      }
      if(isFound == false){
        total.breed = element.breed;
        total.amount = 1;
        breeds.push(total);
      }
    }
    return of(breeds);
  }
}
