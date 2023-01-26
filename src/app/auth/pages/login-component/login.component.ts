import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthApiService} from "../../services/auth-api.service";
import {LoginUser} from "../../models/user.interface";
import {Router} from "@angular/router";
import {AuthAPIResponse} from "../../interfaces/auth-api-response.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {HeaderContentComponent} from "../../../shared/header-content/header-content.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  @ViewChild(HeaderContentComponent, {read: ElementRef}) headerElement!: ElementRef<HTMLElement>;
  headerImageURL: string = "assets/images/gboard-turtle-";
  alertMessage: string = "";
  private isLoggedIn: boolean = false;
  loginUser: LoginUser = {
    mail: "",
    password: ""
  }

  constructor(private authApiService: AuthApiService, private router: Router) {
  }

  changeHeaderImage($event: FocusEvent) {
    const target = $event.target as HTMLInputElement;
    const imgElement = this.headerElement.nativeElement.querySelector("img")!;

    imgElement.src = this.headerImageURL + "closed.png";

    target.addEventListener("blur", () => {
      imgElement.src = this.headerImageURL + "open.png";
    });
  }

  login($event: SubmitEvent) {
    $event.preventDefault();
    const {mail, password} = this.loginUser;
    if (mail === "" || password === "") {
      this.alertMessage = "Por favor complete todos los campos";
      return;
    }
    this.authApiService.login(this.loginUser)
      .subscribe({
        next: ({header, data}: AuthAPIResponse) => {
          if (header.resultCode === 0) {
            this.isLoggedIn = true;
            this.redirectUser(this.isLoggedIn, data.user.name);
          } else {
            this.alertMessage = this.setAlertMessage(header.resultCode);
          }
        },
        error: ({error}: HttpErrorResponse) => {
          this.alertMessage = this.setAlertMessage(error.header.resultCode);
        }
      });
  }

  private setAlertMessage(resultCode: number): string {
    let message: string;
    switch (resultCode) {
      case 1:
        message = "Mail ya registrado";
        break;
      case 2:
        message = "Error en la validación";
        break;
      case 3:
        message = "Usuario no encontrado";
        break;
      case 4:
        message = "Contraseña inválida";
        break;
      case 5:
        message = "Revisá los campos";
        break;
      default:
        message = "Error desconocido";
    }
    return message;
  }

  private redirectUser(userAuthorized: boolean, userName: string): void {
    if (userAuthorized) {
      localStorage.setItem("currentUser", JSON.stringify({name: userName}));
      this.router.navigate(["/home"]);
    }
  }
}
