import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/Friend';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FriendServiceService } from 'src/app/services/friend-service.service';
import { AuthUser } from 'src/app/models/authUser';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {
  public nonFriends:Friend[];
  public friendToAccept:Friend;
  public friends:Friend[];
  public friendToDelete:Friend;
  public prihv:Boolean;
  public rez:Boolean;

  
  
  constructor(
    public authService:AuthenticationService,
    public friendService:FriendServiceService
  ) { }

  ngOnInit(): void {
   this.getNonFriends();
   this.getFriends();
  }
  getNonFriends()
  {
    this.friendService.getNotAddedFriends(this.authService.currentUserValue.id).subscribe(
      data=>
      {
       console.log("radi");
       this.nonFriends=data;
       console.log(this.nonFriends);
       
      },
      err=>
      {
       console.log("ne radi");
      }
    );
  
  }
  getNonFriend(nonFriendId)
  {
    this.nonFriends.forEach(element => {
      if(element.id==nonFriendId)
      {
        this.friendToAccept=element;
      
      }});
  }

  Accept(nonFriendId)
  {
    
    const acceptInfo=
    {
        firstName:"",
        lastName:""

    };

    this.friendService.acceptFriend(nonFriendId, acceptInfo).subscribe(
      data=>
      {
       console.log("radi");
     
      },
      err=>
      {
       console.log("ne radi");
      }
    );
     

  }
  getFriends()
  {
    this.friendService.getFriends(this.authService.currentUserValue.id).subscribe(
      data=>
      {
       console.log("radi");
       this.friends=data;
       this.friends.forEach(element => {
        if(element.koJePrihvatio.id==this.authService.currentUserValue.id)
        {
          this.prihv=true;
          this.rez=false;
        
        }
        else
        {
          this.rez=true;
          this.prihv=false;
        }
      
      
      });


       console.log(this.nonFriends);
       
      },
      err=>
      {
       console.log("ne radi");
      }
    );
  }

  getFriend(friendId)
  {
    this.friends.forEach(element => {
      if(element.id==friendId)
      {
        this.friendToDelete=element;
      
      }});
  }
  Decline(nonFriendId)
  {

 this.friendService.declineNonFriend(nonFriendId).subscribe(
      data=>
      {
       console.log("odbijen");
     
      },
      err=>
      {
       console.log("ne radi");
      }
    );
  }
  DeleteFriend(friendId)
  {
    this.friendService.deleteFriend(friendId).subscribe(
      data=>
      {
       console.log("obrisan");
     
      },
      err=>
      {
       console.log("ne radi");
      }
    );

  }



}
