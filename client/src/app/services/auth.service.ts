import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	baseUrl = environment.apiUrl;
	

	constructor(private _httpClient: HttpClient) { }

	loginUser(email: string, password: string) {
		var userForLogin = {
			"Email": email,
			"Password": password
		}
		return this._httpClient
			.post(this.baseUrl + 'auth/login', userForLogin)
			.pipe(
				map((response:any) => {
					if (response) {
						localStorage.setItem('token', response.token);
					}
				})
			)
	}
}
