import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginUser, RegisterUser} from "../models/user.interface";
import {Observable} from "rxjs";
import {AuthAPIResponse} from "../interfaces/auth-api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private API_URL = 'https://api-auth-moby.herokuapp.com/api/user';

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(loginUser: LoginUser): Observable<AuthAPIResponse> {
    return this.http.post<AuthAPIResponse>(`${this.API_URL}/login`, loginUser);
  }

  public register(registerUser: RegisterUser): Observable<AuthAPIResponse> {
    return this.http.post<AuthAPIResponse>(`${this.API_URL}/register`, registerUser);
  }

  public logout(): void {
    localStorage.removeItem("currentUser");
    this.router.navigate(["/login"]);
  }
}
