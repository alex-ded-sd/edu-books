import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	baseUrl = environment.apiUrl;
	decodedToken: any;


	constructor(private _httpClient: HttpClient,
		private _jwtHelperService: JwtHelperService) { }

	loginUser(email: string, password: string) {
		const userForLogin = {
			"Email": email,
			"Password": password
		}
		return this._httpClient
			.post(this.baseUrl + 'auth/login', userForLogin)
			.pipe(
				map((response: any) => {
					if (response) {
						this.decodedToken = this._jwtHelperService.decodeToken(response.token);
						// const user: User = {
						// 	id: decodedToken.nameid,
						// 	role: decodedToken.role
						// };
						localStorage.setItem('token', response.token);
					}
				})
			)
	}

	roleMatch(allowedRoles: string): boolean {
		const role = this.decodedToken.role;
		return role === allowedRoles;
	}
}
