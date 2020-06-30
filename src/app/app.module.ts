import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {NotesComponent} from './notes/notes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StatusPipe } from './status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    RouterTestingModule,
    RouterModule.forRoot([
      {path: '', component: NotesComponent}
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
