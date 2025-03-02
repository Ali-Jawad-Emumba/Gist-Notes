import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumns } from '../../utils/interfaces';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SharedService } from '../../utils/services/shared.service';
import { Subscription } from 'rxjs';
dayjs.extend(relativeTime);

@Component({
  selector: 'app-gists-table',
  templateUrl: './gists-table.component.html',
  styleUrl: './gists-table.component.scss',
})
export class GistsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  tableData: TableColumns[] = [];
  @Input({ required: true }) publicGists!: any[];
  displayedColumns: string[] = [
    'name',
    'notebookName',
    'keyword',
    'updated',
    'action',
  ];
  dataSource!: any;
  userSubscription!: Subscription;

  constructor(public sharedService: SharedService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngOnInit(): void {
    this.userSubscription = this.sharedService.user$.subscribe((val: any) =>
      this.setTableData(val)
    );
  }

  setTableData(user: any) {
    //make table data and update it in UI
    this.tableData = this.publicGists.map((e: any, index) => ({
      name: { name: e.owner.login, avatar: e.owner.avatar_url }, //here we have object becuase name is one column which is meant to hold both username and avatar
      notebookName: Object.keys(e.files)[0], //no notebook name been given so i used the name of file
      keyword: 'Keyword',
      updated: dayjs(e.updated_at).fromNow(), //calculates the time form now in phrases like 2 min ago
      forksURL: e.forks_url,
      isStarred: user && index % 3 === 0, //informs if gist is to be shown as starred or not based on login
    }));
    this.setupDataSource(); //update the table in UI
  }

  ngAfterViewInit() {
    this.setupDataSource();
  }

  setupDataSource() {
    //update the table in UI
    this.dataSource = new MatTableDataSource<TableColumns>(this.tableData);
    this.dataSource.paginator = this.paginator;

    //hiding tooltip as its misplaced in component
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  truncate = (text: string, limit: number) =>
    text.length > limit ? text.substring(0, limit) + '...' : text;
  
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
