  'use strict';

  import { config } from '../cfg.js';
  import { Utils } from '../utils.js';
//  import { ListUtils } from '../list-utils.js';

  export class Item
    {
      constructor(item)
        {
          this.item = item;
          this.classes = this.item.classList;
          this.children = this.item.childNodes;
          this.textarea = this.children[0];
          this.options = this.children[1];
          this.doneBt = this.options.childNodes[0];
          this.doneBtIcon = this.doneBt.childNodes[0];
          this.removeBt = this.options.childNodes[1];
          this.removeBtSpan = this.removeBt.childNodes[0];
          // Utils.consolo.debug(true, 'New item created', this.item);
        }

      /**
       * 
       * @returns DOM element item
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
          return this.classes;
        }

      /**
       * 
       * @returns {unresolved}
       */
      getChildren()
        {
          return this.children;
        }

      getText()
        {
          return this.textarea.value;
        }

      /**
       * 
       * @returns {Item.isEnabled.result}
       */
      isEditMode()
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
              .contains('completed');
        }

      /**
       * 
       * @returns {undefined}
       */
      setCompleted()
        {
          this.classes.add('completed');
          this.textarea.classList.add('completed');
          this.textarea.classList.remove('is-editing');
          this.doneBtIcon.innerHTML = config.symbols.reopen;
          this.doneBtIcon.classList.add('reopen');
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
          // Utils.consolo.debug(true, 'item.js/toggleCompleted()/beginning/item', this.item);
          this.toggleClass('completed');
//          this.options.classList.toggle('option-completed');
          this.textarea.classList.toggle('completed');
          this.textarea.classList.remove('is-editing');
          this.doneBtIcon.innerHTML = Utils.swap(this.doneBtIcon.innerHTML, config.symbols.done, config.symbols.reopen);
          this.doneBtIcon.classList.toggle('reopen');
          // Utils.consolo.debug(true, 'item.js/toggleCompleted()/ending/item', this.item);
          return this;
        }

      /**
       * 
       * @param {type} clicked
       * @returns {String}
       */
      onClick(clicked)
        {
          let clickedParent = clicked.parentElement;

          if (clicked.classList.contains('text'))
            {
              Utils.consolo.debug(true, '--\nClicked on textarea.\nContent:\n' + this.getText());
              this.textareaOnClick();
            }

          if (clickedParent.classList.contains('done')
              || clickedParent.classList.contains('reopen')
              || clicked.classList.contains('done'))
            {
              Utils.consolo.debug(true, '--\nClicked on doneBt.\nContent:\n' + this.getText());
              this.doneBtOnClick();
            }

          if (clickedParent.classList.contains('remove')
              || clicked.classList.contains('remove'))
            {
              Utils.consolo.debug(true, '--\nClicked on removeBt.\nContent:\n' +  this.getText());
              this.removeBtOnClick();
            }

          this.classes.add('clicked');
        }

      /**
       * 
       * @returns {undefined}
       */
      textareaOnClick()
        {
          // Utils.consolo.debug(true, 'mainDiv/click/textArea');

          /*
           * Toggle the current state
           */
          this.textarea.toggleAttribute('disabled');

          /*
           * Remove the class 'is-editing' from the textarea
           */
          this.textarea.classList.toggle('is-editing');

          /*
           * If the state changes to 'enabled'
           */
          if (this.isEditMode())
            {
              /*
               * Update the previous enabled textarea
               */
//              ListUtils.updateLastEnabled(clicked);
              /*
               * Focus on the current textarea
               */
              this.textarea.focus();
              this.textarea.setAttribute('id', 'last_enabled');
            }
        }

      /**
       * 
       * @param {type} clicked
       * @returns {undefined}
       */
      doneBtOnClick(clicked)
        {
          // Utils.consolo.debug(true, 'mainDiv/click/doneBt');
          this.toggleCompleted();
        }

      removeBtOnClick()
        {
          // Utils.consolo.debug(true, 'mainDiv/click/removeBt');
          this.getItem()
              .remove();
        }

    }