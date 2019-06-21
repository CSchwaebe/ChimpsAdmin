import { Component, Input } from '@angular/core';
import { Text, TextBlockData } from '../../models/blocks';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements Text {
  @Input() data: TextBlockData;

  showStyles: boolean = false;

  constructor(public PageService: PageService) {

  }

  ngOnInit() {
    console.log(this.data)   
  }

  toggleStyles() {
    this.showStyles = !this.showStyles;
  }



}
