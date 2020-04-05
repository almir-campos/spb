  'use strict';

  import { Utils } from './utils.js';
  import { ListUtils } from './list-utils.js';
//  import { config } from './cfg.js';
  import { Item } from './item/item.js'


  export class IndexUtils
    {
      static appendLoadedItems(data, listDiv)
        {
          let itemsToAppend = [];
          console.log( 'data', data);
          data.forEach(loadedItem =>
          {
            console.log('loadedItem', loadedItem);
            let newItem = ListUtils.createItem(true);
            // push({"text": item.firstChild.value, "completed": item.classList.contains('item-completed')});

            newItem.textarea.value = loadedItem.text;
            if (loadedItem.completed)
              {
                newItem.getClassList()
                    .add('item-completed');
                newItem.textarea.classList.add('completed');
              }
            itemsToAppend.push(newItem);
            console.log('newItem', newItem);
          });
          console.log('itemsToAppend', itemsToAppend);
          ListUtils.addItems(itemsToAppend, listDiv);
        }
      static addListDivEventListener(listDiv)
        {
          listDiv.addEventListener('change', function (e)
            {
              let changed = e.target;
              console.log('what changed:', changed);
              if (changed.classList.contains('text'))
                {
                  changed.toggleAttribute('disabled');
                  changed.classList.toggle('is-editing');
//          commons.saveList();
                  console.log('changed:', changed);
                }
//        ListUtils.saveList();
            });
        }

      static addMutationObserver(listDiv)
        {
          let saveOnMutation = function (mutationRecords)
            {
//          console.log(mutationRecords);
              Utils.consolo.debug('saveOnMutation', mutationRecords);
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

      static addMainDivEventListener(mainDiv, listDiv)
        {
          mainDiv.addEventListener('click', function (e)
            {
//      e.preventDefault();
//      e.stopPropagation();
              console.clear();
              let clicked = e.target;
              let clickedParent = clicked.parentElement;
              console.log('addEventListener/click/clicked', clicked);
              if (clicked.id === 'add-div')
                {
                  ListUtils.addItem(listDiv);
                }

              let item = clicked.closest('.item');
              if (!item)
                {
                  Utils.consolo.debug('mainDiv/click/Not an item');
                  ListUtils.updateLastEnabled();
                  return;
                }

              let itemObj = new Item(item);
//      let itemObj = ListUtils.items.get(item.dataset.id);
              console.log('clicked item', item);
//      let jItem = commons.jsonItem(item);
//      console.log('jsonItem', jItem);
//      console.log('');
////      item.classList.toggle('clicked');
//      jItem.classes.toggle('clicked');
//      console.log('jItem.classes', jItem.classes);

              /*
               *  Detect clicked element type
               */
              let isItem = clicked.classList.contains('item');
              let isTextArea = clicked.classList.contains('text');
              let isDoneBt = clickedParent.classList.contains('done')
                  || clickedParent.classList.contains('reopen')
                  || clicked.classList.contains('done');
              let isRemoveBt = clickedParent.classList.contains('remove')
                  || clicked.classList.contains('remove');
              /*
               * Take actions dependending on the clicked element
               */
              if (isTextArea)
                {
                  Utils.consolo.debug('mainDiv/click/isTextArea', isTextArea);
                  /*
                   * Toggle the current state
                   */
                  clicked.toggleAttribute('disabled');
                  /*
                   * Remove the class 'is-editing' from the textarea
                   */
                  clicked.classList.toggle('is-editing');
                  /*
                   * If the state changes to 'enabled'
                   */
//          if (item.isEnabled())

                  if (itemObj.isEnabled())
                    {
                      /*
                       * Update the previous enabled textarea
                       */
                      ListUtils.updateLastEnabled(clicked);
                      /*
                       * Focus on the current textarea
                       */
                      clicked.focus();
                      clicked.setAttribute('id', 'last_enabled');
                    }
                  console.log('index.js/click/textarea/clicked', clicked);
                }
              else if (isDoneBt)
                {
//          Utils.consolo.debug('mainDiv/click/isDoneBt', isDoneBt);
////          console.clear();
//          console.log('clicked', clicked);
//          item.classList.toggle('item-completed');
//          item.firstChild.classList.toggle('completed');
//          item.querySelector('.options').classList.toggle('option-completed');
//          item.firstChild.toggleAttribute('disabled');
////          commons.toggleDoneBt( clicked );
//          // This line is needed in the case of the textarea is in editing mode
//          item.querySelector('.text').classList.remove('is-editing');
                  itemObj.toggleCompleted();
//          ListUtils.saveList();

                }
              else if (isRemoveBt)
                {
                  Utils.consolo.debug('mainDiv/click/isRemoveBt', isRemoveBt);
                  ListUtils.removeItem(item);
                }
              else if (isItem)
                {
                  Utils.consolo.debug('mainDiv/click/isItem', isItem);
                  item.classList.toggle('clicked');
                }
              else
                {
                  Utils.consolo.debug('mainDiv/click/No action');
                }
            });
        }

    }

