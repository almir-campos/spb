'use strict';

import {ListDiv as List} from './list/ListDiv.js';

export class MainDiv {
  static elem = document.querySelector('#main-div');

  static init() {
    /**
     * Target Phase
     */
    List.init();
    MainDiv.elem.addEventListener('click', e => {
      List.do().processEvent(e);
    });
  }
}
