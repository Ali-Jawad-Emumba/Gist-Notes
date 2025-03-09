import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GistViewPageComponent } from './pages/gist-view-page/gist-view-page.component';
import { CreateGistPageComponent } from './pages/create-gist-page/create-gist-page.component';
import { UserGistsPageComponent } from './pages/user-gists-page/user-gists-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'gist/:id', component: GistViewPageComponent, pathMatch: 'full' },
  {
    path: 'create-gist',
    component: CreateGistPageComponent,
    pathMatch: 'full',
  },
  { path: 'gists', component: UserGistsPageComponent, pathMatch: 'full' },
  { path: 'gists/:type', component: UserGistsPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
