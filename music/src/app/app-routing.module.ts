import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from '../app/components/basic/basic.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MoodsComponent } from './components/moods/moods.component';
import { FriendsComponent } from './components/friends/friends.component';



const routes: Routes = [
  { path : '', component:HomeComponent},
  { path : 'login', component:LoginComponent},
  { path : 'register', component:RegisterComponent},
  { path : 'fav', component:BasicComponent},
  { path : 'mood', component:MoodsComponent},
  { path : 'friends', component:FriendsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
