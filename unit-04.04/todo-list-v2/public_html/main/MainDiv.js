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
      if ( e.target.id === 'next-div'){
        alert("New amazing features are coming soon!");
        return;
      }
      List.do().processEvent(e);
    });
  }
}
