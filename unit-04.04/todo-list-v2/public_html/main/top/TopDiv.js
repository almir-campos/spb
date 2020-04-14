'use strict';

import {AddDiv} from './add/AddDiv.js';

import {Utils} from '../../misc/utils.js';

class TopDiv {
  static elem = document.querySelector('#top-div');

  static init() {
    TopDiv.elem.addEventListener('click', e => {
      // Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓');
      Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓', 'currentTarget', e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓', 'TopDiv/Captured' +
        ' from', e.target.sender, e, e.path);
      e.target.sender = 'TopDiv';
    }, true);
    TopDiv.elem.addEventListener('click', e => {
      // Utils.consolo.debug(false, '---------');
      Utils.consolo.debug(false, '---------', 'currentTarget', e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      Utils.consolo.debug(false, '---------', 'TopDiv/Target/Treating Click Event' +
        ' received', e, e.path);
      // Utils.consolo.debug(false, '---------');
    });
    TopDiv.elem.addEventListener('click', e => {
      Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑', 'currentTarget', e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑', 'TopDiv/Bubbled to me' +
        ' from', e.target.sender, e, e.path);
      // Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑', 'Bubbling it up (mesmo???)');
      // Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑');
      e.target.sender = "TopDiv";
    }, false);
    AddDiv.init();
  }
}

export {TopDiv as TopDiv}
