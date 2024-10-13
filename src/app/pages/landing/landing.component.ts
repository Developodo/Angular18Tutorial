import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  auth = inject(AuthService);
  router =  inject(Router);
  ngOnInit(){
    if(this.auth.isLoggedIn){
      this.router.navigate(['home']);
    }else{
      this.router.navigate(['/login']);
    }
  }
}
