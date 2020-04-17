'use strict';

import {AddDiv} from './add/AddDiv.js';

export class TopDiv {
  static elem = document.querySelector('#top-div');
  static whoami = 'TopDiv';

  static do() {
    return {
      processEvent(e) {
        // console.log(TopDiv.whoami, 'processEvent', 'target', e.target.id,
        //             'phase', e.eventPhase);

      }
    }
  };

  static init() {
    AddDiv.init();
  }
}
