import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore, collection, addDoc, collectionData, getDocs,doc,query, orderBy } from '@angular/fire/firestore';


interface Recipe {
  id?: string;
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
  private firestore = inject(Firestore);


  /*DB:any = inject(AngularFireDatabase);
  recipesDB: AngularFireList<any> | any;*/

  constructor(
    private authService: AuthService
  ) { 
    
  }
   async createRecipe(recipe: Recipe={id:"0",strMeal:"",strMealThumb:"",strInstructions:"",strYoutube:"",strIngredient:""}): Promise<any> {

    const usersRef = collection(this.firestore, 'users');
    const newChat = await addDoc(usersRef, {
      participants: 89,
      lastMessage: '',
      lastMessageTimestamp: 89,
    });

    /*console.log(this.firestore.app.options)
    const itemsCollection = collection(this.firestore, '/users');
    const items$ = collectionData(itemsCollection);
    items$.subscribe((data:any) => console.log(data), (error:any) => console.log(error));*/
    //addDoc(itemsCollection, recipe);
    
    //ref.valueChanges().subscribe(console.log)
    /*firebase.initializeApp(environment.firebaseConfig);
    const dbref= firebase.database().ref('/test');
    console.log(dbref);
    
    dbref.push({test:"hola"});*/

        /*firebase.initializeApp(environment.firebaseConfig);
        firebase.firestore().settings({
           experimentalForceLongPolling: true } 
        )
        console.log(firebase.firestore().collection('users'))*/
        //console.log(this.userCollection);
        //firebase.firestore().collection('users').add(recipe);
       
        /*if (this.authService.getUserId()) {
          return addDoc(recipesCollection, recipe);
        } else {
          throw new Error('User not authenticated');
        }*/
       return null;
  }
/*
  getUserRecipes(): Observable<Recipe[]> {
        if (this.authService.getUserId()) {
          return collectionData<any>(this.userCollection);
        } else {
          return of([]);
        }

  }
  updateRecipe(recipeReference: any, recipe: Recipe): Promise<any> {
        if (this.authService.getUserId()) {
          return updateDoc(recipeReference, recipe);
        } else {
          throw new Error('User not authenticated');
        }
  }
  deleteRecipe(recipeReference: any): Promise<any> {
    if (this.authService.getUserId()) {
      return deleteDoc(recipeReference);
    } else {
      throw new Error('User not authenticated');
    }
  }*/
}
