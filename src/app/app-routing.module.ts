import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'modules',
    loadChildren: () => import('./pages/modules/modules.module').then( m => m.ModulesPageModule)
  },
  {
    path: 'exercise',
    loadChildren: () => import('./pages/exercise/exercise.module').then( m => m.ExercisePageModule)
  },
  {
    path: 'exercise-detail/:id',
    loadChildren: () => import('./pages/exercise-detail/exercise-detail.module').then( m => m.ExerciseDetailPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'create-adult',
    loadChildren: () => import('./pages/create-adult/create-adult.module').then( m => m.CreateAdultPageModule)
  },
  {
    path: 'create-session',
    loadChildren: () => import('./pages/create-session/create-session.module').then( m => m.CreateSessionPageModule)
  },
  {
    path: 'adults-info',
    loadChildren: () => import('./pages/adults-info/adults-info.module').then( m => m.AdultsInfoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
