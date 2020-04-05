  'use strict';

  import { Utils } from '../utils.js';
  import { config } from '../cfg.js';
  import { ListUtils } from '../list-utils.js';

  export class Item
    {
      constructor(item)
        {
          this.item = item;
//          this.item.setAttribute('data-id', Utils.randomString(8));
          this.children = item.childNodes;
          this.textarea = this.children[0];
          this.options = this.children[1];
          this.doneBt = this.options.childNodes[0];
          this.doneBtSpan = this.doneBt.childNodes[0];
          this.removeBt = this.options.childNodes[1];
          this.removeBtSpan = this.removeBt.childNodes[0];
          Utils.consolo.debug('New item created', this.item);
        }
      /**
       * 
       * @returns {@param;Item.constructor:item}
       */
      getItem()
        {
          return this.item;
        }
      /**
       * 
       * @returns {Item.item.classList}
       */
      getClassList()
        {
          return this.item.classList;
        }
      /**
       * 
       * @returns {unresolved}
       */
      getChildren()
        {
          return this.children;
        }

      getContent()
        {
          return this.textarea.value;
        }
      /**
       * 
       * @returns {Item.isEnabled.result}
       */
      isEnabled()
        {
          let ta = this.textarea;
          let attr_disabled = ta.getAttribute('disabled');
          let result = Utils.isEmpty(attr_disabled);
          return result;
        }
      /**
       * 
       * @returns {Item@call;getClassList@call;contains}
       */
      isCompleted()
        {
          return this.getClassList()
              .contains('item-completed');
        }
      /**
       * 
       * @param {type} content
       * @returns {Item}
       */
      setContent(content)
        {
          this.textarea.value = content;
          return this;
        }
      /**
       * 
       * @param {type} klass
       * @returns {Item}
       */
      toggleClass(klass)
        {
          this.getClassList()
              .toggle(klass);
          return this;
        }
      /**
       * 
       * @returns {Item}
       */
      toggleCompleted()
        {
          Utils.consolo.debug('item.js/toggleCompleted()/beginning/item', this.item );
          ListUtils.updateLastEnabled();
          this.toggleClass('item-completed');
          this.options.classList.toggle('option-completed');
          this.textarea.classList.toggle('completed');
          this.textarea.classList.remove('is-editing');
          this.doneBtSpan.innerHTML = Utils.swap(this.doneBtSpan.innerHTML, config.symbols.done, config.symbols.reopen);
          this.doneBtSpan.classList.toggle('reopen');
          Utils.consolo.debug('item.js/toggleCompleted()/ending/item', this.item );
          return this;
        }

    }