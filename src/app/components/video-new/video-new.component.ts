import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [UserService, VideoService]
})
export class VideoNewComponent implements OnInit {

  public page_title: string;
  public video: Video;
  public identity;
  public token: string;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videoService: VideoService
  ) {
    this.page_title = "Nuevo video favorito";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.video = new Video(1, this.identity.sub, '', '', '', '', null, null);
  }

  onSubmit(form) {
    this._videoService.create(this.token, this.video).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          //this._router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
