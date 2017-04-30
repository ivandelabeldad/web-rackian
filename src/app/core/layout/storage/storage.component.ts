import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/authentication/user';
import { AuthHttpService } from '../../../shared/authentication/auth-http.service';

@Component({
  selector: 'rackian-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  constructor(private user: User, private http: AuthHttpService) { }

  ngOnInit() {
    this.http.get('http://localhost:8000/v1/files/')
      .map(res => res.json())
      .subscribe(data => console.log(data));
  }

}
