  'use strict';
  import { IndexUtils } from '../index/index-utils.js';
  import { ListUtils } from '../item/list-utils.js';
  import { config } from '../cfg.js';
  import { Item } from '../item/item.js';

/**
 * The application's main listener. This script is the only one
 * that is called from the index.html file. All the others come
 * from this file.
 * 
 * It contains the main event listener, which start the actions
 * when the page is loaded.
 * 
 */
  window.addEventListener('DOMContentLoaded', function ()
    {
      /**
       * Gets the main DOM elements involved in the operations
       */
      let mainDiv = document.querySelector('#main-div');
      let listDiv = document.querySelector('#list-div');
      
      /**
       * Adds the listeners and an observer to check the events on the mainDiv and
       * listDiv.
       * 
       * TODO: check if the mainDiv listener could absorb all the functions
       *    in the listDiv listener.
       */
      IndexUtils.addListDivEventListener(listDiv);
      IndexUtils.addMainDivEventListener(mainDiv, listDiv);
      IndexUtils.addMutationObserver(listDiv);
      
      /**
       * 
       * Loads the saved list
       */
      let todo = ListUtils.loadList();
      
      /**
       * If there's no list saved, generates a new item and add it to the list
       */
      if (!ListUtils.hasSavedData(todo))
        {
          ListUtils.saveDefaultTodo();
        }
      else
        {
          IndexUtils.appendLoadedItems(todo.data, listDiv);
        }
    });


