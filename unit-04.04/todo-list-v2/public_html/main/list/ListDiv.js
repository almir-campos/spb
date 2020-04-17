'use strict';

import {Utils}           from '/todo-list-v2/public_html/misc/utils.js';
import {config}          from "/todo-list-v2/public_html/cfg.js";
import {TopDiv}          from "/todo-list-v2/public_html/main/top/TopDiv.js";
import {ItemDiv as Item} from "/todo-list-v2/public_html/main/list/item/ItemDiv.js";

export class ListDiv {
  static elem = document.querySelector('#list-div');
  static lastEditingItemId = undefined;
  static evt = undefined;

  static get() {
    const self = this;
    return {
      newItem() {

        /**
         * Creates the item's main container
         */
        let itemId = Utils.randomString(config.defaults.idLength);
        let item = document.createElement('div');
        item.setAttribute('id', itemId);
        item.setAttribute('name', 'item');
        item.classList.add('item');

        /**
         * Creates the text area (when the to-do text is showed or edited)
         */
        let text = document.createElement(config.elementNames.textarea);
        text.classList.add('text');
        // text.setAttribute('item-id', itemId );
        text.setAttribute('name', config.elementNames.textarea);
        text.setAttribute('changed', 'false');
        text.setAttribute('placeholder', itemId);
        text.toggleAttribute('disabled');
        // text.value = config.defaults.content;
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
        doneOptionContent.innerHTML = config.symbols.done;

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
        removeOptionContent.innerHTML = config.symbols.remove;

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
        return self.lastEditingItemId;
      },
      lastEditingItem() {
        const lastId = '#' + self.get().lastEditingItemId();
        const last = document.querySelector(lastId);
        if (Utils.isEmpty(last)) {
          return undefined;
        }
        return last;
      }
    }
  };

  static set() {
    const self = this;
    return {
      lastEditingItemId: function (id) {
        self.lastEditingItemId = id;
      }
    }
  }

  static is() {
    const self = this;
    return {
      addItemAction() {
        return ListDiv.evt.target.id === 'add-div';
      },
      editAction() {
        return ListDiv.evt.target.getAttribute('name') === 'textarea';
      },
      removeAction() {
        return ListDiv.evt.target.getAttribute('name').indexOf('remove') !== -1;
      },
      hotArea(elem) {
        return config.hotAreas.includes(elem.getAttribute('name'));
      },
      sameLastAndCurrent(e){
        const lastId = self.get().lastEditingItemId();
        return Utils.isEmpty( lastId ) || lastId === e.target.id;
      }
    }
  }

  //
  static do() {
    const self = this;
    return {
      processEvent(e) {
        ListDiv.evt = e;
        if (!self.is().hotArea(e.target)) {
          self.do().keepFocus();
          return;
        }

        /**
         * Add item
         * - Add an Item
         * - Keep the focus in the current editing item
         */
        if (self.is().addItemAction()) {
          this.addItem();
          this.keepFocus();
        } else
        /**
         * Remove item
         * - Remove item
         * - else, check the last clicked item:
         *   if there's none, return; else:
         *      - if it's editing, keeps the focus on it;
         */
        if (self.is().removeAction()) {
          const item = new Item(e.target);
          if (!item.is().editing()) {
            self.do().keepFocus();
          }
          this.removeItem(e);
        } else {
          /**
           * Toggle Edit Mode
           * - If clicked item is editing:
           *   - Turn editing off
           */
          const item = new Item(e.target);

          console.log(self.is().sameLastAndCurrent(e));

          if (self.is().sameLastAndCurrent())
           {
            item.do().toggleEditing();
          } else {
            this.resetLastEditingItem();
            this.updateLastEditingItemId(item);
            item.set().editing().on();
          }
        }
      },
      updateLastEditingItemId(item) {
        self.set().lastEditingItemId(item.get().id());
      },
      resetLastEditingItem() {
        const last = self.get().lastEditingItem();
        if (Utils.isEmpty(last)) {
          return;
        }
        new Item(last).set().editing();
      },
      addItem() {
        let item = ListDiv.get().newItem();
        ListDiv.elem.append(item);
        this.keepFocus();
        return item;
      },
      removeItem(e) {
        e.target.closest('.item').remove();
      },
      keepFocus() {
        const last = self.get().lastEditingItem();
        if (Utils.isEmpty(last)) {
          return;
        }
        new Item(last).do().focus();
      }
    }
  };

  static init() {
    ListDiv.do().addItem();
  }
}
