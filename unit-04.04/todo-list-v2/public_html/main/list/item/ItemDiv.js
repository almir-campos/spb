'use strict';

import {AddDiv} from '../../top/add/AddDiv.js';

import {Utils} from '../../../misc/utils.js';

class ItemDiv {
  static elem = document.querySelector('#list-div');

  static init() {
    ItemDiv.elem.addEventListener('click', e => {
      e.target.sender = 'ItemDiv';
    }, true);
    ItemDiv.elem.addEventListener('click', e => {
    });
    ItemDiv.elem.addEventListener('click', e => {
      e.target.sender = "ItemDiv";
    }, false);
  }
}

export {ItemDiv as ItemDiv}
