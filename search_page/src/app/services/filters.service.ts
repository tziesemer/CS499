import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(
  ) { }

  filterData(data, filter){

    let finalData = [];

    switch(filter){
      //If filter term is all or doesn't match a the other options then all data is returned
      case "all":
        finalData = data;
        break;
      //The three main terms will filter data based on required breed, age, and sex of rescue 
      //Then if the item meeets the criteria it is added to finalData 
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
    //finalData is returned to calling function
    return finalData;
  }

  searchBreed(data, searchBreedTerm){

    let finalData = [];
    //Checks each element in provided data to see if they have the searchBreedTerm in their breed field
    data.forEach((element) => {
      if(element.breed.toLowerCase().includes(searchBreedTerm.toLowerCase())){
        //If they do then it is added to the finalData to be sent back to the calling function
        finalData.push(element);
      }
    })

    return finalData;
  }

}
