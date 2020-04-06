  'use strict';

  import { Utils } from '../utils/utils.js';
  import { ListUtils } from '../item/list-utils.js';
  import { Item } from '../item/item.js'
  
  /**
   * 
   * @type type
   */
  export class IndexUtils
    {
      /**
       * 
       * @param {type} data
       * @param {type} listDiv
       * @returns {undefined}
       */
      static appendLoadedItems(data, listDiv)
        {
          let itemsToAppend = [];
          data.forEach(loadedItem =>
          {
            let newItem = ListUtils.createItem();

            newItem.textarea.value = loadedItem.text;
            if (loadedItem.completed)
              {
                newItem.setCompleted();
              }
            itemsToAppend.push(newItem);
          });
          ListUtils.addItems(itemsToAppend, listDiv);
        }
        
        /**
         * 
         * @param {type} listDiv
         * @returns {undefined}
         */
      static addListDivEventListener(listDiv)
        {
          listDiv.addEventListener('change', function (e)
            {
              let changed = e.target;
              if (changed.classList.contains('text'))
                {
                  changed.toggleAttribute('disabled');
                  changed.classList.toggle('is-editing');
                }
            });
        }

      /**
       * 
       * @param {type} listDiv
       * @returns {undefined}
       */
      static addMutationObserver(listDiv)
        {
          let saveOnMutation = function (mutationRecords)
            {
              ListUtils.saveList();
            };
          let observer = new MutationObserver(saveOnMutation);
          observer.observe(listDiv,
              {
                childList: true,
                subtree: true,
                attribute: true,
                characterData: true,
                attributeOldValue: true,
                characterDataOldValue: true
              });
        }

      /**
       * 
       * @param {type} mainDiv
       * @param {type} listDiv
       * @returns {undefined}
       */
      static addMainDivEventListener(mainDiv, listDiv)
        {
          mainDiv.addEventListener('click', function (e)
            {
              /**
               * These two statements won't make any difference
               * in this context.
               * 
               *  e.preventDefault();
               *  e.stopPropagation();
               */

              /**
               * 
               * @type type
               */
              let clicked = e.target;
              
              ListUtils.removeClickedHighlight(listDiv);
              ListUtils.updateLastEnabled();

              /**
               * 
               */
              if (clicked.id === 'add-div')
                {
                  Utils.consolo.debug(true, '--\nClicked on add-div');
                  ListUtils.addItem(listDiv);
                  return;
                }

              /**
               * 
               * @type type
               */
              let item = clicked.closest('.item');
              if (!item)
                {
                  return;
                }
                
                /**
                 * 
                 */

              /**
               * The class <b>Item.js<b> provides useful functions for a todo-item
               * 
               * @type Item
               */
              let itemObj = new Item(item);
              itemObj.onClick( clicked );
            }
          );
        }

    }

