import {Component} from '@angular/core';
import {AuthApiService} from "../../services/auth-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  currentUser = JSON.parse(localStorage.getItem("currentUser")!);

  constructor(private authApiService: AuthApiService) {
  }

  logout() {
    this.authApiService.logout();
  }

}
