  'use strict';
  import { IndexUtils } from './index-utils.js';
  import { ListUtils } from './list-utils.js';
  import { config } from './cfg.js';
  import { Item } from './item/item.js';

  window.addEventListener('DOMContentLoaded', function ()
    {
      //
      let mainDiv = document.querySelector('#main-div');
      let listDiv = document.querySelector('#list-div');
      //
      IndexUtils.addListDivEventListener(listDiv);
      IndexUtils.addMainDivEventListener(mainDiv, listDiv);
      IndexUtils.addMutationObserver(listDiv);
      //
      let todo = ListUtils.loadList();
      if (!ListUtils.hasSavedData(todo))
        {
          ListUtils.saveDefaultTodo();
        }
      else
        {
          IndexUtils.appendLoadedItems(todo.data, listDiv);
        }

    });


