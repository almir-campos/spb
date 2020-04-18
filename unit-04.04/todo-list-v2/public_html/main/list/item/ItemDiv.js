'use strict';

import {Config}    from "../../../cfg.js";
import {TodoUtils} from "../../../misc/TodoUtils.js";
import {Utils}     from "../../../misc/Utils.js";


export class ItemDiv {

  constructor(elem) {
    this.init(elem);
  }

  init(elem) {
    // Utils.consolo.debug(false, 'ItemDiv received this object:', elem);
    if (Utils.isEmpty(elem) || TodoUtils.elementIsNotInItemContext(elem)) {
      throw Error('ERROR: "elem" is not in the item context: ');
    }
    if (TodoUtils.elementIsItemChild(elem)) {
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
    // this.removeBt = this.options.childNodes[1];
    // this.takeAction(elem);
  }

  // takeAction(elem) {
  //   if (elem.getAttribute('name').indexOf('done') !== -1) {
  //     this.do().toggleCompleted();
  //     return self;
  //   } else if (elem.getAttribute('name') === Config.elementNames.textarea) {
  //     // this.do().toggleEditing();
  //     return self;
  //   }
  // }

  set() {
    const self = this;
    return {
      completed() {
        return {
          on() {
            self.classes.add('completed');
            self.textarea.classList.add('completed');
            self.textarea.classList.remove('is-editing');
            self.doneBtIcon.innerHTML = Config.symbols.reopen;
            self.doneBtIcon.classList.add('reopen');
            return self;
          },
          off() {
            self.classes.remove('completed');
            self.textarea.classList.remove('completed');
            // self.textarea.classList.remove('is-editing');
            self.doneBtIcon.innerHTML = Config.symbols.done;
            self.doneBtIcon.classList.remove('reopen');
            return self;
          }
        }
      },
      editing() {
        return {
          on() {
            self.textarea.classList.add('is-editing');
            self.textarea.removeAttribute('disabled');
            self.textarea.focus();
            return self;
          },
          off() {
            self.textarea.classList.remove('is-editing');
            self.textarea.setAttribute('disabled', true);
            return self;
          }
        }
      },
      clicked() {
        return {
          on() {
            if ( self.is().clicked().off()) {
              self.classes.add('clicked');
            }
            return self;
          },
          off() {
            self.classes.remove('clicked');
            return self;
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
        return self;
      },
      toggleCompleted() {
        self.is().completed() ? self.completed().off() : self.completed().on();
        return self;
      },
      toggleEditing() {
        self.is().editing().on() ? self.set().editing().off() :
        self.set().editing().on();
        return self;
      }
    }
  }

  is() {
    const self = this;
    return {
      editing() {
        return {
          on() {
            return self.textarea.classList.contains('is-editing');
          },
          off() {
            return !this.on();
          }
        }
      },
      completed() {
        return self.classes.contains('completed');
      },
      clicked() {
        return {
          on() {
            return self.classes.contains('clicked');
          },
          off() {
            return !this.on();
          }
        }
      }
    }
  }

  get() {
    const self = this;
    return {
      id() {
        return self.id;
      },
      item() {
        return self.item;
      }
    }
  }
}

export {ItemDiv as Item}
