import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "@service/user-service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthLoginGuard implements CanActivate {

    constructor(
        private userService : UserService,
        private router : Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        try{
            this.userService.token
            this.router.navigateByUrl('/home')
            return false
        } catch (error){
            return true
        }

    }

}