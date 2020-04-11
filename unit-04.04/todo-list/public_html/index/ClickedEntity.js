'use strict';

import {Item}  from '../item/ItemEntity.js';
import {Utils} from '../utils/utils.js';

class ClickedEntity {

  constructor(clicked) {
    self = this;
    this.clicked = clicked;
    console.log('ClickedEntity/clicked', clicked);
    this.item = {
      isItemContext: function () {
        return Item.itemContextNames.includes(self.getName());
      },
      itemObj: function () {
        return self.isItemContext() ? new Item(self.clicked) : null;
      },
      isItem: function () {
        return (self.getName === 'item') || (self.clicked.closest('.item').getAttribute('name') === 'item');
      }
    };

  }

  getClickedElem() {
    if (Utils.isEmpty(this.clicked)) {
      return {};
    } else {
      return this.clicked;
    }
  }

  getName() {
    return this.getClickedElem().getAttribute('name');
  }

  getItem() {
    if (this.item.isItemContext()) {
      if (this.getName === 'item') {
        return this.clicked;
      }
      return this.clicked.closest('.item');
    }
  }


  // isItem() {
  //   console.log(this.getClickedElem());
  //   if (Utils.isEmpty(this.getClickedElem())) {
  //     console.log(1);
  //     return false;
  //   }
  //   console.log(2);
  //   let item = this.getName()
  //   if ()
  //
  //     let elem = this.getClickedElem().closest('.item');
  //   if (!elem) {
  //     return false;
  //   }
  //   console.log(3, elem, !!elem, elem.getAttribute('name'));
  //   let result = !!elem && elem.getAttribute('name') === 'item';
  //   return result;
  // }
}

export {ClickedEntity as Clicked}
