import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisteredUserComponent } from './registered-user/registered-user.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { EditProfileComponent } from './user-profil/edit-profile/edit-profile.component';
import { FriendlistComponent } from './user-profil/friendlist/friendlist.component';
import { AddFriendComponent } from './user-profil/add-friend/add-friend.component';
import { FlightsComponent } from './flights/flights.component';
import { CarsComponent } from './cars/cars.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    RegisteredUserComponent,
    UserProfilComponent,
    EditProfileComponent,
    FriendlistComponent,
    AddFriendComponent,
    FlightsComponent,
    CarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
