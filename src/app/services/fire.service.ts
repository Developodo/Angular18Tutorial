import { inject, Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection,DocumentReference } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';




interface Recipe {
  idMeal?: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube?: string;
  strIngredient:string
}

@Injectable({
  providedIn: 'root'
})
export class FireService {
  private firestore = inject(AngularFirestore);
  private itemsCollection: AngularFirestoreCollection<any>;
  items!: Observable<any[]>;


  /*DB:any = inject(AngularFireDatabase);
  recipesDB: AngularFireList<any> | any;*/

  constructor(
    private authService: AuthService
  ) { 
    this.itemsCollection = this.firestore.collection<any>(`users/${this.authService.getUserId()}/recipes`);
    this.items = this.itemsCollection.valueChanges();
  }
   createRecipe(recipe: Recipe={strMeal:"",strMealThumb:"",strInstructions:"",strYoutube:"",strIngredient:""}): Promise<DocumentReference<any>> {
    return this.itemsCollection.add(recipe);
   }
   deleteRecipe(id: string): Promise<void> {
    return this.itemsCollection.doc(id).delete();
   }
   updateRecipe(recipe: Recipe): Promise<void> {
    return this.itemsCollection.doc(recipe.idMeal).update(recipe);
   }  
   getRecipes(): Observable<any> {
    return this.items.pipe(
      map((recipes: Recipe[]) => ({
        meals: recipes.map(recipe => ({
          ...recipe,
          idMeal: recipe.idMeal // Asegúrate de que el idMeal esté presente
        }))
      }))
    );
   }
   getRecipeById(id: string): Observable<any> {
    return this.itemsCollection.doc(id).valueChanges().pipe(map(recipe => ({
      ...recipe,
      idMeal: recipe.idMeal // Asegúrate de que el idMeal esté presente
    })))
   }
}
