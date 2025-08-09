export interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  submenu?: MenuItem[];
}

export interface ItemSelect {
  label: string;
  value: string;
}

export interface ResponsePagination<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
