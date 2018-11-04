import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BitrateOption, VgAPI} from 'videogular2/core';
import {timer} from 'rxjs';
import {Subscription} from 'rxjs';
import {IDRMLicenseServer} from 'videogular2/streaming';
import {VgDASH} from 'videogular2/src/streaming/vg-dash/vg-dash';
import {VgHLS} from 'videogular2/src/streaming/vg-hls/vg-hls';

export interface IMediaStream {
  type: 'vod' | 'dash' | 'hls';
  source: string;
  title: string;
  token?: string;
  licenseServers?: IDRMLicenseServer;
}

@Component({
  selector: 'app-streaming-player',
  templateUrl: './streaming-player.component.html',
  styleUrls: ['./streaming-player.component.scss']
})
export class StreamingPlayerComponent implements OnInit {
  @ViewChild(VgDASH) vgDash: VgDASH;
  @ViewChild(VgHLS) vgHls: VgHLS;

  @Input('stream') stream: IMediaStream;

  currentStream: IMediaStream;
  api: VgAPI;

  bitrates: BitrateOption[];

  // TODO: Just list of working (at least 1 of them) streams
  streams: IMediaStream[] = [
    {
      type: 'vod',
      title: 'VOD',
      source: 'http://static.videogular.com/assets/videos/videogular.mp4'
    },
    {
      type: 'dash',
      title: 'DASH: Multi rate Streaming',
      source: 'http://dash.edgesuite.net/akamai/bbb_30fps/bbb_30fps.mpd'
    },
    {
      type: 'dash',
      title: 'DASH: Live Streaming',
      source: 'https://24x7dash-i.akamaihd.net/dash/live/900080/dash-demo/dash.mpd'
    },
    {
      type: 'dash',
      title: 'DASH: DRM with Widevine',
      source: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd',
      licenseServers: {
        'com.widevine.alpha': {
          serverURL: 'https://widevine-proxy.appspot.com/proxy'
        }
      }
    },
    {
      type: 'hls',
      title: 'HLS: Streaming',
      source: 'http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8'
    }
  ];

  constructor() {
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
  }

  ngOnInit() {
    this.currentStream = this.stream;
  }

  setBitrate(option: BitrateOption) {
    switch (this.currentStream.type) {
      case 'dash':
        this.vgDash.setBitrate(option);
        break;

      case 'hls':
        this.vgHls.setBitrate(option);
        break;
    }
  }

  onClickStream(stream: IMediaStream) {
    this.api.pause();
    this.bitrates = null;

    const mytimer: Subscription = timer(0, 10).subscribe(
      () => {
        this.currentStream = stream;
        mytimer.unsubscribe();
      }
    );
  }
}
