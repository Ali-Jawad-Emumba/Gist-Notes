import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GistViewPageComponent } from './pages/gist-view-page/gist-view-page.component';
import { CreateGistPageComponent } from './pages/create-gist-page/create-gist-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'gist/:name', component: GistViewPageComponent, pathMatch: 'full' },
  { path: 'create-gist', component: CreateGistPageComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
