  'use strict';
  import { Utils } from './utils.js';
  import { config } from './cfg.js';
  import { Item } from './item/item.js';
  
//let todo;

//  const commons =
//      {
//        loadTodo: function ()
//          {
////            let todo = localStorage.getItem('todo');
////            console.log('todo loaded', todo);
////            return JSON.parse(todo);
//          },
//        saveTodo: function (json)
//          {
//            console.log('Saving todo...');
//            localStorage.setItem('todo', JSON.stringify(json));
//          },
//        saveDefaultTodo: function ()
//          {
//            console.log('Saving default todo...');
//            commons.saveTodo(config.defaults);
//          },
//        hasSavedData: function (todo)
//          {
//            
//          },
//        isEmpty: function (obj)
//          {
//            let itIs = (obj === null)
//                || (typeof obj === 'undefined')
//                || (typeof obj.length !== 'undefined' && obj.length === 0)
//                || (typeof obj.size === 'undefine' && obj.size() === 0);
//            return itIs;
//          },
//        createItem: function ()
//          {
//            let item = document.createElement('div');
//            item.classList.add('item');
//            let text = document.createElement('textarea');
//            text.classList.add('text');
//            text.toggleAttribute('disabled');
//            let options = document.createElement('div');
//            options.classList.add('options');
//            let done = document.createElement('div');
//            done.classList.add('option', 'done');
//            let remove = document.createElement('div');
//            remove.classList.add('option', 'remove');
//            let doneOptionContent = document.createElement('span');
//            doneOptionContent.classList.add('option-content', 'disable-selection');
//            doneOptionContent.innerHTML = config.symbols.done;
//            let removeOptionContent = document.createElement('span');
//            removeOptionContent.classList.add('option-content', 'disable-selection');
//            removeOptionContent.innerHTML = config.symbols.remove;
//            //
//
//            done.appendChild(doneOptionContent);
//            remove.appendChild(removeOptionContent);
//            options.appendChild(done);
//            options.appendChild(remove);
//            item.append(text);
//            item.appendChild(options);
//            //
//            console.log( 'ready to add...');
//            return new Item(item);
//          },
//        addItems: function (container, arrItems)
//          {
////            console.log('addItems/arrItems', arrItems);
////            if (Array.isArray(arrItems))
////              {
////                arrItems.forEach(item =>
////                {
////                  container.appendChild(item);
////                });
////                commons.saveList();
////              }
//          },
////        addItem: function (container)
////          {
//////            let item = commons.createItem();
//////            container.appendChild(item.getItem());
//////            commons.saveList();
////          },
//        removeItem: function (elem)
//          {
//            elem.remove();
//            commons.saveList();
//          },
//        allItems: function ()
//          {
////            return document.querySelectorAll('.item');
//          },
//                        allTextareas: function ()
//          {
//            return document.querySelectorAll('textarea');
//          },
//        saveList: function ()
//          {
////            let todo = {data: []};
////            let items = commons.allItems();
////            items.forEach((item) =>
////            {
////              todo.data.push({"text": item.firstChild.value, "completed": item.classList.contains('item-completed')});
////            });
////            localStorage.setItem("todo", JSON.stringify(todo));
////            console.log('retrieved:', localStorage.getItem('todo'));
//          },
//        updateLastEnabled: function ( clicked )
//          {
////            if ( !commons.isEmpty(clicked) && !commons.isEmpty(clicked.id) && clicked.id === 'last_enabled')
////            {
////              return;
////            }
////            let lastEnabled = document.querySelector('#last_enabled');
////            if (lastEnabled)
////              {
////                lastEnabled.removeAttribute('id');
////                lastEnabled.setAttribute('disabled', true);
////                lastEnabled.classList.remove('is-editing');
////                lastEnabled.closest('.item').classList.remove('clicked');
////                console.log('last previous cleaned', lastEnabled);
////              }
////            return !commons.isEmpty(lastEnabled);
//          },
//        isEnabled: function (item)
//          {
////            let ta = item.querySelector('textarea');
////            let attr_disabled = ta.getAttribute('disabled');
////            let result = commons.isEmpty(attr_disabled);
////            console.log('ta', ta, 'attr_disabled', attr_disabled, 'result', result);
////            return result;
//              item.isEnabled();
//          },
//        toggleDoneBt: function (item)
//          {
//            let jItem = commons.jsonItem( item );
//            
//            let textArea = function() {
//              return jItem.text;
//            };
//            
//            let doneBt = function()
//            {
//              return jItem.options.content.done;
//            };
//            let doneBtContent = function( value ){
//              if ( !commons.isEmpty( value ) )
//              {
//                doneBt().button.innerHTML = value;
//                return;
//              }
//              return doneBt().content;
//            };
//            let symb = config.symbols;
//            console.log('===>>>doneBt', doneBt(), '\ntext', doneBtContent(), '\nsymb', symb.done, symb.reopen);
//            console.log('a', doneBtContent(), symb.done, doneBtContent === symb.done, ((doneBtContent() === symb.done) ? symb.reopen : symb.done));
//            doneBtContent( ((doneBtContent() === symb.done) ? symb.reopen : symb.done));
//            console.log( 'doneBt.content', doneBt().content );
//            doneBt().classes.toggle('reopen');
//            textArea().classes.toggle('completed');
//            
//            console.log('doneBt().classes', doneBt().classes );
//            console.log('***item', item )
//          },
//        jsonItem: function (item)
//          {
//            Utils.consolo.debug('commons.js/jsonItem/item', item.elem );
//            let children = item.childNodes;
//            console.log('children', children);
//            let json =
//                {
//                  item: item,
//                  classes: item.classList,
//                  text:
//                      {
//                        elem: children[0],
//                        classes: children[0].classList,
//                        content: children[0].value
//                      },
//                  options:
//                      {
//                        elem: children[1],
//                        classes: children[1].classLIst,
//                        content:
//                            {
//                              done:
//                                  {
//                                    elem: children[1].childNodes[0],
//                                    classes: children[1].childNodes[0].classList,
//                                    button: children[1].childNodes[0].childNodes[0],
//                                    content: children[1].childNodes[0].childNodes[0].innerHTML
//                                  },
//                              remove:
//                                  {
//                                    elem: children[1].childNodes[1],
//                                    classes: children[1].childNodes[1].classList,
//                                    button: children[1].childNodes[1].childNodes[0],
//                                    content: children[1].childNodes[1].childNodes[0].innerHTML
//                                  }
//                            }
//                      }
//                };
//            return json;
//          }
//      };
//export 
//    saveTodo,
//    loadTodo,
//    saveDefaultTodo,
//    hasSavedData,
//    addItem,
//    removeItem,
//    saveList,
//    isEmpty,
//    updateLastEnabled,
//    isEnabled
//    
//};
//  export