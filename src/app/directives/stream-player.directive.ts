import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as HLS from 'hls.js';

@Directive({
  selector: '[appStreamPlayer]'
})
export class StreamPlayerDirective implements OnInit {

  @Input('source') source = '';

  private element: HTMLVideoElement;
  hls: any;

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    if (this.hls) {
      this.hls.destroy();
    }
    this.hls = new HLS({
      startLevel: 2,
      capLevelToPlayerSize: true,
    });
    if (HLS.isSupported()) {
      this.hls.attachMedia(this.element);
      this.hls.loadSource(this.source);
      this.hls.on(HLS.Events.MANIFEST_PARSED, (event, data) => {
      });
    }

    this.element.pause();
  }
}
