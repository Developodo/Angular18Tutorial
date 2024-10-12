import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: User | null = null;
  private firstAttempt: boolean = true;

  constructor(public auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user as any;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        //router.navigate(['']);
      } else {
        localStorage.setItem('user', 'null');
        this.userData=null;
        //router.navigate(['login']);
      }
    });
  }
  async login(): Promise<any> {
    try {
      await this.auth.signInWithPopup(new GoogleAuthProvider());
      return null;
    } catch (err) {
      console.log(`DEV: ${err}`)
      return err;
    }
  }
  async logout(): Promise<any> {
    console.log("Logout");
    try {
      await this.auth.signOut();
      return null;
    } catch (err) {
      return err;
    }
  }

  get isLoggedIn(): boolean {
    //only for testing
    return true;
         if(this.userData === null && this.firstAttempt){
            this.firstAttempt = false;
            this.userData = JSON.parse(localStorage.getItem('user')!);
         }
         const user = this.userData;
         return user !== null && user?.emailVerified !== false ? true : false;
  }
}
