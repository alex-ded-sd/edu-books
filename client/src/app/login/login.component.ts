import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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

	constructor(private authService: AuthService) { }

	ngOnInit() {
	}

	login() {
		this.authService.loginUser(this.loginForm.get('email').value,
			this.loginForm.get('password').value).subscribe(next => {
				console.log('success')
			}, error => {
				console.error('error')
			});
	}

}
