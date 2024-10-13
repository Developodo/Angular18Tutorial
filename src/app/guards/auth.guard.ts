import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authS = inject(AuthService);
   let router = inject(Router);
   if(!authS.isLoggedIn){
     router.navigate(['login']);
     return false;
   }
   return true;
};
