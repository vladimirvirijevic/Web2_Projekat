import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
	public firstName:string;
	public secondName:string;


    
  constructor(public authenticationService: AuthenticationService
    ) { 
		this.firstName="";
		this.secondName="";
  }

  ngOnInit(): void {
	this.firstName=this.authenticationService.currentUserValue.firstName.toUpperCase();
	this.secondName=this.authenticationService.currentUserValue.lastName.toUpperCase();
 	
  }
 

 	
    
}
