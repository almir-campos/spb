'use strict';

import {config}  from '../cfg.js';
import {Item}    from '../item/ItemEntity.js';
import {Clicked} from '../index/ClickedEntity.js';
import {Utils}   from '../utils/utils.js';

/**
 * Provides useful functions that require manipulation or changes
 * on the list of to-do items
 */
export class ListUtils {


  static init(listDiv) {
    ListUtils.loadsOrCreatesList(listDiv );
  }

  /**
   * Loads the saved list or creates a new list
   */
  static loadsOrCreatesList(listDiv)
  {
    let todo = ListUtils.loadList();

    if (ListUtils.hasSavedData(todo)) {
      ListUtils.appendLoadedItems(todo.data, listDiv);
    }
    else {
      ListUtils.saveDefaultTodo();
    }
  }

  /**
   *
   * @param {type} data
   * @param {type} listDiv
   * @returns {undefined}
   */
  static appendLoadedItems(data, listDiv) {
    let itemsToAppend = [];
    data
        .forEach(
            loadedItem => {
              let newItem = ListUtils.createItem();
              let newItemObj = new Item(newItem);

              newItemObj.textarea.value = loadedItem.text;
              if (loadedItem.completed) {
                newItem.setCompleted();
              }
              itemsToAppend.push(newItem);
            });
    ListUtils.addItems(itemsToAppend, listDiv);
  }

  /**
   * Generates and save an item based on the default configurations
   */
  static saveDefaultTodo() {
    let listDiv = document.querySelector('#list-div');
    let newItem = ListUtils.addItem(listDiv);
    console.log(10, newItem);
  }

  /**
   *
   * @returns NodeList containing all to-do items
   */
  static allItems() {
    return document.querySelectorAll('.item');
  }

  /**
   *
   * Saves the current list of items
   */
  static saveList() {
    let todo = {data: []};
    let items = ListUtils.allItems();
    items
        .forEach((item) => {
          todo.data.push({
            "text": item.firstChild.value,
            "completed": item.classList.contains('completed')
          });
        });
    localStorage.setItem("todo", Utils.consolo.json(todo, true));
//        Utils.consolo.json( ListUtils.loadList() );
  }

  /**
   * Loads the saved list of to-do items
   *
   * @returns JSON Object with the saved items
   */
  static loadList() {
    let todo = JSON.parse(localStorage.getItem('todo'));
    return todo;
  }

  /**
   * Checks if a list of todo items is empty
   *
   * @param todo Todo item list
   * @returns true if the list is not empty; false if it is.
   */
  static hasSavedData(todo) {
    let result = !Utils.isEmpty(todo);
//        Utils.consolo.json( todo );
    return result;
  }

  /**
   * Creates an item based on the current defaults
   * @returns Item (see ItemClass.js)
   */
  static createItem() {
    /**
     * Creates the item's main container
     */
    let item = document.createElement('div');
    item.setAttribute('name', 'item');
    item.classList.add('item');

    /**
     * Creates the text area (when the to-do text is showed or edited)
     */
    let text = document.createElement('textarea');
    text.classList.add('text');
    text.setAttribute('name', 'textarea');
    text.toggleAttribute('disabled');
    text.value = config.defaults.content;
//          text.setAttribute('title', 'Click to turn edit on/off');

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
//          done.setAttribute('title', 'Click to complete/reopen this item');
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
//          remove.setAttribute('title', 'Click to remove this item');
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
//          return new Item(item);
    return item;
  }

  /**
   * Creates an item and adds it to the DOM
   *
   * @param container - The DOM element where the list is stored
   * @returns The created item
   */
  static addItem(container) {
    let item = ListUtils.createItem();
    console.log(1, item);
    let itemObj = new Item(item);
    console.log(2, itemObj.textarea);
    container.append(item);
    console.log(3, itemObj.textarea.title);
    itemObj.textarea.removeAttribute('title');

    return item;
  }

  /**
   * Removes an item from the list
   *
   * @param item Item to be removed
   * @returns {undefined}
   */
  static removeItem(item) {
    item.remove();
  }

  /**
   * Adds multiple arrays at once to the DOM
   * It's useful on the page load
   *
   * @param arrItems
   * @param container DOM element where the items will be added to
   */
  static addItems(arrItems, container) {
    if (Array.isArray(arrItems)) {
      arrItems.forEach(item => {
        container.appendChild(item);
      });
    }
  }

  /**
   * When an element is clicked this function disables the
   * edit mode for the item that was being edited previously.
   *
   * @param {type} clicked
   * @returns {undefined|Boolean}
   */
  static updateLastEnabled(clicked) {

    /*
     * Check if the user is clicking on the element that currently is
     * being edited.
     */
//        if ( !Utils.isEmpty( clicked )
//             && !Utils.isEmpty( clicked.id )
//             && clicked.id === 'last_enabled' )
//          if (ListUtils.isItem(clicked))
//            {
//              let itemObj = new Item(clicked);
//              if (itemObj.getClassList()
//                .contains('is-editing'))
//                {
//                  return;
//                }
//            }
    /**
     * Removes the EditMode status from the item that was being
     * edited before.
     */
    let lastEnabled = document.querySelector('#last_enabled');
    if (lastEnabled) {
      lastEnabled.removeAttribute('id');
      lastEnabled.setAttribute('disabled', true);
      lastEnabled.classList.remove('is-editing');
    }
    return !Utils.isEmpty(lastEnabled);
  }

  static turnCurreintIsEditingItemOff() {
    let isEditing = document.querySelector('.is-editing');
    if (Utils.isEmpty(isEditing)) {
      return;
    }
    new Item(isEditing).turnIsEditingOff();
  }

  /**
   * Removes the highlight (shadow) from the currently active item.
   * It's useful especially when an other item was activated (clicked on)
   *
   * @param {type} clicked
   * @returns {undefined}
   */
  static removeClickedHighlight(clicked) {
    if (!(clicked instanceof Clicked)) {
      return;
    }

    let lastClickedItem = document.querySelector('.clicked');
    if (clicked.item && clicked.getObject() === lastClickedItem) {
      return;
    }
    let obj = new Clicked(lastClickedItem);
    if (obj.isItem()) {
      obj.item()
          .removeHighlight();
    }
//          if (Utils.isEmpty(clicked))
//            {
//              return;
//            }
//
//          clicked.classList.remove('clicked');
  }

  /**
   *
   * @param {type} elem
   * @returns {Boolean}
   */
//      static isItem(elem)
//        {
//          return !Utils.isEmpty(elem.closest('.item'));
//        }
}
