import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.component.html',
  styleUrls: ['./web-page.component.css']
})
export class WebPageComponent implements OnInit {

  name: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.name = activatedRoute.snapshot.params['name'];
    if (this.name === '') {
      this.name = 'home';
    }
  }

  ngOnInit() { }

}
