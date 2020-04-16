'use strict';

import {config} from "/todo-list-v2/public_html/cfg.js";
import {KONZ}   from "../../../Constants.js";

class ItemDiv {
  // static elem = document.querySelector('#list-div');
  static whoami = 'ItemDiv';

  constructor(elem) {
    if (this.is().itemChild(elem)) {
      this.item = elem.closest('.item');
    } else {
      this.item = elem;
    }
    this.id = this.item.id;
    this.classes = this.item.classList;
    this.children = this.item.childNodes;
    this.textarea = this.children[0];
    this.options = this.children[1];
    this.doneBt = this.options.childNodes[0];
    this.doneBtIcon = this.doneBt.childNodes[0];
    this.removeBt = this.options.childNodes[1];
    this.removeBtIcon = this.removeBt.childNodes[0];
    this.takeAction(elem);
  }

  static init() {
  }

  takeAction(elem) {
    if (elem.getAttribute('name').indexOf('done') !== -1) {
      this.set().completed();
    } else if (elem.getAttribute('name') === 'textarea') {
      console.log('TEXTAREA');
      this.set().editing();
    }
  }

  set() {
    const self = this;
    return {
      completed() {
        if (self.is().completed()) {
          self.classes.remove('completed');
          self.textarea.classList.remove('completed');
          // self.textarea.classList.remove('is-editing');
          self.doneBtIcon.innerHTML = config.symbols.done;
          self.doneBtIcon.classList.remove('reopen');
        } else {
          self.classes.add('completed');
          self.textarea.classList.add('completed');
          self.textarea.classList.remove('is-editing');
          self.doneBtIcon.innerHTML = config.symbols.reopen;
          self.doneBtIcon.classList.add('reopen');
        }
      }, editing() {
        const on = function () {
          self.textarea.classList.add('is-editing');
          self.textarea.removeAttribute('disabled');
          self.textarea.focus();
        };
        const off = function () {
          self.textarea.classList.remove('is-editing');
          self.textarea.setAttribute('disabled', true);
        };
        if (self.is().editing()) {
          off();
        } else {
          on();
        }
      }
    }
  }

  do() {
    const self = this;
    return {
      focus() {
        self.textarea.focus();
      }
    }
  }

  is() {
    const self = this;
    return {
      editing() {
        return self.textarea.classList.contains('is-editing');
      }, completed() {
        return self.classes.contains('completed');
      }, itemChild(elem) {
        return KONZ.itemChildNames.includes(elem.getAttribute('name'))
      }
    }
  }

  get() {
    const self = this;
    return {
      id() {
        return self.id;
      }
    }
  }
}

export {ItemDiv as Item}
