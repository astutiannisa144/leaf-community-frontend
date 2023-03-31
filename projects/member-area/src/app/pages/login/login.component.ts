import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LoginReq } from "@dto/login/login-req";
import { UserService } from "@service/user-service";

@Component({
    selector : 'app-login',
    templateUrl : './login.component.html'
})
export class LoginComponent {

    login = this.fb.group({
        email: ['eronwahyu@gmail.com', [Validators.required]],
        pass: ['eron', [Validators.required]]
    })

    private login$?: Subscription

    constructor(
        private fb: FormBuilder,
        private title: Title,
        private router: Router,
        private userService: UserService
    ) {
        this.title.setTitle('Login / Leaf')
    }

    onLogin() {
        if (this.login.valid) {
            const data: LoginReq = {
                email: this.login.value.email!,
                pass: this.login.value.pass!
            }

            this.login$ = this.userService.login(data).subscribe(result => {
                this.userService.saveDataLogin(result)
                this.router.navigateByUrl('/home')
            })
        }
    }

    ngOnDestroy(): void {
        this.login$?.unsubscribe()
    }

}