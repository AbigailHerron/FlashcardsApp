import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { SessionQuery } from "../store/session.query";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private sessionQuery: SessionQuery, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

        var isLoggedIn = this.sessionQuery.isLoggedIn;

        if (!isLoggedIn) {
            this.router.navigate(['/'])
        }

        return isLoggedIn;
    }
}