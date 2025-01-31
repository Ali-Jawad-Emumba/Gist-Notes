import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GistsTableComponent } from './gists-table/gists-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [GistsTableComponent],
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  exports: [GistsTableComponent],
})
export class SharedModule {}
