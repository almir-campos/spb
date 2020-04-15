'use strict';

import {Utils}  from '../../misc/utils.js';
import {config} from "../../cfg.js";
import {TopDiv} from "../top/TopDiv.js";
import {ItemDiv} from "../list/item/ItemDiv.js";

class ListDiv {
  static elem = document.querySelector('#list-div');
  static get = {
    newItem: function () {

      /**
       * Creates the item's main container
       */
      let item = document.createElement('div');
      item.setAttribute('id', Utils.randomString(config.defaults.idLength));
      item.setAttribute('name', 'item');
      item.classList.add('item');

      /**
       * Creates the text area (when the to-do text is showed or edited)
       */
      let text = document.createElement('textarea');
      text.classList.add('text');
      text.setAttribute('name', 'textarea');
      text.setAttribute('changed', 'false');
      text.toggleAttribute('disabled');
      text.value = config.defaults.content;
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
      done.setAttribute('name', 'done-bt');
      done.classList.add('option', 'done');
      done.setAttribute('title', 'Click to complete/reopen this item');
      let doneOptionContent = document.createElement('span');
      doneOptionContent.classList.add('option-content', 'disable-selection');
      doneOptionContent.setAttribute('name', 'done-bt-html');
      doneOptionContent.innerHTML = config.symbols.done;

      /**
       * Creates the "button" to remove the current item from the list
       */
      let remove = document.createElement('div');
      remove.setAttribute('name', 'remove-bt');
      remove.classList.add('option', 'remove');
      remove.setAttribute('title', 'Click to remove this item');
      let removeOptionContent = document.createElement('span');
      removeOptionContent.classList.add('option-content', 'disable-selection');
      removeOptionContent.setAttribute('name', 'remove-bt-html');
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
  };
  //
  static do = {
    processEvent: function (e) {
      console.log(TopDiv.whoami, 'processEvent', 'target', e.target.id, 'phase', e.eventPhase);
      if ( e.target.id === 'add-div') {
        this.addItem();
      } else if ( e.target.id.indexOf('remove-div') !== -1 ) {
        console.log
      }
      // ItemDiv.do.processEvent( e );
    },
    addItem: function () {
      let item = ListDiv.get.newItem();
      // let itemObj = new Item(item);
      ListDiv.elem.append(item);
      // this.updateHighlight(itemObj);
      // this.keepItemFocus();
      return item;
    }
  };

  static init() {
  }
}

export {ListDiv}
