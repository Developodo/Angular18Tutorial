import { Component, effect, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { RouterLink } from '@angular/router';
import { BreadcumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcumb',
  standalone: true,
  imports: [JsonPipe,RouterLink,CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcumbComponent{
    bcService=inject(BreadcumbService);
    home={label: ' Inicio',routerLink: '/home'}
    path:any=[];  //por culpa de breadcumb que no actualiza si no muta el array

    constructor(){
      effect(()=>{this.path=[...this.bcService.$path().path]});
      
  }
   
}
