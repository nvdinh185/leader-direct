import { NgModule } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { IdeaDetailPageRoutingModule } from './idea-detail-routing.module';

import { IdeaDetailPage } from './idea-detail.page';
import { SharedModule } from 'src/app/shared.module';
import { LinkUrlPipe } from './link.url.pipe';
import { Autosize } from 'src/app/components/autosize';

@NgModule({
  imports: [
    SharedModule,
    IdeaDetailPageRoutingModule
  ],
  declarations: [IdeaDetailPage, LinkUrlPipe, Autosize],
  providers: [InAppBrowser]
})
export class IdeaDetailPageModule {}
