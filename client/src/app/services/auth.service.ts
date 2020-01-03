import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap, retry, mergeMap } from "rxjs/operators";
import { User } from "../models/user";
import { LoginModel } from "../models/loginModel";
import { Observable, timer, throwError, of } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	baseUrl = environment.apiUrl;

	public decodedToken: any;

	constructor(private _httpClient: HttpClient, private _jwtHelperService: JwtHelperService) {}

	loginUser(loginModel: LoginModel): Observable<User> {
		return this._httpClient.post(this.baseUrl + "auth/login", loginModel).pipe(
			retry(5),
			mergeMap(response => (response ? of(response) : throwError(response))),
			retry(5),
			tap((response: any) => {
				localStorage.setItem("token", response.token);
				this.decodedToken = this._jwtHelperService.decodeToken(response.token);
			})
		);
	}

	roleMatch(allowedRoles: string): boolean {
		const role = this.decodedToken.role;
		return role === allowedRoles;
	}

	loggedIn(): boolean {
		const tokenExpired = this._jwtHelperService.isTokenExpired(localStorage.getItem("token"));
		return !tokenExpired;
	}
}
