'use strict';

import {Item} from '../item/ItemEntity.js';
import {Utils} from '../utils/utils.js';

class ClickedEntity {

  item = {
    isItemContext: function () {
      return Item.itemContextNames.includes(super.getName());
    },
    itemObj: function () {
      return this.isItemContext() ? new Item(super.clicked) : null;
    },

  };

  constructor(clicked) {
    this.clicked = clicked;
  }

  getObject() {
    if (Utils.isEmpty(this.clicked)) {
      return {};
    } else {
      return this.clicked;
    }
  }

  getName() {
    return this.getObject().getAttribute('name');
  }

  // getItem() {
  //   if (this.isItem()) {
  //     return new Item(this.getObject());
  //   }
  //   return undefined;
  // }

  // isItem() {
  //   console.log(this.getObject());
  //   if (Utils.isEmpty(this.getObject())) {
  //     console.log(1);
  //     return false;
  //   }
  //   console.log(2);
  //   let item = this.getName()
  //   if ()
  //
  //     let elem = this.getObject().closest('.item');
  //   if (!elem) {
  //     return false;
  //   }
  //   console.log(3, elem, !!elem, elem.getAttribute('name'));
  //   let result = !!elem && elem.getAttribute('name') === 'item';
  //   return result;
  // }
}

export {ClickedEntity as Clicked}
