import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GistCardsComponent } from './components/gist-cards/gist-cards.component';
// import { TruncatePipe } from './utils/pipes/truncate.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [GistCardsComponent],
  imports: [CommonModule, MatPaginatorModule],
  exports: [GistCardsComponent],
})
export class SharedModule {}
