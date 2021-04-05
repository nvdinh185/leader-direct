import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  {
    path: 'idea', loadChildren: () => import('./idea-entry/idea/idea.module').then(m => m.IdeaPageModule)
  },
  {
    path: 'idea-detail', loadChildren: () => import('./idea-entry/idea-detail/idea-detail.module').then(m => m.IdeaDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
