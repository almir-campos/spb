  'use strict';
  import {utils } from './utils.js';
  import { commons } from './commons.js';
  import { config } from './cfg.js';

  let mainDiv = document.querySelector('#main-div');
  let listDiv = document.querySelector('#list-div');


  window.addEventListener('DOMContentLoaded', function ()
    {

      let todo = commons.loadTodo();
      console.log('loadTodo/todo', todo);
      if (!commons.hasSavedData(todo))
        {
          commons.addItem(listDiv);
          commons.saveDefaultTodo();
        }
      else
        {
          let itemsToAppend = [];
          todo.data.forEach(loadedItem =>
          {
            console.log('loadedItem', loadedItem);
            let newItem = commons.createItem(true);
            // push({"text": item.firstChild.value, "completed": item.classList.contains('item-completed')});

            newItem.firstChild.value = loadedItem.text;
            if (loadedItem.completed)
              {
                newItem.classList.add('item-completed');
                newItem.querySelector('.text').classList.add('completed');
              }
            itemsToAppend.push(newItem);
            console.log('newItem', newItem);
          });
          console.log('itemsToAppend', itemsToAppend);
          commons.addItems(listDiv, itemsToAppend);
        }
    });

  listDiv.addEventListener('change', function (e)
    {
      let changed = e.target;
      console.log('what changed:', changed);
      if (changed.classList.contains('text'))
        {
          changed.toggleAttribute('disabled');
          changed.classList.toggle('is-editing');
          commons.saveList();
          console.log('changed:', changed);
        }
    });

  mainDiv.addEventListener('click', function (e)
    {
//      e.preventDefault();
//      e.stopPropagation();
console.clear();

      let clicked = e.target;
      let clickedParent = clicked.parentElement;
      
      console.log('addEventListener/click/clicked', clicked);
      if (clicked.id === 'new-div')
        {
          commons.addItem(listDiv);
        }

      let item = clicked.closest('.item');

      if (!item)
        {
          utils.consolo.debug('mainDiv/click/Not an item');
          commons.updateLastEnabled();
          return;
        }

      console.log('clicked item', item);
      let jItem = commons.jsonItem(item);
      console.log('jsonItem', jItem);
      console.log('');
//      item.classList.toggle('clicked');
      jItem.classes.toggle('clicked');
      console.log('jItem.classes', jItem.classes);

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
          utils.consolo.debug('mainDiv/click/isTextArea', isTextArea);
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
          if (commons.isEnabled(item))
            {
              /*
               * Update the previous enabled textarea
               */
              commons.updateLastEnabled( clicked );

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
          utils.consolo.debug('mainDiv/click/isDoneBt', isDoneBt);
//          console.clear();
          console.log('clicked', clicked);
          item.classList.toggle('item-completed');
          item.firstChild.classList.toggle('completed');
          item.querySelector('.options').classList.toggle('option-completed');
          item.firstChild.toggleAttribute('disabled');
//          commons.toggleDoneBt( clicked );
          // This line is needed in the case of the textarea is in editing mode
          item.querySelector('.text').classList.remove('is-editing');
          commons.toggleDoneBt(item);
          commons.saveList();

        }
      else if (isRemoveBt)
        {
          utils.consolo.debug('mainDiv/click/isRemoveBt', isRemoveBt);
          commons.removeItem(item);
        }
      else if (isItem)
        {
          utils.consolo.debug('mainDiv/click/isItem', isItem);
          item.classList.toggle('clicked');
        }
      else
        {
          utils.consolo.debug('mainDiv/click/No action');
        }
    });

