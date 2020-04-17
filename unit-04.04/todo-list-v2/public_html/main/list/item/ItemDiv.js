'use strict';

import {config} from "/todo-list-v2/public_html/cfg.js";

export class ItemDiv {
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
    this.takeAction(elem);
  }

  static init() {
  }

  takeAction(elem) {
    if (elem.getAttribute('name').indexOf('done') !== -1) {
      this.set().completed();
    } else if (elem.getAttribute('name') === config.elementNames.textarea) {
      this.set().editing();
    }
  }

  set() {
    const self = this;
    return {
      completed() {
        return {
          on() {
            self.classes.add('completed');
            self.textarea.classList.add('completed');
            self.textarea.classList.remove('is-editing');
            self.doneBtIcon.innerHTML = config.symbols.reopen;
            self.doneBtIcon.classList.add('reopen');
          },
          off() {
            self.classes.remove('completed');
            self.textarea.classList.remove('completed');
            // self.textarea.classList.remove('is-editing');
            self.doneBtIcon.innerHTML = config.symbols.done;
            self.doneBtIcon.classList.remove('reopen');
          }
        }
      },
      editing() {
        return {
          on() {
            self.textarea.classList.add('is-editing');
            self.textarea.removeAttribute('disabled');
            self.textarea.focus();
          },
          off() {
            self.textarea.classList.remove('is-editing');
            self.textarea.setAttribute('disabled', true);
          }
        }
      },
      clicked() {
        return {
          on() {
            self.classes.add('clicked');
          },
          off() {
            self.classes.remove('clicked');
          }
        }
      }
    }
  }

  do() {
    const self = this;
    return {
      focus() {
        if (self.is().editing()) {
          self.textarea.focus();
        }
        self.set().clicked().on();
      },
      toggleCompleted() {
        return self.is().completed() ? self.completed().off() :
               self.completed().on();
      },
      toggleEditing() {
        return self.is().editing() ? self.set().editing().off() : self.set().editing().on();
      }
    }
  }

  is() {
    const self = this;
    return {
      editing() {
        return self.textarea.classList.contains('is-editing');
      },
      completed() {
        return self.classes.contains('completed');
      },
      itemChild(elem) {
        return config.itemChildNames.includes(elem.getAttribute('name'))
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
