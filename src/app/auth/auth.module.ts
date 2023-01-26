import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login-component/login.component';
import {RegisterComponent} from './register-component/register.component';
import {HomeComponent} from './home/home.component';


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
