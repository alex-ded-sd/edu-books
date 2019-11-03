import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	baseUrl = environment.apiUrl;
	

	constructor(private httpClient: HttpClient) { }

	loginUser(email: string, password: string) {
		var userForLogin = {
			"Email": email,
			"Password": password
		}
		return this.httpClient.post(this.baseUrl + 'login', userForLogin);
	}
}
