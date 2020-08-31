import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FriendServiceService } from 'src/app/services/friend-service.service';
import { AuthUser } from 'src/app/models/authUser';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  public users:AuthUser[]=[];
  public searchFriend: FormGroup;
  public added:Boolean;

  constructor(public authService:AuthenticationService,
              public friendService:FriendServiceService,
              public formBuilder: FormBuilder,
  ) { 

    this.searchFriend = this.formBuilder.group({
      'firstName': [''],
      'lastName': ['']
      });
  }
  get firstName() { return this.searchFriend.get('firstName');};
  get lastName() { return this.searchFriend.get('lastName');};
  ngOnInit(): void {

  }
  onSubmit()
  {

    const searchInfo={
        ime:this.firstName.value,
        prezime:this.lastName.value

    };
    this.friendService.findUser(searchInfo).subscribe(
    data=>
    {
     this.users=data;
     console.log(data);
    },
    err=>
    {
     console.log("ne radi");
    }
  );

  }
  AddFriend(userFirstName, userLastName, userId)
  {
    const requestInfo=
    {
      firstName: userFirstName,
      lastName: userLastName,
      userId:userId
    }
    
    this.friendService.addFriend(this.authService.currentUserValue.id, requestInfo).subscribe(
      data=>
      {
       console.log("radi");
       this.added=true;
      },
      err=>
      {
       console.log("ne radi");
      }
    );
  


  }
}
