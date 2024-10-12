import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

export const appConfig: ApplicationConfig = {
  providers: [
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(
      routes, 
      withComponentInputBinding(),
     ),
     provideHttpClient(),
     importProvidersFrom(AngularFireModule.initializeApp(environment.firebaseConfig)),
     importProvidersFrom(AngularFireAuth),
     importProvidersFrom(AngularFireStorageModule) 
    ]
};