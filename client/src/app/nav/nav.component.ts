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


	constructor(private fb: FormBuilder, private authService: AuthService) { }

	ngOnInit() {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required]]
	 });
	}

	loggedIn(): boolean {
		return true;
	}

	onSubmit(): void {
		this.loginModel = Object.assign({}, this.loginForm.value);
		this.authService.loginUser(this.loginModel.email, this.loginModel.password).subscribe();
	}

}
