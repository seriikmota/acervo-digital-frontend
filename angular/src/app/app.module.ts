import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbstractListarComponent } from './shared/abstract-listar/abstract-listar.component';
import { AbstractEditarComponent } from './shared/abstract-editar/abstract-editar.component';
import { AbstractDataSourceComponent } from './shared/abstract-data-source.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AbstractListarComponent,
    AbstractEditarComponent,
    AbstractDataSourceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }