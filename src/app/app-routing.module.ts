import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "../../../loginPractica/src/app/auth/pages/login/login.component";
import {RegistroComponent} from "../../../loginPractica/src/app/auth/pages/registro/registro.component";
import {HomeComponent} from "../../../loginPractica/src/app/auth/pages/home/home.component";
import {PageNotFoundComponent} from "../../../loginPractica/src/app/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
