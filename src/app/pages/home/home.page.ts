import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/menuItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  componentes: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
