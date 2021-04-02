import { NgModule } from '@angular/core';

import { IdeaPageRoutingModule } from './idea-routing.module';

import { IdeaPage } from './idea.page';
import { IdeaCardComponent } from 'src/app/components/idea-card/idea-card.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    SharedModule,
    IdeaPageRoutingModule
  ],
  declarations: [
    IdeaPage,
    IdeaCardComponent
  ]
})
export class IdeaPageModule { }
