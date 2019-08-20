import { Component, OnInit } from '@angular/core';
import { StyleService } from '../services/style.service';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {

  constructor(public StyleService: StyleService) { }

  ngOnInit() {
  }

}
