import {NgModule} from "@angular/core";
import {LoginComponent} from "./pages/login-component/login.component";
import {RegisterComponent} from "./pages/register-component/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ]
})
export class AuthModule {
}
