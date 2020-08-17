import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { RentacarProfileComponent } from './rentacar-profile/rentacar-profile.component';
import { ListOfAvioCompaniesComponent } from './list-of-avio-companies/list-of-avio-companies.component';
import { ListOfRentacarCompaniesComponent } from './list-of-rentacar-companies/list-of-rentacar-companies.component';
import { ListOfInvitationsComponent } from './list-of-invitations/list-of-invitations.component';
import { ReservedListComponent } from './reserved-list/reserved-list.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { StaffComponent } from './admin/staff/staff.component';
import { AdminRentacarComponent } from './admin/admin-rentacar/admin-rentacar.component';
import { AdminAirlineComponent } from './admin/admin-airline/admin-airline.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MyRentacarCompanyComponent } from './my-rentacar-company/my-rentacar-company.component';
import { MyRentacarProfileComponent } from './my-rentacar-company/my-rentacar-profile/my-rentacar-profile.component';
import { RentacarBranchComponent } from './my-rentacar-company/rentacar-branch/rentacar-branch.component';
import { RentacarCarsComponent } from './my-rentacar-company/rentacar-cars/rentacar-cars.component';
import { CarComponent } from './car/car.component';
import { AviocompanyProfileComponent } from './aviocompany-profile/aviocompany-profile.component';
import { AdminAviocompanyComponent } from './admin-aviocompany/admin-aviocompany.component';
import { AdminAviocompanyProfileComponent } from './admin-aviocompany/admin-aviocompany-profile/admin-aviocompany-profile.component';

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
    CarsComponent,
    RentacarProfileComponent,
    ListOfAvioCompaniesComponent,
    ListOfRentacarCompaniesComponent,
    ListOfInvitationsComponent,
    ReservedListComponent,
    StaffComponent,
    AdminRentacarComponent,
    AdminAirlineComponent,
    ChangePasswordComponent,
    MyRentacarCompanyComponent,
    MyRentacarProfileComponent,
    RentacarBranchComponent,
    RentacarCarsComponent,
    AdminAviocompanyComponent,
    AdminAviocompanyProfileComponent ,
    CarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
