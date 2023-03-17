import { Component } from "@angular/core";
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
        `
        `]
})

export class RegisterComponent {
    items!: MenuItem[];
    activeIndex: number = 0
    indexChange!: MenuItem[];
    registDetail = 1

    ngOnInit() {
        this.items = [{
            label: 'Sign Up',
        },
        {
            label: 'Details',
        },
        {
            label: 'Verification',
        },
        ];
    }

    showDetails() {
        this.registDetail++
        this.activeIndex++
    }

    backDetails() {
        this.registDetail--
        this.activeIndex--
    }

    onActiveIndexChange(event: any) {
        console.log("Active index changed to: ", event.index);
    }


}