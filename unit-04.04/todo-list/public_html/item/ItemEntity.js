'use strict';

import {config} from '../cfg.js';
import {Utils}  from '../utils/utils.js';

/**
 * Provides useful functions to manipulate or update an item.
 * Just create a new instance of the Class providing the item (DOM element)
 * to the constructor.
 */
class ItemEntity {
  static itemContextNames = ['item', 'textarea', 'options', 'done-bt', 'done-bt-html', 'remove-bt-html', 'remove-bt-html'];

  constructor(clicked) {
    if (Utils.isEmpty(clicked)) {
      Utils.consolo.debug(true, 'Item constructor received an empty object.');
      throw 'Item constructor received an empty object.';
    } else if (clicked.getAttribute('name') !== 'item') {
      Utils.consolo.debug(true, 'Item constructor received a non-Item' +
        ' object.');
      throw 'Item constructor received a non-Item object.';
    }
    else {
      this.item = clicked;
    }
    this.id = this.item.id;
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

  /**
   *
   * @returns The current text (content) of this item
   */
  getText() {
    return this.textarea.value;
  }

  // /**
  //  *
  //  * @returns true if the this textarea is being edited
  //  * and false otherwise.
  //  */
  // isEditing() {
  //   let ta = this.textarea;
  //   let editing = ta.classList.contains('is-editing');
  //   return editing;
  // }

  isActive() {
    return this.classes.contains('clicked');
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
   * Toggles a class in this item
   * @param  klass The class to be toggled
   * @returns This class
   */
  toggleClass(klass) {
    this.getClasses()
      .toggle(klass);
  }

  focus(){
    this.textarea.focus();
  }

  /**
   * Toggles the current item and some specific children from or to the
   * completed state
   *
   * @returns {Item}
   */
  toggleCompleted() {
    this.toggleClass('completed');
    this.textarea.classList.toggle('completed');
    this.textarea.classList.remove('is-editing');
    this.doneBtIcon.innerHTML = Utils
      .swap(
        this.doneBtIcon.innerHTML, config.symbols.done, config.symbols.reopen);
    this.doneBtIcon.classList.toggle('reopen');
  }

  editing( state ) {
    if (!state) {
      let ta = this.textarea;
      let itIs = ta.classList.contains('is-editing');
      return itIs;
    }
    else if ( state === 'on' ) {
      this.textarea.classList.add('is-editing');
      this.textarea.removeAttribute('disabled');
    } else {
      this.textarea.classList.remove('is-editing');
      this.textarea.setAttribute('disabled', true);
    }
  }

  // turnIsEditingOn() {
  //   this.textarea.classList.add('is-editing');
  //   this.textarea.removeAttribute('disabled');
  // }
  //
  // turnIsEditingOff() {
  //   this.textarea.classList.remove('is-editing');
  //   this.textarea.setAttribute('disabled', true);
  // }
  //
  turnActivatedOff() {
    this.classes.remove('clicked');
    this.editing('off');
  }

  /**
   * When the item is clicked, this function decides what to do
   * based on the child that was clicked.
   */
  onClick(clickedElem) {

    if (!this.isActive()) {
      this.classes.add('clicked');
    }

    if (clickedElem === 'textarea') {
      Utils.consolo.debug(false, '--\nClicked on textarea. Content:' + this.getText());
      this.textareaOnClick();
      return;
    }

    if (['done-bt', 'done-bt-html'].includes(clickedElem)) {
      Utils.consolo.debug(false, '--\nClicked on doneBt. Content:' + this.getText());
      this.doneBtOnClick();
      return;
    }
    if (['remove-bt', 'remove-bt-html'].includes(clickedElem)) {
      Utils.consolo.debug(false, '--\nClicked on removeBt. Content:' + this.getText());
      this.removeBtOnClick();
    }

    // // if (clicked.classList.contains('text')) {
    // //   console.log('this.getItemElement()', this.getItemElement());
    // //   this.textareaOnClick();
    // // }
    //
    // if (clickedParent.classList.contains('done')
    //     || clickedParent.classList.contains('reopen')
    //     || clicked.classList.contains('done')) {
    //   this.doneBtOnClick();
    // }
    //
    // if (clickedParent.classList.contains('remove')
    //     || clicked.classList.contains('remove')) {
    //   Utils.consolo.debug(true, '--\nClicked on removeBt.\nContent:\n' +
    // this.getText()); this.removeBtOnClick(); }

  }

  /**
   * Action for a click on the textarea\
   */
  textareaOnClick() {

    this.textarea.toggleAttribute('disabled');
    this.textarea.classList.toggle('is-editing');

    /*
     * If the state changes to 'enabled'
     */
    if (this.editing()) {
      this.textarea.focus();
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












  extractItemFromObject(obj) {
    if (Utils.getType(obj) === 'clicked') {

    }
  }

  /**
   *
   * @returns The classList object
   */
  getClasses() {
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
   * @returns true is this item is marked as completed
   * and false other wise.
   */
  isCompleted() {
    return this.getClassList()
      .contains('completed');
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

  removeHighlight() {
    this.classes.remove('clicked');
  }

  turnIsEditingOn() {
    this.textarea.classList.add('is-editing');
    this.textarea.removeAttribute('disabled');
  }

  turnActivatedOn() {
    this.classes.add('clicked');
  }

}

export {ItemEntity as Item}
