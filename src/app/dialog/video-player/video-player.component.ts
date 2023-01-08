import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import getVideoId from 'get-video-id';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {

  urlLink: string = ''
  videoId: any



  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private sanitizer: DomSanitizer) {
    this.urlLink = dialogData.link
    this.videoId = getVideoId(this.urlLink);
    console.log(this.videoId)

  }

}
