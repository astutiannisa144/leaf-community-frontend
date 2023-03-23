import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from 'projects/base-area/src/app/common/share.module';
import { NavbarComponent } from 'projects/base-area/src/app/components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { StepperComponent } from "../../../base-area/src/app/components/stepper/stepper.component";
import { TieredMenuCustomComponent } from "../../../base-area/src/app/components/tiered-menu/tiered-menu.component";

export const memberRoutes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'home',
    loadChildren: () => import("./pages/post/post.module").then(c => c.PostModule),
    component: NavbarComponent

  },

  {
    path: 'activities',
    loadChildren: () => import("./pages/activity/activity.module").then(c => c.ActivityModule),
    component: NavbarComponent

  },

  {
    path: 'my-activities',
    loadChildren: () => import("./pages/my-activity/my-activity.module").then(c => c.MyActivityModule),
    component: NavbarComponent

  },

  {
    path: 'articles',
    loadChildren: () => import("./pages/article/article.module").then(c => c.ArticleModule),
    component: NavbarComponent

  },

  {
    path: 'profile',
    loadChildren: () => import("./pages/profile/profile.module").then(c => c.ProfileModule),
    component: NavbarComponent

  },




];

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(memberRoutes),
        ShareModule, ReactiveFormsModule,
        FormsModule, CommonModule,
        StepperComponent,
        TieredMenuCustomComponent
    ]
})
export class AppRoutingModule { }
