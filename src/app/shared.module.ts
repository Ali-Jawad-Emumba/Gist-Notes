import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GistCardComponent } from './components/gist-card/gist-card.component';
import { TruncatePipe } from './utils/pipes/truncate.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [GistCardComponent, TruncatePipe],
  imports: [CommonModule, MatPaginatorModule],
  exports: [GistCardComponent, TruncatePipe],
})
export class SharedModule {}
