'use strict';

import {config} from "/todo-list-v2/public_html/cfg.js";

class ItemDiv {
  // static elem = document.querySelector('#list-div');
  static whoami = 'ItemDiv';

  do = {
    // processEvent: function (e) {
    //   console.log(ItemDiv.whoami, 'processEvent', 'target', e.target.id,
    // 'phase', e.eventPhase); } test: function(){ console.log(
    // 'ItemDiv/do/test()' ); }
  };

  constructor(clicked) {
    // if ( this.item.classList.includes('item'))
    this.item = clicked.closest('.item');
    this.id = this.item.id;
    this.classes = this.item.classList;
    this.children = this.item.childNodes;
    this.textarea = this.children[0];
    this.options = this.children[1];
    this.doneBt = this.options.childNodes[0];
    this.doneBtIcon = this.doneBt.childNodes[0];
    this.removeBt = this.options.childNodes[1];
    this.removeBtIcon = this.removeBt.childNodes[0];
  }

  static init() {
  }

  set() {
    const self = this;
    return {
      completed: function () {

        const done = !self.classes.contains('completed');
        if (done) {
          self.classes.add('completed');
          self.textarea.classList.add('completed');
          self.textarea.classList.remove('is-editing');
          self.doneBtIcon.innerHTML = config.symbols.reopen;
          self.doneBtIcon.classList.add('reopen');
        } else {
          self.classes.remove('completed');
          self.textarea.classList.remove('completed');
          // self.textarea.classList.remove('is-editing');
          self.doneBtIcon.innerHTML = config.symbols.done;
          self.doneBtIcon.classList.remove('reopen');
        }
      }
    }
  };
}

export {ItemDiv as Item}
