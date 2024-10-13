import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'landing',
        component:LandingComponent,
    },
    {
        path: 'login',
        loadComponent: () => import('../app/pages/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'home/:type',
        loadComponent: () => import('../app/pages/home/home.component').then((m) => m.HomeComponent),
        canActivate: [authGuard],
    },
    {
        path: 'home',
        redirectTo: 'home/category',
        pathMatch: 'full',
    },
    {
        path: 'recipes/:type/:ingredient',
        loadComponent: () => import('../app/pages/list-recipes/list-recipes.component').then((m) => m.ListRecipesComponent),
        canActivate: [authGuard],
    },
    {
        path: 'recipes/favorites',
        loadComponent: () => import('../app/pages/list-recipes/list-recipes.component').then((m) => m.ListRecipesComponent),
        canActivate: [authGuard],
    },
    {
        path: 'recipe/:id',
        loadComponent: () => import('../app/pages/view-recipe/view-recipe.component').then((m) => m.ViewRecipeComponent),
        canActivate: [authGuard],
    },
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
    },
    { path: '**', component: ErrorPageComponent }
];
