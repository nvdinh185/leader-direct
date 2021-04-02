import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdeaDetailPage } from './idea-detail.page';

const routes: Routes = [
  {
    path: '',
    component: IdeaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdeaDetailPageRoutingModule {}
