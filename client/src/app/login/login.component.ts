import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginModel } from '../models/loginModel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	modalRef: BsModalRef;

	constructor(public authService: AuthService, private _modalService: BsModalService,
		private _fb: FormBuilder) { }

	ngOnInit() {
		this.loginForm = this._fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
	 });
	}

	login() {
		const loginModel: LoginModel = Object.assign({}, this.loginForm.value);
		this.authService.loginUser(loginModel).subscribe(user => {
				this.modalRef.hide();
			},
			error => {
				console.error(error);
			});
	}

	loggedIn(): boolean {
		return this.authService.loggedIn();
	}

	openModalSignIn(template: TemplateRef<any>) {
		this.modalRef = this._modalService.show(template);
	  }
}
