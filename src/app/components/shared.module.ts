import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GistCardComponent } from './gist-card/gist-card.component';
import { TruncatePipe } from '../utils/truncate.pipe';

@NgModule({
  declarations: [GistCardComponent, TruncatePipe],
  imports: [CommonModule],
  exports: [GistCardComponent],
})
export class SharedModule {}
