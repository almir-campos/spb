'use strict';

import {TopDiv}  from './top/TopDiv.js';
import {ListDiv} from './list/ListDiv.js';

class MainDiv {
  static elem = document.querySelector('#main-div');
  static whoami = 'MainDiv';

  // static processEvent = {
  //   processEvent: function (e) {
  //     console.log(MainDiv.whoami, 'processEvent', 'target', e.target.id,
  // 'phase', e.eventPhase); // MainDiv.broadcastEvent(e); } };

  static init() {
    /**
     * Target
     */
    MainDiv.elem.addEventListener('click', e => {
      TopDiv.do().processEvent(e);
      ListDiv.do().processEvent(e);
    });

    this.initChildren();
    // TopDiv.init();
    //ListDiv.init();
  }

  static topDivInit() {
    return new Promise((resolve, reject) => {
      TopDiv.init();
    });
  }

  static listDivInit() {
    return new Promise((resolve, reject) => {
      ListDiv.init();
    });
  }

  static initChildren() {
    Promise.all([MainDiv.topDivInit(), MainDiv.listDivInit()]);
  }
}

export {MainDiv as MainDiv}
