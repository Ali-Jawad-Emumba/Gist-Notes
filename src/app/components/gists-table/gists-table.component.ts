import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscribable, Subscription } from 'rxjs';
import { TableColumns } from '../../utils/interfaces';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

@Component({
  selector: 'app-gists-table',
  templateUrl: './gists-table.component.html',
  styleUrl: './gists-table.component.scss',
})
export class GistsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  tableData!: TableColumns[];
  @Input() publicGists$!: any;
  displayedColumns: string[] = [
    'name',
    'notebookName',
    'keyword',
    'updated',
    'action',
  ];
  dataSource!: any;
  private subscription!: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngOnInit(): void {
    this.subscription = this.publicGists$.subscribe((val: any) => {
      console.log('raw data: ', val[0]);
      this.tableData = val.map((e: any) => ({
        name: { name: e.owner.login, avatar: e.owner.avatar_url },
        notebookName: 'Notebook Name',
        keyword: 'Keyword',
        updated: dayjs(e.updated_at).fromNow(),
      }));
    });
  }

  ngAfterViewInit() {
    console.log(this.tableData)
    this.dataSource = new MatTableDataSource<TableColumns>(this.tableData);
    this.dataSource.paginator = this.paginator;

    //hiding tooltip as its misplaced in component
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
