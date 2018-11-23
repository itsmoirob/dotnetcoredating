import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output('cancelFromRegister') cancelRegister = new EventEmitter;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model)
      .subscribe(() => {
        console.log('Register succesful');
      }, error => {
        console.log('Error occured registering');
        console.log(error);
      })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
