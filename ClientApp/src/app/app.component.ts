import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Web 2 Projekat';
  userIsLogged = false;

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    if (this.authService.currentUserValue == null) {
      return;
    }

    this.authService.logout();
  }
}
