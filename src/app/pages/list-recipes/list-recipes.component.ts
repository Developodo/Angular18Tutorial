import { ChangeDetectionStrategy, Component, computed, inject, input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {takeUntilDestroyed, toSignal}  from '@angular/core/rxjs-interop'
import { JsonPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcumbService } from '../../services/breadcrumb.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { FireService } from '../../services/fire.service';


@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [JsonPipe,NgClass,ModalComponent],
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRecipesComponent {
  apiS =inject(ApiService);
  router=inject(Router);
  bcService=inject(BreadcumbService);
  fireService=inject(FireService);

  type = input.required<string>(); 
  ingredient = input<string>(); 

  $state:WritableSignal<any>=signal({
    data: null,
    loading:true,
    error:null
  })

  ngOnInit(){
    if(this.type()!=undefined){
      this.bcService.change = {
        level: 1,
        label: this.ingredient() as any,
        routerLink: `/recipes/${this.type()}/${this.ingredient()}` 
      }
    }else{
      this.bcService.change = {
        level: 0,
        label: 'Favoritas',
        routerLink: `/recipes/favorites` 
      }
    }
    this.fetchData();
  }

  fetchData(){
    this.$state.update(state=>{
      return {...state,loading:true}
    });
    let request;

    switch (this.type()) {
      case 'category':
        request = this.apiS.getRecipesByCategory(this.ingredient() as any);
        break;
      case 'country':
        request = this.apiS.getRecipesByCountry(this.ingredient() as any);
        break;
      default:
        //get favorites
        request = this.fireService.getRecipes();//  this.fireService.getUserRecipes();
    }
    request?.subscribe({
      next: (data:any) => {
        this.$state.update(state=>{
          return {...state,loading:false,data:data?.meals}
        });
      },
      error: (error:any) => {
        this.$state.update(state=>{
          return {...state,loading:false,data:[],error:error}
        });
      }
    })
  }

  goToRecipe(idMeal: string) {
    this.router.navigate(['recipe', idMeal]);
  }


  isModalOpen = false; // Propiedad para controlar el estado del modal

  openModal() {
    this.isModalOpen = true; // Método para abrir el modal
    history.pushState({}, document.title);

  }
  closeModal($event?: any){
    if($event){
      //process
    }
    this.isModalOpen = false;
  }
}
