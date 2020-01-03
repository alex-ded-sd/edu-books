import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { isUndefined, isNull, isNullOrUndefined } from "util";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
	selector: "app-root",
	templateUrl: "./root.component.html"
})
export class RootComponent implements OnInit {
	title = "edu-books";

	constructor(private _authService: AuthService, private _jwtHelperService: JwtHelperService) {}

	public ngOnInit(): void {
		let decodedToken = this._authService.decodedToken;
		const token = localStorage.getItem("token");
		if (!isNullOrUndefined(token) && isUndefined(decodedToken)) {
			this._authService.decodedToken = this._jwtHelperService.decodeToken(token);
		}
	}
}
