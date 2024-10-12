import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getCountries(){
    return this.http.get(environment.api.nationalities);
  }
  getCategories(){
    console.log(environment.api.categories);
    return this.http.get(environment.api.categories);
  }
  getRecipesByCategory(category:string){
    return this.http.get(environment.api.listByCategory+category);
  }
  getRecipesByCountry(country:string){
    return this.http.get(environment.api.listByCountry+country);
  }
  getRecipeById(id:string){
    return this.http.get(environment.api.viewRecipe+id);
  }
}
