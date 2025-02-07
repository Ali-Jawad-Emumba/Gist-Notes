import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GistCardComponent } from './components/gist-card/gist-card.component';
import { TruncatePipe } from './utils/pipes/truncate.pipe';

@NgModule({
  declarations: [GistCardComponent, TruncatePipe],
  imports: [CommonModule],
  exports: [GistCardComponent, TruncatePipe],
})
export class SharedModule {}
