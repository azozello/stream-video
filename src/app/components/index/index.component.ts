import {AuthService} from '../../services/auth.service';

import * as fromRoot from '../../store/reducers';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Stream} from '../../store/models/stream';
import {Layout} from '../../store/models/layout';
import 'bootstrap';
import 'jquery';

import {Component, OnInit, ViewChild} from '@angular/core';
import {BitrateOption, VgAPI} from 'videogular2/core';
import {Subscription} from 'rxjs';
import {IDRMLicenseServer} from 'videogular2/streaming';
import {VgDASH} from 'videogular2/src/streaming/vg-dash/vg-dash';
import {VgHLS} from 'videogular2/src/streaming/vg-hls/vg-hls';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  closing_streams: Stream[] = [];
  unique = -1;

  availableStreams: Stream[];

  uniqueID = 0;
  streamID = -1;
  layoutID = -1;

  createStreamForm: FormGroup;
  addLayoutForm: FormGroup;

  layouts: Layout[];

  constructor(private _auth: AuthService,
              private fb: FormBuilder,
              private store: Store<fromRoot.State>) {
    this.createStreamForm = this.fb.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      source: ['', Validators.required],
    });
    this.addLayoutForm = this.fb.group({
      columns: [2, Validators.required]
    });
    this.availableStreams = [];
    this.layouts = [];
  }

  ngOnInit() {
    this.store.select(fromRoot.getStreamsList).subscribe(
      data => {
        this.availableStreams = data;
      }
    );

  }

  createStream() {
    const currentStream = this.layouts.find((layout) => layout.unique === this.layoutID)
      .streams.find((stream) => stream.id === this.streamID);

    currentStream.title = this.createStreamForm.controls['title'].value;
    currentStream.source = this.createStreamForm.controls['source'].value;
    currentStream.active = true;

    console.log(this.createStreamForm.controls['type'].value);
    console.log(this.createStreamForm.controls['title'].value);
    console.log(this.createStreamForm.controls['source'].value);
  }

  createLayout() {
    const length = this.addLayoutForm.controls['columns'].value;
    const whiteStreams: Stream[] = [];

    for (let num = 0; num < length; num++) {
      whiteStreams.push({
        id: num,
        title: 'Test stream title',
        source: 'asd'
      });
    }

    this.layouts.push({
      unique: this.uniqueID++,
      length: length,
      class: `col-${12 / length}`,
      streams: whiteStreams
    });
  }

  addStreamSource(streamID, layoutID) {
    this.streamID = streamID;
    this.layoutID = layoutID;
  }

  deleteLayout() {
    const new_layouts = [];
    this.layouts.forEach(
      layout => {
        if (layout.unique !== this.unique) {
          new_layouts.push(layout);
        }
      }
    );
    this.layouts = new_layouts;
  }
}
