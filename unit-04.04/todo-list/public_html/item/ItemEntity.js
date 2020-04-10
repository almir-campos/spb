'use strict';

import {config} from '../cfg.js';
import {Utils} from '../utils/utils.js';
// import {ListUtils} from '../item/ListUtils.js';

/**
 * Provides useful functions to manipulate or update an item.
 * Just create a new instance of the Class providing the item (DOM element)
 * to the constructor.
 */
class ItemEntity {
  static itemContextNames = ['item', 'textarea', 'options', 'done-bt', 'done-bt-html', 'remove-bt-html', 'remove-bt-html'];
  ;

  constructor(obj) {
    if (Utils.isEmpty(obj)) {
      Utils.consolo.debug(true, 'Item constructor received an empty object and created an empty item.');
      this.item = ListUtils.createItem();
    }
    else {
      this.item = item;
    }
    this.classes = this.item.classList;
    this.children = this.item.childNodes;
    this.textarea = this.children[0];
    this.options = this.children[1];
    this.doneBt = this.options.childNodes[0];
    this.doneBtIcon = this.doneBt.childNodes[0];
    this.removeBt = this.options.childNodes[1];
    this.removeBtIcon = this.removeBt.childNodes[0];
  }

  /**
   *
   * @returns This DOM element item
   */
  getItem() {
    return this.item;
  }

  extractItemFromObject(obj) {
    if ( Utils.getType(obj) === 'clicked')
    {

    }
  }

  /**
   *
   * @returns The classList object
   */
  getClassList() {
    return this.classes;
  }

  /**
   *
   * @returns All children of this item as a NodeList
   */
  getChildren() {
    return this.children;
  }

  /**
   *
   * @returns The current text (content) of this item
   */
  getText() {
    return this.textarea.value;
  }

  /**
   *
   * @returns true if the this textarea is being edited
   * and false otherwise.
   */
  isEditing() {
    let ta = this.textarea;
    let isEditing = ta.classList.contains('is-editing');
//          let result = !Utils.isEmpty(isEditing);
    return isEditing;
  }

  /**
   *
   * @returns true is this item is marked as completed
   * and false other wise.
   */
  isCompleted() {
    return this.getClassList()
        .contains('completed');
  }

  /**
   * Set the current item as completed.
   * It's particularly useful when the items are loaded from localStorage
   */
  setCompleted() {
    this.classes.add('completed');
    this.textarea.classList.add('completed');
    this.textarea.classList.remove('is-editing');
    this.doneBtIcon.innerHTML = config.symbols.reopen;
    this.doneBtIcon.classList.add('reopen');
  }

  /**
   *
   * @param content the content to fil the text area
   * @returns This class
   */
  setContent(content) {
    this.textarea.value = content;
    return this;
  }

  /**
   * Toggles a class in this item
   * @param  klass The class to be toggled
   * @returns This class
   */
  toggleClass(klass) {
    this.getClassList()
        .toggle(klass);
    return this;
  }

  removeHighlight() {
    this.classes.remove('clicked');
  }

  /**
   * Toggles the current item and some specific children from or to the
   * completed state
   *
   * @returns {Item}
   */
  toggleCompleted() {
    this.toggleClass('completed');
    this.textarea.classList.toggle('completed', true);
    this.textarea.classList.remove('is-editing');
    this.doneBtIcon.innerHTML = Utils
        .swap(
            this.doneBtIcon.innerHTML, config.symbols.done, config.symbols.reopen);
    this.doneBtIcon.classList.toggle('reopen', toogle);
    return this;
  }

  turnIsEditingOn() {
    this.classes.add('is-editing');
    this.textarea.removeAttribute('disabled');
  }

  turnIsEditingOff() {
    this.classes.remove('is-editing');
    this.textarea.setAttribute('disabled', true);
  }

  /**
   * When the item is clicked, this function decides what to do
   * based on the child that was clicked.
   *
   * @param {type} clicked
   * @returns {String}
   */
  onClick(clicked) {
    let clickedParent = clicked.parentElement;

    if (clicked.classList.contains('text')) {
      Utils.consolo.debug(true, '--\nClicked on textarea.\nContent:\n' + this.getText());
      console.log('this.getItem()', this.getItem());
      this.textareaOnClick();
    }

    if (clickedParent.classList.contains('done')
        || clickedParent.classList.contains('reopen')
        || clicked.classList.contains('done')) {
      Utils.consolo.debug(true, '--\nClicked on doneBt.\nContent:\n' + this.getText());
      this.doneBtOnClick();
    }

    if (clickedParent.classList.contains('remove')
        || clicked.classList.contains('remove')) {
      Utils.consolo.debug(true, '--\nClicked on removeBt.\nContent:\n' + this.getText());
      this.removeBtOnClick();
    }

    this.classes.add('clicked');
  }

  /**
   * Action for a click on the textarea\
   */
  textareaOnClick() {

    /*
     * Toggle the current state
     */
    this.textarea.toggleAttribute('disabled');

    /*
     * Removes the class 'is-editing' from the textarea
     */
    this.textarea.classList.toggle('is-editing', true);

    /*
     * If the state changes to 'enabled'
     */
    if (this.isEditing()) {
      /*
       * Update the previous enabled textarea
       */
      /*
       * Focus on the current textarea
       */
      this.textarea.focus();
      this.textarea.setAttribute('id', 'last_enabled');
    }
  }

  /**
   * Action for a click on the doneBt
   */
  doneBtOnClick() {
    this.toggleCompleted();
  }

  /**
   * Action for a click on the removeBt
   */
  removeBtOnClick() {
    this.getItem()
        .remove();
  }
}

export {ItemEntity as Item}
