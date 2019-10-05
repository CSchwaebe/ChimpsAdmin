export interface StyleResponse {
  data: Style
}

export interface Theme {
  background: string;
  text: string;
  title: string;
}

export interface Buttons {
  background: string;
  text: string;
  dark_mode: boolean;
}

export interface Footer {
  background: string;
  text: string;
}

export interface Header {
  background: string;
  text: string;
}

export interface DropdownMenu {
  background: string;
  category_text: string;
  subcategory_text: string;
}

export interface SideMenu {
  category_background: string;
  category_text: string;
  subcategory_background: string;
  subcategory_text: string;
}

export class Style {
  public theme: Theme;
  public buttons: Buttons;
  public footer: Footer;
  public header: Header;
  public side_menu: SideMenu;
  public dropdown_menu: DropdownMenu;


  public _id?: string;

  constructor() {

  }


}
