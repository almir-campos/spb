'use strict';

import {TopDiv}  from './top/TopDiv.js';
import {ListDiv} from './list/ListDiv.js';

class MainDiv {
  static elem = document.querySelector('#main-div');
  static whoami = 'MainDiv';

  static prom = new Promise( function( resolve, reject){} );

  static processEvent = {
    processEvent: function (e) {
      console.log(MainDiv.whoami, 'processEvent', 'path: ', e.path, 'target', e.target.id, 'phase', e.eventPhase);
      MainDiv.broadcastEvent(e);
    }
  };

  static init() {
    /**
     * Capture
     */
    MainDiv.elem.addEventListener('click', e => {
      // Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓');
      // Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓', 'currentTarget',
      // e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      // Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓', 'MainDiv/Capture/Click Event
      // received',e, e.path ); e.target.sender = 'MainDiv';
      MainDiv.broadcastEvent(e);
    }, true);

    /**
     * Target
     */
    MainDiv.elem.addEventListener('click', e => {
      // Utils.consolo.debug(false, '---------');
      // Utils.consolo.debug(false, '---------', 'currentTarget',
      // e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      // Utils.consolo.debug(false, '---------', 'MainDiv/Target/Treating Click
      // Event',e, e.path); Utils.consolo.debug(false, '---------'); if (
      // e.target.todo.context) e.target.todo.context = 'main-div';
      // e.target.todo.from = 'main-div'; e.target.todo.msg='clicked';
      MainDiv.broadcastEvent(e);
    });

    /**
     * Bubble
     */
    MainDiv.elem.addEventListener('click', e => {
      // Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑', 'currentTarget',
      // e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      // Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑', 'MainDiv/Bubble/Click Event
      // received' + 'from', e.target.sender,'with the', e.target.msg, 'msg' );
      // Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑'); e.target.sender = "MainDiv";
      // let msg = e.target.msg; if ( msg.value ===
      // KONZ.msg.origin.addDiv.action.addItem ) {
      MainDiv.broadcastEvent(e);
      // }
    }, false);

    TopDiv.init();
    ListDiv.init();
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
    console.log(MainDiv.whoami, 'processEvent', 'path: ', e.path, 'target', e.target.id, 'phase', e.eventPhase);
    Promise.all( [MainDiv.broadcastToTopDiv(e), MainDiv.broadcastToListDiv(e)] );
  }
}

export {MainDiv as MainDiv}
