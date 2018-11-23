import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isRegister = false;
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  registerToggle() {
    this.isRegister = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.isRegister = registerMode;
  }

}
