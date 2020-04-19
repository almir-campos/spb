'use strict';

import {Config}          from '../../cfg.js';
import {ItemDiv as Item} from "./item/ItemDiv.js";
import {ListDiv as THIS} from './ListDiv.js';
import {Utils}           from "../../misc/utils.js";
import {TodoUtils}       from "../../misc/TodoUtils.js";

export class ListDiv {
  static listDivElement = document.querySelector('#list-div');
  static lastEditingItemId = undefined;
  static lastClickedItemId = undefined;
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
        // text.setAttribute('changed', 'false');
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
      allItems() {
        const items = THIS.listDivElement.querySelectorAll('.item');
        return items;
      },
      storedData() {
        let storedData = JSON.parse(localStorage.getItem('todo'));
        return storedData;
      },
      lastEditingItemId() {
        return THIS.lastEditingItemId;
      },
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
    return {
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
    return {
      addItemAction() {
        return THIS.evt.target.id === 'add-div';
      },
      saveListAction() {
        return THIS.evt.target.id === 'save-div';
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
        } else if (THIS.is().saveListAction()) {
          return this.saveListAction();
        } else if (THIS.is().doneAction()) {
          return this.doneAction();
        } else if (THIS.is().removeAction()) {
          return this.removeAction();
        } else if (THIS.is().editModeAction()) {
          return this.editModeAction();
        }
      },
      addItemAction() {
        const item = THIS.get().newItemElement();
        THIS.listDivElement.append(item);
        this.keepFocus();
        return THIS;
      },
      saveListAction() {
        const todo = {data: []};
        const items = THIS.get().allItems();
        items
          .forEach((item) => {
            // console.log(item.id, item.firstChild.value,
            //             item.classList.contains('completed'));
            todo.data.push({
                             "text"     : item.firstChild.value,
                             "completed": item.classList.contains('completed')
                           });
          });
        localStorage.setItem("todo", Utils.consolo.json(todo, true));
      },
      editModeAction() {
        // TODO: This block of code is repeated. Optimize it.
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
      doneAction() {
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
        if (TodoUtils.eventContainsItemContext(THIS.evt)) {
          // TODO: This block of code is repeated. Optimize it.
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
    const storedData = THIS.get().storedData();
    // console.log('storedData', storedData);
    if (Utils.isNotEmpty(storedData)) {
      // console.log('you have data...');
      let newItem;
      storedData.data.forEach(item => {
        newItem = new Item(THIS.get().newItemElement());
        newItem.set().text(item.text);
        if (Boolean(item.completed)) {
          newItem.set().completed().on();
        } else {
          newItem.set().completed().off();
        }
        THIS.listDivElement.append(newItem.get().item());
      });
    } else {
      THIS.do().addItemAction();
    }
  }
}
