export interface TableColumns {
  name: nameTableColumn;
  notebookName: string;
  keyword: string;
  updated: string;
  isStarred:Boolean
}

export interface nameTableColumn {
  avatar: string;
  name: string;
}
