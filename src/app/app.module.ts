import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from './shared.module';
import { GistsTableComponent } from './components/gists-table/gists-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { GistViewPageComponent } from './pages/gist-view-page/gist-view-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { CreateGistPageComponent } from './pages/create-gist-page/create-gist-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserGistsPageComponent } from './pages/user-gists-page/user-gists-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    GistsTableComponent,
    GistViewPageComponent,
    CreateGistPageComponent,
    UserGistsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    SharedModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatMenuModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
