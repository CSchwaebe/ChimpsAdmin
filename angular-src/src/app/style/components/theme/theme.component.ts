import { Component, OnInit, Input } from '@angular/core';
import { StyleService } from 'src/app/services/style.service';
import { Style } from 'src/app/models/admin/style';
import { KeyValuePipe, KeyValue } from '@angular/common';
import { KeyEventsPlugin } from '@angular/platform-browser/src/dom/events/key_events';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  @Input() parent: any;
  style: Style;
  tempStyle;
  //the selecteed group in the menu
  group: string;
  //Which button was pressed, the field of style that we are editing
  field: string;
  //the color of the color picker tool
  color: string;

  constructor(public StyleService: StyleService) {
    this.style = this.StyleService.style;

    this.tempStyle = new Map();

    this.tempStyle.set('theme', this.style['theme']);
    this.tempStyle.set('buttons', this.style['buttons']);
    this.tempStyle.set('footer', this.style['footer']);
    this.tempStyle.set('header', this.style['header']);
    this.tempStyle.set('dropdown_menu', this.style['dropdown_menu']);
    this.tempStyle.set('side_menu', this.style['side_menu']);
  }


  ngOnInit() {

  }

  /**
   * Sorts the Groups for Display
   */
  customOrder = (a: KeyValue<string, any>, b: KeyValue<string, any>): number => {
    let aVal;
    let bVal;

    switch (a.key) {
      case 'theme':
        aVal = 0;
        break;
      case 'buttons':
        aVal = 1;
        break;
      case 'footer':
        aVal = 2;
        break;
      case 'header':
        aVal = 3;
        break;
      case 'dropdown_menu':
        aVal = 4;
        break;
      case 'side_menu':
        aVal = 5;
        break;
    }

    switch (b.key) {
      case 'theme':
        bVal = 0;
        break;
      case 'buttons':
        bVal = 1;
        break;
      case 'footer':
        bVal = 2;
        break;
      case 'header':
        bVal = 3;
        break;
      case 'dropdown_menu':
        bVal = 4;
        break;
      case 'side_menu':
        bVal = 5;
        break;
    }

    return aVal - bVal;
  }

  readable(key: string) {
    let ret = key[0].toLocaleUpperCase();
    let flag = false;

    for (let i = 1; i < key.length; i++) {
      if (flag) {
        ret = ret + key[i].toLocaleUpperCase();
        flag = false;
      } else if (key[i] == '_') {
        ret = ret + ' ';
        flag = true;
      } else {
        ret = ret + key[i];
      }

    }
    return ret;
    // key.charAt(0).toLocaleUpperCase();
  }

  onChangeComplete(event) {
    this.style[this.group][this.field] = event.color.hex;
  }

  changeGroup(group: string) {
    this.field = '';
    this.color = '';
    if (this.group === group) {
      this.group = '';
    } else {
      this.group = group;
    }
  }

  changeField(field: string) {
    this.field = field;
    this.color = this.style[this.group][this.field];
  }

  reset() {
    this.field = undefined;
  }

  toggleMaterialTheme() {
    this.parent.onSetTheme(this.style.buttons.dark_mode);
  }

  save() {
    console.log(this.style)
  }

}
