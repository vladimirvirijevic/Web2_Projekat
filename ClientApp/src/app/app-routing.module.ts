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
import { ListOfRentacarCompaniesComponent } from './list-of-rentacar-companies/list-of-rentacar-companies.component';
import { ListOfInvitationsComponent } from './list-of-invitations/list-of-invitations.component';
import { ReservedListComponent } from './reserved-list/reserved-list.component';
import { AuthtestComponent } from './authtest/authtest.component';
import { TestLoginComponent } from './test-login/test-login.component';



const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'flights', component: FlightsComponent },
  { path: 'rentacar/:id', component: RentacarProfileComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'test-register', component: AuthtestComponent },
  { path: 'test-login', component: TestLoginComponent },
  
  {path: 'app', component:RegisteredUserComponent },
  {path:'app/listOfAircompanies', component:ListOfAvioCompaniesComponent},
  {path:'app/listOfRentACarcompanies', component: ListOfRentacarCompaniesComponent},
  {path:'app/listOfInvitations', component:ListOfInvitationsComponent},
  {path:'app/reservedList', component:ReservedListComponent},
  {path: 'app/profile', component:UserProfilComponent,
    children:[
  { path: 'editProfile',component:EditProfileComponent},
  { path: 'friendList', component:FriendlistComponent},
  { path: 'addFriend', component:AddFriendComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }