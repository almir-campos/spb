'use strict';

import {TopDiv}  from './top/TopDiv.js';
import {ListDiv} from './list/ListDiv.js';

class MainDiv {
  static elem = document.querySelector('#main-div');
  static whoami = 'MainDiv';

  // static processEvent = {
  //   processEvent: function (e) {
  //     console.log(MainDiv.whoami, 'processEvent', 'target', e.target.id, 'phase', e.eventPhase);
  //     // MainDiv.broadcastEvent(e);
  //   }
  // };

  static init() {
    /**
     * Capture
     */
    // MainDiv.elem.addEventListener('click', e => {
    //   // MainDiv.broadcastEvent(e);
    // }, true);

    /**
     * Target
     */
    MainDiv.elem.addEventListener('click', e => {
      // MainDiv.broadcastEvent(e);
      TopDiv.do.processEvent(e);
      ListDiv.do.processEvent(e);
    });

    /**
     * Bubble
     */
    // MainDiv.elem.addEventListener('click', e => {
    //   // MainDiv.broadcastEvent(e);
    //   // }
    // }, false);

    // TopDiv.init();
    // ListDiv.init();
  }

  static broadcastToTopDiv(e){
    return new Promise( (resolve, reject ) => {
      TopDiv.do.processEvent(e);
    });
  }

  static broadcastToListDiv(e){
    return new Promise( (resolve, reject ) => {
      ListDiv.do.processEvent(e);
    });
  }
  static broadcastEvent(e) {
    console.log(MainDiv.whoami, 'processEvent', 'target', e.target.id, 'phase', e.eventPhase);
    Promise.all( [MainDiv.broadcastToTopDiv(e), MainDiv.broadcastToListDiv(e)] );
  }
}

export {MainDiv as MainDiv}
