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
      // TopDiv.do().processEvent(e);
      List.do().processEvent(e);
    });

  }

  // static topDivInit() {
  //   return new Promise((resolve, reject) => {
  //     TopDiv.init();
  //   });
  // }

  // static listDivInit() {
  //   return new Promise((resolve, reject) => {
  //     ListDiv.init();
  //   });
  // }

  // static initChildren() {
  //   let initAsync = Promise.all([MainDiv.topDivInit(), MainDiv.listDivInit()]);
  //   initAsync();
  // }
}
