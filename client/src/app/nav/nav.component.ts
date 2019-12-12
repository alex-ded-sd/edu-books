import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../models/loginModel';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
	loginForm: FormGroup;
	loginModel: LoginModel;


	constructor(private _fb: FormBuilder, private _authService: AuthService) { }

	ngOnInit() {
		this.loginForm = this._fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
	 });
	}

	signIn(): void {
		
	}
}
