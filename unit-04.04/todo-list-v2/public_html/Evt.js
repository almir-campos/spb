'use strict';

class Evt {
  static clickEvt = new CustomEvent( 'click', { bubbles: true, detail:{ msg: ''}});
  static clickCapEvt = function( elem, callback ) {
    elem.addEventListener('clickEvt', (e) => {
        e.detail.msg = e.target.id;
        if ( !callback) {
          return;
        }
        callback();
    }, true);
    elem.dispatchEvent(Evt.clickCapEvt);
  }
}
