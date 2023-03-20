import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from 'projects/base-area/src/app/common/share.module';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { StepperComponent } from "../../../base-area/src/app/components/stepper/stepper.component";
import { TieredMenuCustomComponent } from "../../../base-area/src/app/components/tiered-menu/tiered-menu.component";
import { NavbarAdminComponent } from 'projects/base-area/src/app/components/navbar/navbar-admin.component';

export const adminRoutes: Routes = [

  {
    path: 'login/admin',
    component: LoginComponent
  },
  {
    path: 'article/admin',
    loadChildren: () => import("./pages/article/article-admin.module").then(c => c.ArticleAdminModule),
    component: NavbarAdminComponent
  },

  {
    path: 'courses/admin',
    loadChildren: () => import("./pages/activity/course-admin.module").then(c => c.CourseAdminModule),
    component: NavbarAdminComponent
  },

];

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(adminRoutes),
    ShareModule, ReactiveFormsModule,
    FormsModule, CommonModule,
    StepperComponent,
    TieredMenuCustomComponent
  ]
})
export class AppRoutingModule { }
