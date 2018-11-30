import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    protected authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * will log a user in
   */
  login(): void {
    this.authService.login(this.model)
      .subscribe(next => {
        this.alertify.success('Logged in successfully.')
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/members']);
      });
  }

  /**
   * Will check if a user is logged in 
   */
  loggedIn() {
    return this.authService.loggedIn();
  }

  /**
   * Will log a use out
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.alertify.message('Logged out.');
  }

}
