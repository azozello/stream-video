import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

import * as fromRoot from '../../store/reducers';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Stream} from '../../store/models/stream';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  availableStreams: Stream[];
  activeStreams: Stream[];
  createStreamForm: FormGroup;

  constructor(private _auth: AuthService,
              private fb: FormBuilder,
              private store: Store<fromRoot.State>) {
    this.createStreamForm = this.fb.group({
      newTitle: ['', Validators.required]
    });
    this.availableStreams = [];
    this.activeStreams = [];
  }

  ngOnInit() {
    this.store.select(fromRoot.getStreamsList).subscribe(
      data => {
        this.availableStreams = data;
      }
    );
  }

  deleteStream(id: number) {
    const newActiveStreams = [];
    this.activeStreams.forEach(
      stream => {
        if (stream.id !== id) {
          newActiveStreams.push(stream);
        }
      }
    );
    this.activeStreams = newActiveStreams;
  }

  createStream() {
    this.availableStreams.forEach(
      stream => {
        if (`${stream.id}` === this.createStreamForm.controls['newTitle'].value) {
          this.activeStreams.push(stream);
        }
      }
    );
  }
}
