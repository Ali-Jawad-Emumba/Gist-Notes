import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GistCardComponent } from './gist-card/gist-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [GistCardComponent],
  imports: [CommonModule],
  exports: [GistCardComponent],
})
export class SharedModule {}
