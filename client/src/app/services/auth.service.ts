import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap, retry, mergeMap, retryWhen, take, delayWhen } from "rxjs/operators";
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

	public loginUser(loginModel: LoginModel): Observable<any> {
		return this._httpClient.post(this.baseUrl + "auth/login", loginModel).pipe(
			retryWhen(error =>
				error.pipe(
					take(5),
					delayWhen(() => timer(2000))
				)
			),
			mergeMap((response: any) => (response ? of(response.token) : throwError(response))),
			retryWhen(error =>
				error.pipe(
					take(5),
					delayWhen(() => timer(2000))
				)
			),
			tap((token: any) => {
				localStorage.setItem("token", token);
				this.decodedToken = this._jwtHelperService.decodeToken(token);
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
