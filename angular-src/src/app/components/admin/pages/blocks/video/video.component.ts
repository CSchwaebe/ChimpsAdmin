import { Component, Input } from '@angular/core';
import { Video, VideoBlockData } from 'src/app/components/admin/pages/models/blocks';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements Video {
  @Input() data: VideoBlockData;
  yt_iframe_html: any;
  vimeo_iframe_html: any;
  dm_iframe_html: any;

  constructor(private EmbedService: EmbedVideoService) {
    
   }

  ngOnInit() {
    console.log(this.data);
    this.yt_iframe_html = this.EmbedService.embed(this.data.url, {
      attr: { width: '100%', height: '100%' }
    });
  }

}
