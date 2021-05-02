import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawingEditorComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
