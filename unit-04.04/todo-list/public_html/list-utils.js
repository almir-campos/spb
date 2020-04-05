  'use strict';

  import { Utils } from './utils.js';
  import { config } from './cfg.js';
  import { Item } from './item/item.js';

  export class ListUtils
    {
      /**
       * 
       */
      static saveDefaultTodo()
        {
          Utils.consolo.debug ( true, 'Saving default todo...');
          let listDiv = document.querySelector('#list-div');
          let newItem = ListUtils.addItem(listDiv);
        }

      /**
       * 
       * @returns {NodeList}
       */
      static allItems()
        {
          return document.querySelectorAll('.item');
        }

      /**
       * 
       * @returns {undefined}
       */
      static saveList()
        {
          Utils.consolo.debug ( true, 'Utils.js/saveList/beginning');
          let todo = {data: []};
          let items = ListUtils.allItems();
          items.forEach((item) =>
          {
            todo.data.push({"text": item.firstChild.value, "completed": item.classList.contains('completed')});
          });
          localStorage.setItem("todo", Utils.consolo.json(todo, true ));
          Utils.consolo.debug ( true, 'Utils.js/saveList/ending/saved');
          Utils.consolo.json(ListUtils.loadList());
        }

      /**
       * 
       * @returns {ListUtils.loadList.todo}
       */
      static loadList()
        {
          Utils.consolo.debug( true, 'list-utils.js/loadList' );
          let todo = JSON.parse(localStorage.getItem('todo'));
          return todo;
        }

      /**
       * 
       * @param {type} todo
       * @returns {Boolean}
       */
      static hasSavedData(todo)
        {
          let result = !Utils.isEmpty(todo);
          Utils.consolo.debug( true, 'list-utils/hasSavedData', result);
          Utils.consolo.json(todo);
          return result;
        }

      /**
       * 
       * @returns {Item}
       */
      static createItem()
        {
          /**
           * 
           */
          let item = document.createElement('div');
          item.classList.add('item');

          /**
           * 
           */
          let text = document.createElement('textarea');
          text.classList.add('text');
          text.toggleAttribute('disabled');

          /**
           * 
           */
          let options = document.createElement('div');
          options.classList.add('options');

          /**
           * 
           */
          let done = document.createElement('div');
          done.classList.add('option', 'done');
          let doneOptionContent = document.createElement('span');
          doneOptionContent.classList.add('option-content', 'disable-selection');
          doneOptionContent.innerHTML = config.symbols.done;

          /**
           * 
           */
          let remove = document.createElement('div');
          remove.classList.add('option', 'remove');
          let removeOptionContent = document.createElement('span');
          removeOptionContent.classList.add('option-content', 'disable-selection');
          removeOptionContent.innerHTML = config.symbols.remove;

          /**
           * 
           */
          done.appendChild(doneOptionContent);
          remove.appendChild(removeOptionContent);
          options.appendChild(done);
          options.appendChild(remove);
          item.append(text);
          item.appendChild(options);
          //
          return new Item(item);
        }

      /**
       * 
       * @param {type} container
       * @returns {undefined}
       */
      static addItem(container)
        {
          let item = ListUtils.createItem();
          container.appendChild(item.getItem());
          return item;
        }

      static removeItem(item)
        {
          item.remove();
        }

      /**
       * 
       * @param {type} container
       * @param {type} arrItems
       * @returns {undefined}
       */
      static addItems(arrItems, container)
        {
          Utils.consolo.debug ( true, 'addItems/arrItems', arrItems);
          if (Array.isArray(arrItems))
            {
              arrItems.forEach(item =>
              {
                container.appendChild(item.getItem());
              });
            }
        }

      /**
       * 
       * @param {type} clicked
       * @returns {undefined|Boolean}
       */
      static updateLastEnabled(clicked)
        {
          Utils.consolo.debug ( true, 'list-utils.js/updateLastEnabled/begining/clicked', clicked);

          /*
           * 
           */
          if (!Utils.isEmpty(clicked)
              && !Utils.isEmpty(clicked.id)
              && clicked.id === 'last_enabled')
            {
              return;
            }
          /**
           * 
           * @type Element
           */
          let lastEnabled = document.querySelector('#last_enabled');
          if (lastEnabled)
            {
              lastEnabled.removeAttribute('id');
              lastEnabled.setAttribute('disabled', true);
              lastEnabled.classList.remove('is-editing');
//              lastEnabled.closest('.item').classList.remove('clicked');
//              lastEnabled.classList.remove('clicked');
            }
          return !Utils.isEmpty(lastEnabled);
        }
        
        /**
         * 
         * @param {type} listDiv
         * @returns {undefined}
         */
        static removeClickedHighlight(listDiv)
        {
          let clicked = listDiv.querySelector('.clicked');
          if ( Utils.isEmpty(clicked))
          {
            return;
          }
          
          clicked.classList.remove('clicked');
        }
    }