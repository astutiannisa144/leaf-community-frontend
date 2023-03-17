import { Component } from "@angular/core";
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
        `
.c-stepper {
    display: flex;
    flex-wrap: wrap;
}

.c-stepper__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
}

.c-stepper__item:before {
    --size: 3rem;
    content: "";
    position: relative;
    z-index: 1;
    display: block;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    margin: 1rem auto 0;
}
        
        `]
})

export class RegisterComponent {
    items!: MenuItem[];

    registDetail = 1

    ngOnInit() {
        this.items = [{
            label: '',
            routerLink: 'personal'
        },
        {
            label: '',
            routerLink: 'seat'
        },
        {
            label: '',
            routerLink: 'payment'
        },
        ];
    }

    showDetails(){
        this.registDetail = 2
    }
}