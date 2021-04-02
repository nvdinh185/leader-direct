import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TreeMenu } from './components/tree-menu/tree-menu';
import { Ngxi4DynamicServiceModule } from 'ngxi4-dynamic-service'

@NgModule({
  declarations: [
    AppComponent,
    TreeMenu
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    Ngxi4DynamicServiceModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
