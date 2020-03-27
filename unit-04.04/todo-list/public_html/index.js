'use strict';

import { saveDefaultTodo, hasSavedData, addItem, removeItem, bulkToggleClass, disableTextareas } from './commons.js';

let mainDiv = document.querySelector('#main-div');
let listDiv = document.querySelector('#list-div');

addItem(listDiv);

window.addEventListener('DOMContentLoaded', function ()
  {
    if (!hasSavedData())
      {
        saveDefaultTodo();
      }
  });

//let newDiv = document.querySelector('#new-div');
//newDiv.addEventListener('click', function ()
//  {
//    disableTextareas();
//     bulkToggleClass('clicked', 'not-clicked');
//    addItem(listDiv);
//  });

mainDiv.addEventListener('click', function (e)
  {
//    e.preventDefault();
     
    let clicked = e.target;
    console.log('cricked', clicked, 'clickedParent', clicked.parentElement);
     bulkToggleClass('clicked', 'not-clicked');
     
     if ( clicked.id === 'new-div')
     {
       addItem(listDiv);
     }
    
    
     if ( ['main-div','top-div', 'new-div'].includes( clicked.id))
     {
       disableTextareas();
       return;
     }


    if (clicked.classList.isEmpty())
      {
        disableTextareas();
//     bulkToggleClass('clicked', 'not-clicked');

        console.log('classList is empty');
        return;
      }

    let isItem = clicked.classList.contains('item');
    let isTextArea = clicked.classList.contains('text');

    let clickedParent = clicked.parentElement;
    let isDoneBt = clickedParent.classList.contains('done');
    let isRemoveBt = clickedParent.classList.contains('remove');

    let item = clicked.closest('.item');
//    let isActive = item.classList.contains('clicked');
//    let isEditing = item.querySelector('textarea').disabled;

//    console.log('isEditing:', isEditing);

//    bulkToggleClass('clicked', 'not-clicked');
    
    
    console.log('Clicked on ', clickedParent, 'which parent of', clicked);

//    let elem;
//    if ( isItem || isTextArea )
//    {
//      elem = clicked;
//    } else if ( isDoneBt || isRemoveBt )
//    {
//      
//    }
//    

    if (isTextArea)
      {
        console.log('isTextArea');
//        console.log( 'yyy', clicked, document.activeElement);
        let isEditing = item.querySelector('textarea').disabled;
        console.log("isEditing", isEditing );
        disableTextareas();
        if (isEditing)
          {
        clicked.toggleAttribute('disabled');
        clicked.classList.add('is-editing');
            clicked.focus();
          }
        else
          {
        clicked.classList.remove('is-editing');
            console.log('is not Editing');
          }
      }
    else if (isDoneBt)
      {
        disableTextareas();
        console.log('isDoneBt');
        console.log('Item Done!');
      }
    else if (isRemoveBt)
      {
        console.log('isRemoveBt');
        removeItem(item);
        console.log('Item has been removed.');
      }
    else if (isItem)
      {
        item.classList.replace('not-clicked', 'clicked');
        console.log('isItemBt');
        console.log('Edit item');
      }
    else
      {
        console.log('No action');
      }
  });

