import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {IndexComponent} from './components/index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';

import {reducers} from './store/reducers';
import {StoreModule} from '@ngrx/store';
import {JwtInterceptor} from './interceptors/JwtInterceptor';
import {StreamPlayerDirective} from './directives/stream-player.directive';
import {HeaderComponent} from './components/header/header.component';
import {VgBufferingModule} from 'videogular2/buffering';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgControlsModule} from 'videogular2/controls';
import {VgCoreModule} from 'videogular2/core';
import {VgStreamingModule} from 'videogular2/streaming';
import { StreamingPlayerComponent } from './components/streaming-player/streaming-player.component';

const TOKEN_NAME = 'Authorization';

export function tokenGetter() {
  return localStorage.getItem(TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    StreamPlayerDirective,
    HeaderComponent,
    StreamingPlayerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule
    // EffectsModule.forRoot([LoadEffect])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
