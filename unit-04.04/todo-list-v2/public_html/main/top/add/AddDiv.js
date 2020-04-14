'use strict';

import {Utils} from '../../../misc/utils.js';
import {KONZ}  from "../../../Constants.js";

class AddDiv {
  static elem = document.querySelector('#add-div');

  static init() {
    AddDiv.elem.addEventListener('click', e => {
      // Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓');
      Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓', 'currentTarget', e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      Utils.consolo.debug(false, '↓↓↓↓↓↓↓↓↓', 'AddDiv/Captured' +
        ' from', e.target.sender, e, e.path);
     // e.target.sender = "AddDiv"; // No need if if this is the target
    }, true);
    AddDiv.elem.addEventListener('click', e => {
      // Utils.consolo.debug(false, '---------');
      Utils.consolo.debug(false, '---------', 'currentTarget', e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      Utils.consolo.debug(false, '---------', 'AddDiv/Target/Treating Click Event' +
        ' received', e, e.path);
      // Utils.consolo.debug(false, '---------');
    });
    AddDiv.elem.addEventListener('click', e => {
      Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑', 'currentTarget', e.currentTarget, ['Capture', 'Target', 'Bubble'][e.eventPhase-1]);
      Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑', 'AddDiv/Bubbling up' +
        ' Received' +
        ' received from', e.target.sender, e, e.path);
      // Utils.consolo.debug(false, '↑↑↑↑↑↑↑↑↑');
      e.target.sender = "AddDiv";
      e.target.msg = {from: 'addDiv', value: KONZ.msg.origin.addDiv.action.addItem };
    }, false);
  }
}

export {AddDiv as AddDiv}
