import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],  //only for debugging purposes
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  apiS = inject(ApiService);
  router = inject(Router);

  $state:WritableSignal<any>=signal({
    type: 'category',
    data: null,
    loading:true,
    error:null
  });

  @Input()
  set type(type: string) {
    let request;
    switch (type) {
      case 'country':
        request = this.apiS.getCountries();
        break;
      default:
        request = this.apiS.getCategories();
    }

    request.subscribe({
      next: (data:any) => {
        this.$state.set({type:type, data:data?.meals.map((item:any) => {
          if (item.strArea) {
            return {
              name: item.strArea}
          }else{
            return {
              name: item.strCategory
            }
          }
        }), loading:false, error:null});
      },
      error: (error) => {
        this.$state.set({type:type, data:[], loading:false, error});
      }
    })
  }

  async  listRecipes(ingredient: string) {
    await this.router.navigate(['recipes', this.$state().type, ingredient]);
  }
}
