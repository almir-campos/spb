'use strict';

import {AddDiv} from './add/AddDiv.js';

class TopDiv {
  static elem = document.querySelector('#top-div');
  static whoami = 'TopDiv';
  static do = {
    processEvent: function (e) {
      console.log(TopDiv.whoami, 'processEvent', 'target', e.target.id, 'phase', e.eventPhase);

    }
  };

  static init() {
    AddDiv.init();
  }
}

export {TopDiv as TopDiv}
