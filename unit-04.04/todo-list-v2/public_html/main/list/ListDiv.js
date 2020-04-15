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
      let itemId = Utils.randomString(config.defaults.idLength);
      let item = document.createElement('div');
      // item.setAttribute('id', itemId );
      item.setAttribute('name', 'item');
      item.classList.add('item');

      /**
       * Creates the text area (when the to-do text is showed or edited)
       */
      let text = document.createElement('textarea');
      text.classList.add('text');
      // text.setAttribute('item-id', itemId );
      text.setAttribute('name', 'textarea');
      text.setAttribute('changed', 'false');
      text.toggleAttribute('disabled');
      // text.value = config.defaults.content;
      text.value = itemId;
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
      doneOptionContent.setAttribute('item-id', itemId );
      doneOptionContent.setAttribute('name', 'done-bt-html');
      doneOptionContent.classList.add('option-content', 'disable-selection');
      doneOptionContent.innerHTML = config.symbols.done;

      /**
       * Creates the "button" to remove the current item from the list
       */
      let remove = document.createElement('div');
      // remove.setAttribute('item-id', itemId );
      remove.setAttribute('name', 'remove-bt');
      remove.setAttribute('title', 'Click to remove this item');
      remove.classList.add('option', 'remove');
      let removeOptionContent = document.createElement('span');
      removeOptionContent.setAttribute('item-id', itemId );
      removeOptionContent.setAttribute('name', 'remove-bt-html');
      removeOptionContent.classList.add('option-content', 'disable-selection');
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
      } else if ( e.target.getAttribute('name').indexOf('remove') !== -1 ) {
        // console.log( 'remove-bt clicked');
        this.removeItem(e);
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
    },
    removeItem: function( e ) {
      e.target.closest('.item').remove();
    }
  };

  static init() {
  }
}

export {ListDiv}
