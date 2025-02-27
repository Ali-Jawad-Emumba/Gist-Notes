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

  constructor(
    public sharedService: SharedService
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngOnInit(): void {
    this.userSubscription = this.sharedService.user.subscribe((val: any) =>
      this.setTableData(val)
    );
  }

  setTableData(user: any) {
    this.tableData = this.publicGists.map((e: any, index) => ({
      name: { name: e.owner.login, avatar: e.owner.avatar_url },
      notebookName: Object.keys(e.files)[0],
      keyword: 'Keyword',
      updated: dayjs(e.updated_at).fromNow(),
      forksURL: e.forks_url,
      isStarred: user && index % 3 === 0,
    }));
    this.setupDataSource();
  }

  ngAfterViewInit() {
    this.setupDataSource();
  }

  setupDataSource() {
    this.dataSource = new MatTableDataSource<TableColumns>(this.tableData);
    this.dataSource.paginator = this.paginator;

    //hiding tooltip as its misplaced in component
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
