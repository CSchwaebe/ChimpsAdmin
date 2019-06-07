import { Injectable } from '@angular/core';
import { Block } from 'src/app/components/admin/pages/types/block';
import { TextComponent } from 'src/app/components/admin/pages/blocks/text/text.component';
import { VideoComponent } from 'src/app/components/admin/pages/blocks/video/video.component';
import { SpacerComponent } from '../components/admin/pages/blocks/spacer/spacer.component';


@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor() {
   
  }

   getBlocks() {
    return [
      new Block(TextComponent, {text: undefined, style: {height: 'auto', width: '100%'}}),
      new Block(VideoComponent, {url: "https://www.youtube.com/watch?v=bS9OZBnVjOg", text: 'Description', style: {height: 'auto', width: '80%'}})
    ]
   }

   newTextBlock() {
     return new Block(TextComponent, {text: undefined, style: {height: 'auto', width: '100%'}}); 
   }

   newImageBlock() {
    return undefined; 
  }

   newVideoBlock() {
    return new Block(VideoComponent, {url: "https://www.youtube.com/watch?v=bS9OZBnVjOg", text: 'Description'});
  }

  newSpacerBlock() {
    return new Block(SpacerComponent, {style: {height: 'auto', width: '100%'}});

  }
  

}
