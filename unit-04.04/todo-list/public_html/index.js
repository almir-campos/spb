  'use strict';
//  import { Utils } from './utils.js';
  import { IndexUtils } from './index-utils.js';
  import { ListUtils } from './list-utils.js';
//  import { commons } from './commons.js';
  import { config } from './cfg.js';
  import { Item } from './item/item.js';


  //console.clear();
  //localStorage.clear();

  window.addEventListener('DOMContentLoaded', function ()
    {
      let mainDiv = document.querySelector('#main-div');
      let listDiv = document.querySelector('#list-div');
      //
      IndexUtils.addListDivEventListener(listDiv);
      IndexUtils.addMainDivEventListener(mainDiv, listDiv);
      IndexUtils.addMutationObserver(listDiv);
      //
      let todo = ListUtils.loadList();
      console.log('loadTodo/todo', todo);
      if (!ListUtils.hasSavedData(todo))
        {
          ListUtils.saveDefaultTodo();
        }
      else
        {
          IndexUtils.appendLoadedItems(todo.data, listDiv);
        }

    });


