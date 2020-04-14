'use strict';

import {Utils}  from '../misc/utils.js';
import { KONZ } from '../Constants.js';
import {TopDiv} from './top/TopDiv.js';
import {ListDiv} from './list/ListDiv.js';

class MainDiv {
  static elem = document.querySelector('#main-div');

  static init() {
    MainDiv.elem.addEventListener('click', e => {
      // Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓');
      Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓', 'currentTarget', e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓', 'MainDiv/Capture/Click Event received',e, e.path );
      e.target.sender = 'MainDiv';
    }, true);
    MainDiv.elem.addEventListener('click', e => {
      // Utils.consolo.debug(false, '---------');
      Utils.consolo.debug(false, '---------', 'currentTarget', e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      Utils.consolo.debug(false, '---------', 'MainDiv/Target/Treating Click Event',e, e.path);
      // Utils.consolo.debug(false, '---------');
    });
    MainDiv.elem.addEventListener('click', e => {
      Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑', 'currentTarget', e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑', 'MainDiv/Bubble/Click Event received' +
        'from', e.target.sender,'with the', e.target.msg, 'msg' );
      // Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑');
      e.target.sender = "MainDiv";
      //
      // let msg = e.target.msg;
      // if ( msg.value === KONZ.msg.origin.addDiv.action.addItem ) {
        ListDiv.do.processMsg( e );
      // }
    }, false);

    TopDiv.init();
    ListDiv.init();
  }
}

export {MainDiv as MainDiv}
