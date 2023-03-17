import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
@Component({
  selector: 'app-stepper',
  template: `
   <div class="card">
    <p-steps [model]="model" [readonly]="true"></p-steps>
  </div>
    `,
  standalone: true,
  imports: [
    CommonModule, StepsModule
  ]
})

export class StepperComponent {

  constructor(
    private router: Router
  ) {}

  @Input() model: MenuItem[] = []


}
