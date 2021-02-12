import { Component, OnInit } from '@angular/core';
import {AuthService} from '@yaari/services/auth/auth.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this._auth.logout();
  }

}
