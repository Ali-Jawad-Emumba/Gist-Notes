export interface TableColumns {
  name: NameTableColumn;
  notebookName: string;
  keyword: string;
  updated: string;
  isStarred: Boolean;
}

export interface NameTableColumn {
  avatar: string;
  name: string;
}

export interface Card {
  json: any;
  avatar: string;
  name: string;
  gistName: string;
  created: string;
  description: string;
  gistId: string;
  forksURL: string;
}

export interface UserData {
  name: string;
  image: string;
}
