import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from 'projects/base-area/src/app/common/share.module';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { StepperComponent } from "../../../base-area/src/app/components/stepper/stepper.component";
import { TieredMenuCustomComponent } from "../../../base-area/src/app/components/tiered-menu/tiered-menu.component";
import { NavbarComponent } from 'projects/base-area/src/app/components/navbar/navbar.component';

export const adminRoutes: Routes = [

  {
    path: 'login/admin',
    component: LoginComponent
  },
  {
    path: 'article/admin',
    loadChildren: () => import("./pages/article/article-admin.module").then(c => c.ArticleAdminModule),
    component: NavbarComponent
  },

  {
    path: 'activities/admin',
    loadChildren: () => import("./pages/activity/activity-admin.module").then(c => c.CourseAdminModule),
    component: NavbarComponent
  },

  {
    path: 'voucher',
    loadChildren: () => import("./pages/voucher/voucher.module").then(c => c.VoucherModule),
    component: NavbarComponent
  },

  {
    path: 'premium/admin',
    loadChildren: () => import("./pages/approve-premium/approve-premium.module").then(c => c.ApprovePremiumModule),
    component: NavbarComponent
  },

  

  {
    path: 'activity-history',
    loadChildren: () => import("./pages/activity-history/activity-history.module").then(c => c.ActivityHistoryModule),
    component: NavbarComponent
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
