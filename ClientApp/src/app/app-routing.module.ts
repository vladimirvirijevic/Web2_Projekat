import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisteredUserComponent } from './registered-user/registered-user.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { EditProfileComponent } from './user-profil/edit-profile/edit-profile.component';
import { FriendlistComponent } from './user-profil/friendlist/friendlist.component';
import { AddFriendComponent } from './user-profil/add-friend/add-friend.component';
import { FlightsComponent } from './flights/flights.component';
import { CarsComponent } from './cars/cars.component';
import { RentacarProfileComponent } from './rentacar-profile/rentacar-profile.component';
import { ListOfAvioCompaniesComponent } from './list-of-avio-companies/list-of-avio-companies.component';
import { HistoryComponent } from './user-profil/history/history.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'flights', component: FlightsComponent },
  { path: 'rentacar/:id', component: RentacarProfileComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  
  {path: 'app', component:RegisteredUserComponent },
  {path:'app/listOfAircompanies', component:ListOfAvioCompaniesComponent},

  {path: 'app/profile', component:UserProfilComponent,
    children:[
  { path: 'editProfile',component:EditProfileComponent},
  { path: 'friendList', component:FriendlistComponent},
  { path: 'addFriend', component:AddFriendComponent},
  {path:'history', component:HistoryComponent}
 
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }