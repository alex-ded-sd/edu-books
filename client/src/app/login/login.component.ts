import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { LoginModel } from "../models/loginModel";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	modalRef: BsModalRef;

	constructor(
		public authService: AuthService,
		private _modalService: BsModalService,
		private _fb: FormBuilder
	) {}

	public ngOnInit(): void {
		this.loginForm = this._fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]]
		});
	}

	public login(): void {
		const loginModel: LoginModel = Object.assign({}, this.loginForm.value);
		this.authService.loginUser(loginModel).subscribe(
			() => {
				this.modalRef.hide();
			},
			error => {
				console.error(error);
			}
		);
	}

	public loggedIn(): boolean {
		return this.authService.loggedIn();
	}

	public openModalSignIn(template: TemplateRef<any>): void {
		this.modalRef = this._modalService.show(template);
	}

	public logout(): void {
		this.authService.logout();
	}
}
