'use strict';

class ItemDiv {
  static elem = document.querySelector('#list-div');
  static whoami = 'ItemDiv';

  static do = {
    processEvent: function (e) {
      console.log(ItemDiv.whoami, 'processEvent', 'target', e.target.id, 'phase', e.eventPhase);
    }
  };

  static init() {
  }
}

export {ItemDiv as ItemDiv}
