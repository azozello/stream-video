import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Actions, Effect} from '@ngrx/effects';

import * as UserAction from '../actions/user';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class LoadEffect {
  constructor (private _auth: AuthService, private actions: Actions) {}

  @Effect()
  loadSecuredData$ = this.actions.ofType(UserAction.SET_ROLE).pipe(
    switchMap(() => {
      return this._auth
        .loadSecuredData()
        .pipe(
          map(data => new UserAction.SetRole(data)),
          catchError(error => of(new UserAction.SetRole(error)))
        );
    })
  );
}
