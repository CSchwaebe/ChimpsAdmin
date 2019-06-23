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
      sortOrder: sortOrder,
      type: 'Text'
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
      sortOrder: sortOrder,
      type: 'Image'
    });
  }

  newVideoBlock(url: string, sortOrder: number) {

    return new Block(VideoComponent, {
      url: url,
      text: undefined,
      style: { height: 'auto', width: '80%' },
      sortOrder: sortOrder,
      type: 'Video'
    });

  }

  newSpacerBlock(sortOrder: number) {
    return new Block(SpacerComponent, {
      style: {
        height: 'auto', width: '100%'
      },
      sortOrder: sortOrder,
      type: 'Spacer'
    });
  }



  attachComponentToData(type, data) {
    switch (type) {
      case 'Text': return new Block(TextComponent, data);
      break;
      case 'Image': return new Block(ImageComponent, data);
      break;
      case 'Video': return new Block(VideoComponent, data);
      break;
      case 'Spacer': return new Block(SpacerComponent, data);
      break;
    } 
  }







}
