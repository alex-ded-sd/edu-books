import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl('')
	})

	constructor(private _authService: AuthService, private router: Router) { }

	ngOnInit() {
	}

	login() {
		this._authService.loginUser(this.loginForm.get('email').value,
			this.loginForm.get('password').value).subscribe(next => {
				console.log('YEAH');
				this.router.navigate(['admin']);
			},
			error => {
				console.error(error);
			});
	}
}
