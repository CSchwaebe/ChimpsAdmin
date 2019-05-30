import { Injectable } from '@angular/core';
import { Block } from 'src/app/components/admin/pages/types/block';
import { TextComponent } from 'src/app/components/admin/pages/blocks/text/text.component';
import { VideoComponent } from 'src/app/components/admin/pages/blocks/video/video.component';


@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor() {
   
  }

   getBlocks() {
    return [
      new Block(TextComponent, {text: undefined}),
      new Block(VideoComponent, {url: "https://www.youtube.com/watch?v=bS9OZBnVjOg", text: 'Description'})
    ]
   }

  

}
