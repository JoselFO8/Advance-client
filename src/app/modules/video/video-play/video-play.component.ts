import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '@data/services/api/video.service';
import { ICardVideo } from '@shared/components/cards/card-video/icard-video.metadata';
import { format } from 'timeago.js';

@Component({
  selector: 'app-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.scss']
})
export class VideoPlayComponent implements OnInit {
  public id: number;
  public currentVideo?: ICardVideo;
  public suggestedVideo?: ICardVideo[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {
    this.id = this.route.snapshot.params['id'];
    console.log("Desde video-play This ID", this.id);
  }

  ngOnInit(): void {

    this.videoService.getVideoById(this.id).subscribe(
      r => {
        if (!r.error) {
          this.currentVideo = r.data.video
          console.log('this.currentVideo', this.currentVideo);
        }
      }
    )

    this.videoService.getAllVideos().subscribe(r => {
      if(!r.error) {
        let formatDateVideos = r.data.videos.filter(
          v => v._id !== this.id.toString()
          ).map(v => {
            let formatDate = format(v.createdAt, 'es')
            v.createdAt = formatDate
            return v
          })
        this.suggestedVideo = formatDateVideos;
      }
    })
  }

}
