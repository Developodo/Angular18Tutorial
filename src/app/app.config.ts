import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import {  FIREBASE_OPTIONS} from '@angular/fire/compat';
import { SETTINGS as USE_FIRESTORE_SETTINGS, } from '@angular/fire/compat/firestore'
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(
      routes, 
      withComponentInputBinding(),
     ),
     provideHttpClient(),
     { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
     {
      provide: USE_FIRESTORE_SETTINGS,
      useValue: { experimentalForceLongPolling: true,ignoreUndefinedProperties: true},
    },
     //importProvidersFrom(AngularFireModule.initializeApp(environment.firebaseConfig)),importProvidersFrom(AngularFireAuth),
     provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
     provideFirestore(() => getFirestore()),
     provideAuth(() => getAuth()),
     
    ]
};