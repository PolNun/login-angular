import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {HeaderContentComponent} from "../../../shared/header-content/header-content.component";
import {RegisterUser} from "../../models/user.interface";
import {AuthApiService} from "../../services/auth-api.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthAPIResponse} from "../../interfaces/auth-api-response.interface";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild(HeaderContentComponent, {read: ElementRef}) headerElement!: ElementRef<HTMLElement>;
  headerImageURL: string = "assets/images/gboard-turtle-fruit.png";

  registerUser: RegisterUser = {
    name: "",
    mail: "",
    password: ""
  }
  public alertMessage: string = "";

  constructor(private authApiService: AuthApiService, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.changeHeaderImage();
  }

  changeHeaderImage() {
    const imgElement = this.headerElement.nativeElement.querySelector("img")!;
    imgElement.src = this.headerImageURL;
  }

  validateName(): boolean {
    let regexName = RegExp("^[a-zA-ZÀ-ÿ]{5,15}$");
    return !regexName.test(this.registerUser.name);

  }

  validateMail(): boolean {
    let regexMail = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");
    return !regexMail.test(this.registerUser.mail);
  }

  validatePassword(): boolean {
    let regexPassword = RegExp("^[a-zA-Z\\d\\s]{8,30}$");
    return !regexPassword.test(this.registerUser.password)
  }

  register($event: SubmitEvent) {
    $event.preventDefault();
    this.authApiService.register(this.registerUser)
      .subscribe({
        next: (response: AuthAPIResponse) => {
          if (response.header.resultCode === 0) {
            this.redirectUserToLogin();
          } else {
            this.alertMessage = this.setAlertMessage(response.header.resultCode);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.alertMessage = this.setAlertMessage(error.error.header.resultCode);
        }
      })
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

  redirectUserToLogin() {
    this.router.navigate(['/login']);
  }
}
