import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../models/authUser';
import { Friend } from '../models/Friend';

@Injectable({
  providedIn: 'root'
})
export class FriendServiceService {

  constructor(private http: HttpClient) { }

  getUsers()
  {
      return this.http.get<AuthUser[]>(`${environment.api_url}/friend/getUsers`);
  }
  findUser(searchInfo)
  {
    return this.http.post<any>(`${environment.api_url}/friend/searchUsers`,searchInfo);

  }
  addFriend(userId, requestInfo)
  {
    return this.http.post<any>(`${environment.api_url}/friend/addFriend/${userId}`,requestInfo);
  }
  getNotAddedFriends(userId)
  {
    return this.http.get<Friend[]>(`${environment.api_url}/friend/getNotAddedFriends/${userId}`);
  }
  acceptFriend(nonFriendId, acceptInfo)
  {
    return this.http.put<any>(`${environment.api_url}/friend/acceptFriend/${nonFriendId}`, acceptInfo);
  }
  getFriends(userId)
  {
    return this.http.get<Friend[]>(`${environment.api_url}/friend/getAddedFriends/${userId}`);
  }
  declineNonFriend(nonFriendId)
  {
    return this.http.delete<any>(`${environment.api_url}/friend/declineNonFriend/${nonFriendId}`);
  }
  deleteFriend(friendId)
  {
    return this.http.delete<any>(`${environment.api_url}/friend/deleteFriend/${friendId}`);
  }
}
