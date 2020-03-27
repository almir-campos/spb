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

mainDiv.addEventListener('click', function (e)
{
  e.preventDefault();

  let clicked = e.target;
  bulkToggleClass('clicked', 'not-clicked');

  if (clicked.id === 'new-div')
  {
    addItem(listDiv);
  }


  if (['main-div', 'top-div', 'new-div'].includes(clicked.id))
  {
    disableTextareas();
    return;
  }

  if (clicked.classList.isEmpty())
  {
    disableTextareas();
    return;
  }

  let isItem = clicked.classList.contains('item');
  let isTextArea = clicked.classList.contains('text');

  let clickedParent = clicked.parentElement;
  let isDoneBt = clickedParent.classList.contains('done');
  let isRemoveBt = clickedParent.classList.contains('remove');

  let item = clicked.closest('.item');

  if (isTextArea)
  {
    let isEditing = item.querySelector('textarea').disabled;
    disableTextareas();
    if (isEditing)
    {
      clicked.toggleAttribute('disabled');
      clicked.classList.add('is-editing');
      clicked.focus();
    } else
    {
      clicked.classList.remove('is-editing');
    }
  } else if (isDoneBt)
  {
//    item.toggleAttribute('completed');
//    console.log( item.firstChild;
    item.classList.toggle('item-completed');
    item.firstChild.classList.toggle('completed');
    item.querySelector('.options').classList.toggle('option-completed');
//    console.log( 'done item:', item );
    disableTextareas();
//    saveList();

  } else if (isRemoveBt)
  {
    removeItem(item);
  } else if (isItem)
  {
    item.classList.replace('not-clicked', 'clicked');
  } else
  {
    console.log('No action');
  }
});

