import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login-component/login.component';
import {RegisterComponent} from './pages/register-component/register.component';
import {HomeComponent} from './pages/home/home.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule {
}
