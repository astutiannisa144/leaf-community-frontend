import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { UserService } from "@service/user-service"
import { Observable } from "rxjs"

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private userService : UserService
    ){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get('skip') === 'true'){
            return next.handle(req)
        }
        const reqClone = req.clone({ 
            headers: new HttpHeaders().append('Authorization', `Bearer ${this.userService.token}`) 
        })
        return next.handle(reqClone)
    }

}