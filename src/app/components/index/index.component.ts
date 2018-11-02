import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

import * as fromAction from '../../store/actions/user';
import * as fromRoot from '../../store/reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor (private _auth: AuthService, private store: Store<fromRoot.State>) {

  }

  ngOnInit() {
    this.store.select(fromRoot.getEmail).subscribe(
      data => {
        console.log(data);
      }
    );
    this.store.select(fromRoot.getUserState).subscribe(
      data => {
        console.log(data);
      }
    );
    this._auth.loadSecuredData().subscribe(
      data => {
        console.log(data);
      }
    );
    this.store.dispatch(new fromAction.SetRole('Hello'));
  }
}
