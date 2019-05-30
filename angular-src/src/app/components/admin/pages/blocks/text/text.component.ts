import { Component, Input } from '@angular/core';

import { Text, TextBlockData } from '../../models/blocks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements Text {
  @Input() data: TextBlockData;

  constructor(private FormBuilder: FormBuilder) { 

   

  }

  ngOnInit() {
    console.log(this.data)
  }

}
