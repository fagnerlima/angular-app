export interface MenuItem {
  label?: string;
  icon?: string;
  routerLink?: string;
  routerLinkActiveOptions?: string;
  items?: MenuItem[] | MenuItem[][];
  command?: (event?: any) => void;
  styleClass?: string;
  title?: string;
  id?: string;
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
}
