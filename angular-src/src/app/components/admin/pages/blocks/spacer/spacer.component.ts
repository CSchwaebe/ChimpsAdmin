import { Component, Input } from '@angular/core';

import { Spacer, SpacerBlockData } from '../../models/blocks';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss']
})
export class SpacerComponent implements Spacer {
  @Input() data: SpacerBlockData;
  showStyles: boolean = false;

  constructor(public PageService: PageService) { }

  ngOnInit() {
    console.log(this.data)
  }

  toggleStyles() {
    this.showStyles = !this.showStyles;
  }

}
