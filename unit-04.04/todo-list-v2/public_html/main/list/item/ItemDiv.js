'use strict';

class ItemDiv {
  static elem = document.querySelector('#list-div');
  static whoami = 'ItemDiv';

  static do = {
    processEvent: function (e) {
      console.log(ItemDiv.whoami, 'processEvent', 'path: ', e.path, 'target', e.target.id, 'phase', e.eventPhase);
    }
  };

  static init() {
    // ItemDiv.elem.addEventListener('click', e => {
    //   e.target.sender = 'ItemDiv';
    // }, true);
    // ItemDiv.elem.addEventListener('click', e => {
    // });
    // ItemDiv.elem.addEventListener('click', e => {
    //   e.target.sender = "ItemDiv";
    // }, false);
  }
}

export {ItemDiv as ItemDiv}
