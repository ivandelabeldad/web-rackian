import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rackian-main-bar',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainBarComponent implements OnInit {

  @Input()
  mobileMenu;

  constructor() { }

  ngOnInit() {
  }

}
