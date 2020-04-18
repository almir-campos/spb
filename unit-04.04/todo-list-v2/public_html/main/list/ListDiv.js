'use strict';

import {Config}          from '../../cfg.js';
import {ItemDiv as Item} from "./item/ItemDiv.js";
import {ListDiv as THIS} from './ListDiv.js';
import {Utils}           from "../../misc/utils.js";
import {TodoUtils}       from "../../misc/TodoUtils.js";

export class ListDiv {
  /**/
  static listDivElement = document.querySelector('#list-div');
  /**/
  static lastEditingItemId = undefined;
  // static lastEditingItemState = undefined;
  // static lastEditingItemElement = undefined;
  // static lastEditingItem = undefined;
  /**/
  // static currentEditingItemId = undefined;
  // static currentEditingItemElement = undefined;
  // static currentEditingItem = undefined;
  /**/
  static lastClickedItemId = undefined;
  // static lastClickedItemElement = undefined;
  // static lastClickedItem = undefined;
  /**/
  // static currentClickedItemId = undefined;
  // static currentClickedItemElement = undefined;
  // static currentClickedItem = undefined;
  /**/
  static evt = undefined;

  static get() {
    // const.self = this;
    return {
      newItemElement: function () {

        /**
         * Creates the item's main container
         */
        let itemId = Utils.randomString(Config.defaults.idLength);
        let item = document.createElement('div');
        item.setAttribute('id', itemId);
        item.setAttribute('name', 'item');
        item.classList.add('item');

        /**
         * Creates the text area (when the to-do text is showed or edited)
         */
        let text = document.createElement(Config.elementNames.textarea);
        text.classList.add('text');
        // text.setAttribute('item-id', itemId );
        text.setAttribute('name', Config.elementNames.textarea);
        text.setAttribute('changed', 'false');
        text.setAttribute('placeholder', itemId);
        text.toggleAttribute('disabled');
        // text.value = Config.defaults.content;
        text.setAttribute('title', 'Click to turn edit on/off');

        /**
         * Creates the lateral container that will contain the action options
         */
        let options = document.createElement('div');
        options.setAttribute('name', 'options');
        options.classList.add('options');

        /**
         * Creates the "button" to mark the current item as completed (done)
         */
        let done = document.createElement('div');
        // done.setAttribute('item-id', itemId );
        done.setAttribute('name', 'done-bt');
        done.setAttribute('title', 'Click to complete/reopen this item');
        done.classList.add('option', 'done');
        let doneOptionContent = document.createElement('span');
        doneOptionContent.setAttribute('item-id', itemId);
        doneOptionContent.setAttribute('name', 'done-bt-html');
        doneOptionContent.classList.add('option-content', 'disable-selection');
        doneOptionContent.innerHTML = Config.symbols.done;

        /**
         * Creates the "button" to remove the current item from the list
         */
        let remove = document.createElement('div');
        remove.setAttribute('name', 'remove-bt');
        remove.setAttribute('title', 'Click to remove this item');
        remove.classList.add('option', 'remove');
        let removeOptionContent = document.createElement('span');
        removeOptionContent.setAttribute('item-id', itemId);
        removeOptionContent.setAttribute('name', 'remove-bt-html');
        removeOptionContent.classList.add('option-content',
                                          'disable-selection');
        removeOptionContent.innerHTML = Config.symbols.remove;

        /**
         * Integrates all the above elements in one item
         */
        done.appendChild(doneOptionContent);
        remove.appendChild(removeOptionContent);
        options.appendChild(done);
        options.appendChild(remove);
        item.append(text);
        item.appendChild(options);
        return item;
      },
      lastEditingItemId() {
        return THIS.lastEditingItemId;
      }, // lastEditingItemState() {
      //   return THIS.lastEditingItemState;
      // },
      // lastEditingItem() {
      //   return THIS.lastEditingItem;
      // },
      // currentEditingItemId() {
      //   return THIS.currentEditingItemId;
      // },
      // currentEditingItemElement() {
      //   return THIS.currentEditingItemElement;
      // },
      // currentEditingItem() {
      //   return THIS.currentEditingItem;
      // },
      // /**
      //  * Returns the current clicked Item. Notice that the target can be a
      //  * child of an item. That's why it's necessary to create a new Item(),
      //  * which wraps the logic for getting the actual item from a child.
      //  *
      //  * If the there's no current clicked item, throws a warning and
      //  * returns a new Item, instead of an 'undefined' statement. This is to
      //  * not break the chained methods.
      //  */
      lastClickedItem() {
        return THIS.lastClickedItem;
      },
      lastClickedItemId() {
        return THIS.lastClickedItemId;
      },
      lastClickedItemElement() {
        return THIS.lastClickedItemElement;
      },
      currentClickedItem() {
        return THIS.currentClickedItem;
      },
      currentClickedItemId() {
        return THIS.currentClickedItemId;
      },
      currentClickedItemElement() {
        return THIS.currentClickedItemElement;
      },
      elementById(id) {
        return document.getElementById(id);
      }
    }
  };

  static set() {
    // const.self = this;
    return {
      globalClickedItemVariables() {
        console.log('THIS.evt', THIS.evt);
        if (TodoUtils.eventContainItemContext(THIS.evt)) {
          THIS.lastClickedItemId = THIS.currentClickedItemId;
          THIS.lastClickedItemElement = THIS.currentClickedItemElement;
          THIS.lastClickedItem = THIS.currentClickedItem;
          /**/
          if (TodoUtils.eventContainsItem(THIS.evt)) {
            THIS.currentClickedItemId = THIS.evt.target.id;
            THIS.currentClickedItemElement = THIS.evt.target;
            THIS.currentClickedItem = new Item(THIS.evt.target);
          } else {
            THIS.currentClickedItemElement = TodoUtils.getItemElement(THIS.evt);
            THIS.currentClickedItem = new Item(THIS.currentClickedItemElement);
            THIS.currentClickedItemId = THIS.currentClickedItem.get().id();
          }
        }
      }, // globalEditingItemVariables() {
      //   if (Utils.isEmpty(THIS.lastClickedItem) ||
      //       THIS.lastClickedItem.is().editing().on()) {
      //     THIS.lastEditingItem = THIS.lastClickedItem;
      //     THIS.lastEditingItemElement = THIS.lastClickedItemElement;
      //     THIS.lastEditingItemId = THIS.lastClickedItemId;
      //   }
      //   if (THIS.currentClickedItem.is().editing().on()) {
      //     THIS.currentEditingItem = THIS.currentClickedItem;
      //     THIS.currentEditingItemElement = THIS.currentClickedItemElement;
      //     THIS.currentEditingItemId = THIS.currentClickedItemId;
      //   } else {
      //     THIS.currentEditingItem = undefined;
      //     THIS.currentEditingItemElement = undefined;
      //     THIS.currentEditingItemId = undefined;
      //   }
      // },
      lastEditingItemId(id) {
        THIS.lastEditingItemId = id;
      },
      lastClickedItemId(id) {
        THIS.lastClickedItemId = id;
      },
      currentClickedHighlight() {
        return {
          on() {
            THIS.currentClickedItem.set().clicked().on();
            return THIS;
          }
        }
      }
    }
  }

  static is() {
    // const.self = this;
    return {
      addItemAction() {
        return THIS.evt.target.id === 'add-div';
      },
      doneAction() {
        return THIS.evt.target.getAttribute('name')
                   .indexOf('done') !== -1;
      },
      removeAction() {
        return THIS.evt.target.getAttribute('name')
                   .indexOf('remove') !== -1;
      },
      editModeAction() {
        const result = THIS.evt.target.getAttribute('name') === 'textarea';
        return result;
      },
      hotArea(elem) {
        return Config.hotAreas.includes(elem.getAttribute('name'));
      },
      sameLastAndCurrent() {
        const lastId = THIS.get().lastEditingItemId();
        return lastId === THIS.get().currentClickedItemId();
      }
    }
  }

  //
  static do() {
    return {
      processEvent(e) {
        THIS.evt = e;
        if (!THIS.is().hotArea(e.target)) {
          THIS.do().keepFocus();
          return THIS;
        }

        this.setItemAsClicked();
        if (THIS.is().addItemAction()) {
          return this.addItemAction();
        } else if ( THIS.is().doneAction() ){
          return this.doneAction();
        } else if (THIS.is().removeAction()) {
          return this.removeAction();
        } else if (THIS.is().editModeAction()) {
          return this.editModeAction();
          // console.clear();
          // THIS.do().console();
          // const lastEd = THIS.get().lastEditingItem();
          // if (Utils.isNotEmpty(lastEd)) {
          //   lastEd.toggleEditing();
          // }
          // const currentCl = THIS.get().currentClickedItem();
          // currentCl.do().toggleEditing();
          // if ( THIS.currentClickedItem.is().editing().on()) {
          //   THIS.last
          // }
          //   // THIS.set().globalEditingItemVariables();
          // if (currentCl.is().editing().on()) {
          //   THIS.currentEditingItem = THIS.currentClickedItem;
          // }
          // this.updateEditingStyle();
          // THIS.do().resetLastEditingItem();
          // if ( Utils.isNotEmpty(THIS.get().currentEditingItem())) {
          // THIS.get().currentEditingItem().toggleEditing();
          // }
          // this.updateEditingStyle();
          // THIS.do().console();
        }
      }, // updateLastEditingItemId(item) {
      //   if (Utils.isNotEmpty(item)) {
      //     THIS.set().lastEditingItemId(item.get().id());
      //   }
      //   return THIS;
      // },
      // updateClickedStyle() {
      //   if (Utils.isNotEmpty(THIS.lastClickedItem)) {
      //     THIS.lastClickedItem.set().clicked().off();
      //   }
      //   if (Utils.isNotEmpty(THIS.currentClickedItem)) {
      //     THIS.currentClickedItem.set().clicked().on();
      //   }
      //   THIS.set().globalClickedItemVariables();
      // },
      // updateEditingStyle() {
      //   if (Utils.isNotEmpty(THIS.lastEditingItem)) {
      //     THIS.lastEditingItem.set().editing().off();
      //   }
      //   if (Utils.isNotEmpty(THIS.currentEditingItem)) {
      //     THIS.currentEditingItem.set().editing().on();
      //   }
      //   THIS.set().globalEditingItemVariables();
      // }, // resetLastEditingItem() {
      //   const last = THIS.get().lastEditingItem();
      //   if (Utils.isNotEmpty(last)) {
      //     last.set().editing().off();
      //   }
      //   return THIS;
      // },
      addItemAction() {
        let item = THIS.get().newItemElement();
        THIS.listDivElement.append(item);
        this.keepFocus();
        return THIS;
      },
      editModeAction() {
        const lastId = THIS.get().lastEditingItemId();
        const currentItem = new Item(THIS.evt.target);
        const itemId = currentItem.get().id();
        if (lastId !== itemId) {
          if (Utils.isNotEmpty(lastId)) {
            const lastElement = THIS.get().elementById(lastId);
            if (Utils.isNotEmpty(lastElement)) {
              const last = new Item(lastElement);
              last.set().clicked().off();
            }
          }
          THIS.set().lastEditingItemId(itemId);
        }
        currentItem.do().toggleEditing();
        return THIS;
      },
      doneAction(){
        const item = new Item(THIS.evt.target);
        item.do().toggleCompleted();
        if (item.is().editing().off()) {
          THIS.do().keepFocus();
        }
        return THIS;
      },
      removeAction() {
        const item = new Item(THIS.evt.target);
        if (item.is().editing().off()) {
          THIS.do().keepFocus();
        } else {
          THIS.set().lastEditingItemId(undefined);
          THIS.set().lastClickedItemId(undefined);
        }
        this.removeItem();
        return THIS;
      },
      removeItem() {
        THIS.evt.target.closest('.item').remove();
        return THIS;
      },
      keepFocus() {
        const lastId = THIS.get().lastEditingItemId();
        if (Utils.isEmpty(lastId)) {
          return THIS;
        }
        const lastItem = THIS.get().elementById(lastId);
        new Item(lastItem).do().focus();
        return THIS;
      },
      setItemAsClicked() {
        if (TodoUtils.eventContainItemContext(THIS.evt)) {
          const clickedElement = TodoUtils.getItemElement(THIS.evt);
          const clicked = new Item(clickedElement);
          const lastId = THIS.get().lastClickedItemId();
          const clickedId = clicked.get().id();
          if (clickedId !== lastId) {
            if (Utils.isNotEmpty(lastId)) {
              const lastElement = THIS.get().elementById(lastId);
              if (Utils.isNotEmpty(lastElement)) {
                const last = new Item(lastElement);
                last.set().editing().off();
              }
            }
            THIS.set().lastClickedItemId(clickedId);
            clicked.set().clicked().on();
          }
        }
      }
    }
  };

  static init() {
    THIS.do().addItemAction();
  }
}
