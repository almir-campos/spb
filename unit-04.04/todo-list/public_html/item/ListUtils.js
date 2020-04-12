'use strict';

import {config} from '../cfg.js';
import {Item}   from '../item/ItemEntity.js';
import {Utils}  from '../utils/utils.js';

/**
 * Provides useful functions that require manipulation or changes
 * on the list of to-do items
 */
export class ListUtils {

  static listDiv = document.querySelector('#list-div');
  static listDivContextNames = ['list-div'].concat(Item.itemContextNames);
  static observer;
  static init() {
    ListUtils.observer = ListUtils.do.init();
  }
  // static lastActiveId = function (newActiveId) {
  //   if (!newActiveId) {
  //
  //   }
  //   ListUtils.listDiv.setAttribute('active-id', newActiveId);
  // };

  static get = {
    newItem: function () {
      /**
       * Creates the item's main container
       */
      let item = document.createElement('div');
      item.setAttribute('id', Utils.randomString(config.defaults.idLength));
      item.setAttribute('name', 'item');
      item.classList.add('item');

      /**
       * Creates the text area (when the to-do text is showed or edited)
       */
      let text = document.createElement('textarea');
      text.classList.add('text');
      text.setAttribute('name', 'textarea');
      text.setAttribute('changed', 'false');
      text.toggleAttribute('disabled');
      text.value = config.defaults.content;
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
      done.setAttribute('name', 'done-bt');
      done.classList.add('option', 'done');
      done.setAttribute('title', 'Click to complete/reopen this item');
      let doneOptionContent = document.createElement('span');
      doneOptionContent.classList.add('option-content', 'disable-selection');
      doneOptionContent.setAttribute('name', 'done-bt-html');
      doneOptionContent.innerHTML = config.symbols.done;

      /**
       * Creates the "button" to remove the current item from the list
       */
      let remove = document.createElement('div');
      remove.setAttribute('name', 'remove-bt');
      remove.classList.add('option', 'remove');
      remove.setAttribute('title', 'Click to remove this item');
      let removeOptionContent = document.createElement('span');
      removeOptionContent.classList.add('option-content', 'disable-selection');
      removeOptionContent.setAttribute('name', 'remove-bt-html');
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
    allItems: function () {
      return document.querySelectorAll('.item');
    },
    savedTodoList: function () {
      let todo = JSON.parse(localStorage.getItem('todo'));
      return todo;
    },
    lastActiveItem: function () {
      let lastId = ListUtils.get.lastActiveId();
      if (!lastId) {
        console.log('no active item');
        return undefined;
      }
      lastId = '#' + lastId;
      console.log('lastId', lastId);
      // const elem = document.querySelector( `${lastId}` );
      const elem = document.querySelector(lastId);
      return new Item(elem);
    },
    lastActiveId: function () {
      const id = ListUtils.listDiv.getAttribute('active-id');
      return id;
    }
  };
  static set = {
    lastActiveId: function (newActiveId) {
      ListUtils.listDiv.setAttribute('active-id', newActiveId);
    }
  };
  static has = {
    savedData: function (todo) {
      let result = !Utils.isEmpty(todo);
      return result;
    }
  };
  static do = {
    init: function () {
      const observer = this.addMutationObserver();
      this.loadsOrCreatesList();
      return observer;
    },
    loadsOrCreatesList: function () {
      let todo = ListUtils.get.savedTodoList();
      if (ListUtils.has.savedData(todo)) {
        ListUtils.do.appendLoadedItems(todo.data);
      }
      else {
        ListUtils.do.addItem();
      }
    },
    addItem: function () {
      let item = ListUtils.get.newItem();
      let itemObj = new Item(item);
      ListUtils.listDiv.append(item);
      // this.updateHighlight(itemObj);
      this.keepItemFocus();
      return item;
    },
    addItems: function (arrItems) {
      if (Array.isArray(arrItems)) {
        arrItems.forEach(item => {
          ListUtils.listDiv.appendChild(item);
        });
      }
    },
    appendLoadedItems: function (data) {
      let itemsToAppend = [];
      data
        .forEach(
          loadedItem => {
            let newItem = ListUtils.get.newItem();
            let newItemObj = new Item(newItem);

            newItemObj.textarea.value = loadedItem.text;
            if (loadedItem.completed) {
              newItem.setCompleted();
            }
            itemsToAppend.push(newItem);
          });
      ListUtils.do.addItems(itemsToAppend);
    },
    removeItem: function (item) {
      item.remove();
    },
    callback: (muts) => {
      ListUtils.do.saveList();
      console.log('savedTodoList', ListUtils.get.savedTodoList());
      // console.log('listUtils/do/addMutationObserver/afterSaveList/localStorage\n',
      // localStorage, '\n', mutationRecords);
      muts.forEach((m) => {
        console.log("MUTATION =>", m);
        if (m.target.name === 'textarea') {
          console.log('from', m.oldValue, 'to', m.target.attributes['changed'].value);
        }
      });
    },
    addMutationObserver: function () {
      return this.obs().startObserver(this.callback);
    },

    obs: function () {
      let observer;
      let fn = {
        startObserver: function (callback) {
          console.log('observer started');
          observer = new MutationObserver(callback);
          observer
            .observe(
              ListUtils.listDiv,
              {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: ['active-id', 'changed'],
                characterData: true,
                attributeOldValue: true,
                characterDataOldValue: true
              });
          return observer;
        },
        getObserver: function () {
          return observer;
        }
      };

      return fn;
    },
    saveList: function () {
      let todo = {data: []};
      let items = ListUtils.get.allItems();
      items
        .forEach((item) => {
          todo.data.push({
            "text": item.firstChild.value,
            "completed": item.classList.contains('completed')
          });
        });
      localStorage.setItem("todo", Utils.consolo.json(todo, true));
    },
    updateHighlight: function (itemObj) {

    },
    resetLastActive: function () {
      console.log('resetLastActive/ListUtils.get.lastActiveId()',
        ListUtils.get.lastActiveId());
      if (Utils.isEmpty(ListUtils.get.lastActiveId())) {
        // ListUtils.set.lastActiveId(newActiveId);
        return;
      }
      let lastActiveItem = ListUtils.get.lastActiveItem();
      lastActiveItem.turnActivatedOff();
      console.log('active item: ', lastActiveItem);
    },
    keepItemFocus: function () {
      const lastActive = ListUtils.get.lastActiveItem();
      if (!Utils.isEmpty(lastActive) && lastActive.editing()) {
        lastActive.focus();
      }
    }
  };

  static is = {
    listDivContext: function (name) {
      return ListUtils.listDivContextNames.includes(name);
    }
  };

  static clickedObject(clicked) {
    this.clicked = clicked;
    /**
     *
     */
    if (clicked.item.isItemContext()) {
      // console.log('ListUtils/clickedObject => is in the Item context');
      let clickedItem = new Item(clicked.getItemElement());
      // console.log('ListUtils/clickedObject/clickedItem.id', clickedItem.id);
      // console.log('ListUtils/clickedObject/ListUtils.get.lastActiveId()',
      // ListUtils.get.lastActiveId());
      /**
       *
       */
      if (['remove-bt', 'remove-bt-html'].includes(clicked.getName())) {
        this.do.removeItem(clicked.getItemElement());
      }
      if (clickedItem.id === ListUtils.get.lastActiveId()) {
        // clickedItem.editing('off');
        // const clickedName = clicked.getName();
        // if ( clickedName === 'textarea' ){
        //
        // } else if ( clickedName === 'done') {
        //
        // } else if ( clickedName === 'remove') {
        //
        // }
      } else {
        ListUtils.do.resetLastActive();
        ListUtils.set.lastActiveId(clickedItem.id);
      }
      let response = clickedItem.onClick(clicked.getName());
      console.log('response', response);
      if ( response === 'true') {
        ListUtils.do.saveList();
      }
      // const observer = ListUtils.do.obs().getObserver();
      console.log('observer', ListUtils.observer );
      const mutations = ListUtils.observer.takeRecords();
      console.log( 'mutations la no fim', mutations);
      /**
       *
       */
    } else {
      console.log('ListUtils/clickedObject => is not an Item');
      // Maybe I should do nothing. It's simpler.
      // ListUtils.do.resetLastActive();
      // Just keep the focus on the current textarea being edited, if any.
      ListUtils.do.keepItemFocus();
    }
  }
}


// static init() {
//   // ListUtils.addEventListener();
//   ListUtils.addMutationObserver();
//   ListUtils.loadsOrCreatesList();
// }

// static addEventListener() {
//   ListUtils.listDiv
//       .addEventListener(
//           'change',
//           function (e) {
//             let changed = e.target;
//             if (changed.classList.contains('text')) {
//               changed.toggleAttribute('disabled');
//               changed.classList.toggle('is-editing', true);
//             }
//           });
// }

//   static addMutationObserver() {
//     let saveOnMutation = function (mutationRecords) {
//       console.log('mutation records:', mutationRecords[0].addedNodes);
//       ListUtils.saveList();
//       console.log('localStorage', localStorage);
//     };
//
//     let observer = new MutationObserver(saveOnMutation);
//     observer
//         .observe(
//             listDiv,
//             {
//               childList: true
// //                    subtree: true,
// //                    attribute: true,
// //                    characterData: true,
// //                    attributeOldValue: true,
// //                    characterDataOldValue: true
//             });
//   }

/**
 * Loads the saved list or creates a new list
 */
// static loadsOrCreatesList() {
//   let todo = ListUtils.loadList();
//
//   if (ListUtils.hasSavedData(todo)) {
//     ListUtils.appendLoadedItems(todo.data);
//   }
//   else {
//     ListUtils.addItem();
//   }
// }

//   /**
//    * Creates an item based on the current defaults
//    * @returns Item (see ItemClass.js)
//    */
//   static getNewItem() {
//     /**
//      * Creates the item's main container
//      */
//     let item = document.createElement('div');
//     item.setAttribute('name', 'item');
//     item.classList.add('item');
//
//     /**
//      * Creates the text area (when the to-do text is showed or edited)
//      */
//     let text = document.createElement('textarea');
//     text.classList.add('text');
//     text.setAttribute('name', 'textarea');
//     text.toggleAttribute('disabled');
//     text.value = config.defaults.content;
// //          text.setAttribute('title', 'Click to turn edit on/off');
//
//     /**
//      * Creates the lateral container that will contain the action options
//      */
//     let options = document.createElement('div');
//     options.setAttribute('name', 'options');
//     options.classList.add('options');
//
//     /**
//      * Creates the "button" to mark the current item as completed (done)
//      */
//     let done = document.createElement('div');
//     done.setAttribute('name', 'done-bt');
//     done.classList.add('option', 'done');
// //          done.setAttribute('title', 'Click to complete/reopen this item');
//     let doneOptionContent = document.createElement('span');
//     doneOptionContent.classList.add('option-content', 'disable-selection');
//     doneOptionContent.setAttribute('name', 'done-bt-html');
//     doneOptionContent.innerHTML = config.symbols.done;
//
//     /**
//      * Creates the "button" to remove the current item from the list
//      */
//     let remove = document.createElement('div');
//     remove.setAttribute('name', 'remove-bt');
//     remove.classList.add('option', 'remove');
// //          remove.setAttribute('title', 'Click to remove this item');
//     let removeOptionContent = document.createElement('span');
//     removeOptionContent.classList.add('option-content', 'disable-selection');
//     removeOptionContent.setAttribute('name', 'remove-bt-html');
//     removeOptionContent.innerHTML = config.symbols.remove;
//
//     /**
//      * Integrates all the above elements in one item
//      */
//     done.appendChild(doneOptionContent);
//     remove.appendChild(removeOptionContent);
//     options.appendChild(done);
//     options.appendChild(remove);
//     item.append(text);
//     item.appendChild(options);
// //          return new Item(item);
//     return item;
//   }

// /**
//  * Creates an item and adds it to the DOM
//  */
// static addItem() {
//   let item = ListUtils.getNewItem();
//   let itemObj = new Item(item);
//   ListUtils.listDiv.append(item);
//   itemObj.textarea.removeAttribute('title');
//   return item;
// }

// /**
//  * Adds multiple arrays at once to the DOM
//  * It's useful on the page load
//  */
// static addItems(arrItems) {
//   if (Array.isArray(arrItems)) {
//     arrItems.forEach(item => {
//       ListUtils.listDiv.appendChild(item);
//     });
//   }
// }

// static appendLoadedItems(data) {
//   let itemsToAppend = [];
//   data
//       .forEach(
//           loadedItem => {
//             let newItem = ListUtils.getNewItem();
//             let newItemObj = new Item(newItem);
//
//             newItemObj.textarea.value = loadedItem.text;
//             if (loadedItem.completed) {
//               newItem.setCompleted();
//             }
//             itemsToAppend.push(newItem);
//           });
//   ListUtils.addItems(itemsToAppend);
// }

// /**
//  * Generates and save an item based on the default configurations
//  */
// static saveDefaultTodo() {
//   let listDiv = document.querySelector('#list-div');
//   let newItem = ListUtils.addItem(listDiv);
// }


// static isListDivContext(name) {
//   return ListUtils.listDivContextNames.includes(name);
// }
//
// static
// onClick(clicked)
// {
//
// }
//
// static
// outerClickEvent()
// {
//
// }

// /**
//  *
//  * @returns NodeList containing all to-do items
//  */
// static allItems() {
//   return document.querySelectorAll('.item');
// }

//   /**
//    *
//    * Saves the current list of items
//    */
//   static saveList() {
//     let todo = {data: []};
//     let items = ListUtils.allItems();
//     items
//         .forEach((item) => {
//           todo.data.push({
//             "text": item.firstChild.value,
//             "completed": item.classList.contains('completed')
//           });
//         });
//     localStorage.setItem("todo", Utils.consolo.json(todo, true));
// //        Utils.consolo.json( ListUtils.loadList() );
//   }

// /**
//  * Loads the saved list of to-do items
//  *
//  * @returns JSON Object with the saved items
//  */
// static loadedList() {
//   let todo = JSON.parse(localStorage.getItemElement('todo'));
//   return todo;
// }

// /**
//  * Checks if a list of todo items is empty
//  *
//  * @param todo Todo item list
//  * @returns true if the list is not empty; false if it is.
//  */
// static hasSavedData(todo) {
//   let result = !Utils.isEmpty(todo);
//   return result;
// }

// /**
//  * Removes an item from the list
//  *
//  * @param item Item to be removed
//  * @returns {undefined}
//  */
// static removeItem(item) {
//   item.remove();
// }

/**
 * When an element is clicked this function disables the
 * edit mode for the item that was being edited previously.
 *
 * @param {type} clicked
 * @returns {undefined|Boolean}
 */
// static
// updateLastEnabled(clicked)
// {
//
//   /*
//    * Check if the user is clicking on the element that currently is
//    * being edited.
//    */
// //        if ( !Utils.isEmpty( clicked )
// //             && !Utils.isEmpty( clicked.id )
// //             && clicked.id === 'last_enabled' )
// //          if (ListUtils.isItem(clicked))
// //            {
// //              let itemObj = new Item(clicked);
// //              if (itemObj.getClassList()
// //                .contains('is-editing'))
// //                {
// //                  return;
// //                }
// //            }
//   /**
//    * Removes the EditMode status from the item that was being
//    * edited before.
//    */
//   let lastEnabled = document.querySelector('#last_enabled');
//   if (lastEnabled) {
//     lastEnabled.removeAttribute('id');
//     lastEnabled.setAttribute('disabled', true);
//     lastEnabled.classList.remove('is-editing');
//   }
//   return !Utils.isEmpty(lastEnabled);
// }
//
// static
// turnCurreintIsEditingItemOff()
// {
//   let isEditing = document.querySelector('.is-editing');
//   if (Utils.isEmpty(isEditing)) {
//     return;
//   }
//   new Item(isEditing).turnIsEditingOff();
// }
//
// /**
//  * Removes the highlight (shadow) from the currently active item.
//  * It's useful especially when an other item was activated (clicked on)
//  *
//  * @param {type} clicked
//  * @returns {undefined}
//  */
// static
// removeClickedHighlight(clicked)
// {
//   if (!(clicked instanceof Clicked)) {
//     return;
//   }
//
//   let lastClickedItem = document.querySelector('.clicked');
//   if (clicked.item && clicked.getClickedElem() === lastClickedItem) {
//     return;
//   }
//   let obj = new Clicked(lastClickedItem);
//   if (obj.isItem()) {
//     obj.item()
//       .removeHighlight();
//   }
// //          if (Utils.isEmpty(clicked))
// //            {
// //              return;
// //            }
// //
// //          clicked.classList.remove('clicked');
// }
//
// //   /**
// //    *
// //    * @param {type} elem
// //    * @returns {Boolean}
// //    */
// // //      static isItem(elem)
// // //        {
// // //          return !Utils.isEmpty(elem.closest('.item'));
// // //        }
// // }
