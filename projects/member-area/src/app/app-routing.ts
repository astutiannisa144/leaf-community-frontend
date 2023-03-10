import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from 'projects/base-area/src/app/pages/navbar/navbar.component';

const routes: Routes = [

  {   
    path : 'posts',
    loadChildren : ()=> import("./pages/post/post.module").then(c => c.PostModule),
    // component : NavbarComponent

},

{   
  path : 'activities',
  loadChildren : ()=> import("./pages/activity/activity.module").then(c => c.ActivityModule),
  // component : NavbarComponent

},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
