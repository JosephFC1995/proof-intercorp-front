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
