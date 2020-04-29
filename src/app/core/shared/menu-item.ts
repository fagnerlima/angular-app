export interface MenuItem {
  label?: string;
  icon?: string;
  routerLink?: string;
  items?: MenuItem[] | MenuItem[][];
  styleClass?: string;
  title?: string;
  id?: string;
  disabled?: boolean;
  visible?: boolean;
}
