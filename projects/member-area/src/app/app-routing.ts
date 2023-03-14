import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from 'projects/base-area/src/app/pages/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  {   
    path : 'login',
    component : LoginComponent
},
  {   
    path : 'posts',
    loadChildren : ()=> import("./pages/post/post.module").then(c => c.PostModule),
    component : NavbarComponent

},

{   
  path : 'activities',
  loadChildren : ()=> import("./pages/activity/activity.module").then(c => c.ActivityModule),
  component : NavbarComponent

},

{   
  path : 'my-activities',
  loadChildren : ()=> import("./pages/my-activity/my-activity.module").then(c => c.MyActivityModule),
  component : NavbarComponent

},

{   
  path : 'articles',
  loadChildren : ()=> import("./pages/article/article.module").then(c => c.ArticleModule),
  component : NavbarComponent

},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
