'use strict';

import { saveDefaultTodo, hasSavedData } from './commons.js';

window.addEventListener('DOMContentLoaded', function ()
{
  if (!hasSavedData())
  {
    saveDefaultTodo();
  }
});

let listDiv = document.querySelector('#list-div');
listDiv.addEventListener('mousemove', function (e)
{
      console.log('moving...','\n',  e.target.parentElement, '\n', e.currentTarget);
});
