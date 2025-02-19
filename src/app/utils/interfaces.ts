export interface TableColumns {
  name: nameTableColumn;
  notebookName: string;
  keyword: string;
  updated: string;
  isStarred: Boolean;
}

export interface nameTableColumn {
  avatar: string;
  name: string;
}

export interface card {
  json: any;
  avatar: string;
  name: string;
  gistName: string;
  created: string;
  description: string;
  gistId: string;
  forksURL: string;
}

export interface user {
  name: string;
  image: string;
}
