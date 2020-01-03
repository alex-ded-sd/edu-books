import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap, mergeMap, retryWhen, take, delayWhen } from "rxjs/operators";
import { LoginModel } from "../models/loginModel";
import { Observable, timer, throwError, of } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	baseUrl = environment.apiUrl;

	public decodedToken: any;

	constructor(private _httpClient: HttpClient, private _jwtHelperService: JwtHelperService) {}

	private _retryAfterError(error: Observable<any>): Observable<any> {
		return error.pipe(
			take(5),
			delayWhen(() => timer(2000))
		);
	}

	public loginUser(loginModel: LoginModel): Observable<any> {
		return this._httpClient.post(this.baseUrl + "auth/login", loginModel).pipe(
			retryWhen(this._retryAfterError),
			mergeMap((response: any) => (response ? of(response.token) : throwError(response))),
			retryWhen(this._retryAfterError),
			tap(token => {
				localStorage.setItem("token", token);
				this.decodedToken = this._jwtHelperService.decodeToken(token);
			})
		);
	}

	public roleMatch(allowedRoles: string): boolean {
		const role = this.decodedToken.role;
		return role === allowedRoles;
	}

	public loggedIn(): boolean {
		const tokenExpired = this._jwtHelperService.isTokenExpired(localStorage.getItem("token"));
		return !tokenExpired;
	}

	public logout(): void {
		this.decodedToken = undefined;
		localStorage.removeItem("token");
	}
}
