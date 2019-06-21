import { Injectable } from '@angular/core';
import { Block } from 'src/app/components/admin/pages/types/block';
import { TextComponent } from 'src/app/components/admin/pages/blocks/text/text.component';
import { VideoComponent } from 'src/app/components/admin/pages/blocks/video/video.component';
import { SpacerComponent } from '../components/admin/pages/blocks/spacer/spacer.component';
import { ImageComponent } from 'src/app/components/admin/pages/blocks/image/image.component';


@Injectable({
  providedIn: 'root'
})
export class BlockService {



  constructor() {

  }
  /*
     getBlocks() {
      return [
        new Block(TextComponent, {text: undefined, style: {height: 'auto', width: '50%'}}),
      ]
     }
     */

  newTextBlock(width: string, sortOrder: number) {
    return new Block(TextComponent, {
      text: undefined,
      style: {
        height: 'auto',
        width: width
      }, 
      sortOrder
    });

  }

  newImageBlock(width: string, sortOrder: number) {
    return new Block(ImageComponent, {
      text: undefined,
      image: '',
      style: {
        height: 'auto',
        width: width
      }, 
      sortOrder
    });
  }

  newVideoBlock(url: string, sortOrder: number) {

    return new Block(VideoComponent, {
      url: url,
      text: 'Description',
      style: { height: 'auto', width: '80%' },
      sortOrder
    });

  }

  newSpacerBlock(sortOrder: number) {
    return new Block(SpacerComponent, {
      style: {
        height: 'auto', width: '100%'
      },
      sortOrder
    });
  }







}
