'use strict';

// import {Item} from '../item/ItemEntity.js';
import {Clicked} from '../index/ClickedEntity.js';
import {ListUtils} from '../item/ListUtils.js';
import {Utils}     from '../utils/utils.js';

export class IndexUtils {

  /**
   * Gets the main DOM elements involved in the operations
   */
  static mainDiv = document.querySelector('#main-div');

  static init() {
    IndexUtils.addMainDivEventListener();
    ListUtils.init();
  }

  /**
   *
   */
  static addMainDivEventListener() {
    IndexUtils.mainDiv
        .addEventListener(
            'click',
            function (e) {
              /**
               * These two statements won't make any difference
               * in this context.
               *
               */

              e.preventDefault();
              e.stopPropagation();

              let clickedType = Utils.getType(e.target);

              if ( ListUtils.isListDivContext( e.target.name ))
              {
                ListUtils.treatClicked();
              }

              /**
               * Creates a new instance of the ClickedObject to make use
               * of its functionalities.
               */
              let clicked = new Clicked(e.target);


              ListUtils.removeClickedHighlight(clicked);
//                    ListUtils.updateLastEnabled(clicked);

              /**
               *
               */
              if (clicked.getName() === 'add-div') {
                Utils.consolo.debug(true, '--\nClicked on add-div');
                ListUtils.addItem(listDiv);
                return;
              }

              /**
               *
               * @type type
               */
//                    let item = clicked.closest('.item');
              if (!clicked.isItem()) {
                ListUtils.turnCurreintIsEditingItemOff();
                return;
              }

              /**
               *
               */

              /**
               * The class <b>ItemClass.js<b> provides useful functions for a
               * todo-item
               *
               * @type Item
               */
              // let clickedItemObj = new Item(clicked);
              if (clicked.name() === 'textarea') {
                if (clicked.isEditing()) {
                  clicked.turnIsEditingOff();
                }
                else {
                  ListUtils.turnCurreintIsEditingItemOff();
                  clicked.turnIsEditingOn();
                }
              }
              else {
                ListUtils.turnCurreintIsEditingItemOff();
              }


//                    let editingElem = document.querySelector('.is-editing');
//                    if ( !Utils.isEmpty( editingElem ))
//                    {
//                    let editingItemObj = new Item( editingElem );
//                    editingItemObj.
//                  }


              clicked.onClick(clicked);
            }
        );
  }

}
