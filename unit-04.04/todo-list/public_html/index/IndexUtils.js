'use strict';

// import {Item} from '../item/ItemEntity.js';
import {Clicked}   from '../index/ClickedEntity.js';
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

  static tests() {
    // let item = ListUtils.get.newItem();
    // let clicked = new Clicked( item );
    // console.log( 1, 'clicked', clicked );
    // console.log( 2, 'clicked/isItemContext', clicked.item.isItemContext() );
    // let a;
    // const obs = function (varName, callback) {
    //   const values = {
    //     oldValue: undefined,
    //     newValue: window['a']
    //   };
    //   return {
    //     set: function (value) {
    //       if (value !== values.newValue) {
    //         values.oldValue = values.newValue;
    //         values.newValue = value;
    //         callback( varName, values );
    //       }
    //     },
    //     get: function () {
    //       return values.newValue;
    //     }
    //   }
    // };
    //
    // let observer = function (varName, values ) {
    //   console.log(varName, 'hasChanged from', values.oldValue, 'to', values.newValue);
    // };
    //
    // let last = obs('last', observer );
    // console.log( last.get() );
    // last.set('abc');
    // last.set('def');
    // //
    // let next = obs('last', observer );
    // console.log( next.get() )
    // next.set(1);
    // next.set(2);

    const obs = new MutationObserver( function (mut){
      // console.log( 'mutation', mut );
      let total = 0;
      let i = 0;
      mut.forEach( (m) => {
        console.log(++i, m.type, m.oldValue, m.target.attributes['active-id']);
        total += Number(m.target.attributes['active-id'].value);
      });
      console.log('total', total);
      // console.log( 'mutation type', mut[0].type );
      // console.log( 'mutation target', mut[0].target );
      // console.log( 'mutation oldValue', mut[0].oldValue );
      // console.log( 'mutation newValue', mut[0].target.getAttribute('active-id'));
    });

    let elem = document.querySelector('#list-div');
    obs.observe( elem , {attributes: true, attributeOldValue: true, attributeFilter: ['active-id'] });
    elem.setAttribute('active-id', '1');
    elem.setAttribute('active-id', 2);
    // setTimeout( function () {elem.setAttribute('active-id', '2');}, 500);



  }


  /**
   *
   */
  static addMainDivEventListener() {
    IndexUtils.mainDiv
      .addEventListener(
        'click',
        function (e) {

          e.preventDefault();
          e.stopPropagation();

          /**
           * Creates a new instance of the ClickedObject to make use
           * of its functionalities.
           */
          let clicked = new Clicked(e.target);

          // /**
          //  * If the clicked element is on the list-div context,
          //  * let the ListUtils treat it.
          //  */
          // if ( ListUtils.isListDivContext( clicked.getName() ))
          // {
          //   ListUtils.onClick( clicked );
          //   return;
          // }

          // ListUtils.removeClickedHighlight(clicked);
//                    ListUtils.updateLastEnabled(clicked);

          /**
           *
           */
          if (clicked.getName() === 'add-div') {
            Utils.consolo.debug(true, '--\nClicked on add-div');
            ListUtils.do.addItem();
            return;
          }

          ListUtils.clickedObject(clicked);

          //
          // THIS FUNCTION SHOULD END RIGHT HERE
          //


//           /**
//            *
//            * @type type
//            */
// //                    let item = clicked.closest('.item');
//           if (!clicked.isItem()) {
//             ListUtils.turnCurreintIsEditingItemOff();
//             return;
//           }
//
//           /**
//            *
//            */
//
//           /**
//            * The class <b>ItemClass.js<b> provides useful functions for a
//            * todo-item
//            *
//            * @type Item
//            */
//           // let clickedItemObj = new Item(clicked);
//           if (clicked.name() === 'textarea') {
//             if (clicked.isEditing()) {
//               clicked.turnIsEditingOff();
//             }
//             else {
//               ListUtils.turnCurreintIsEditingItemOff();
//               clicked.turnIsEditingOn();
//             }
//           }
//           else {
//             ListUtils.turnCurreintIsEditingItemOff();
//           }
//
//
// //                    let editingElem =
// document.querySelector('.is-editing'); //                    if (
// !Utils.isEmpty( editingElem )) //                    { //
// let editingItemObj = new Item( editingElem ); //
// editingItemObj. //                  }   clicked.onClick(clicked);
        }
      );
  }

}

