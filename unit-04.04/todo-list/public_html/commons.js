'use strict';

//import { config } from './config.js';

let todo;

let saveTodo = function (json)
{
  console.log('Saving todo...');
  localStorage.setItem('todo', JSON.stringify(json));
};

let saveDefaultTodo = function ()
{
  console.log('Saving default todo...');
  saveTodo(config.defaults);
};

let hasSavedData = function ()
{
  return todo !== null && todo !== undefined;
};

let isEmpty = function( obj )
{
  let itIs = (obj === null)
          || (typeof obj === 'undefined')
          || (typeof obj.length !== 'undefined' && obj.length === 0)
          || (typeof obj.size === 'undefine' && obj.size() === 0);
};

let addItem = function (elem)
{

  let item = document.createElement('div');
  item.classList.add('item');

  let text = document.createElement('textarea');
  text.classList.add('text');
  text.toggleAttribute('disabled');

  let options = document.createElement('div');
  options.classList.add('options');

  let done = document.createElement('div');
  done.classList.add('option', 'done');

  let remove = document.createElement('div');
  remove.classList.add('option', 'remove');

  let doneOptionContent = document.createElement('span');
  doneOptionContent.classList.add('option-content', 'disable-selection');
  doneOptionContent.innerHTML = config.symbols.done;

  let removeOptionContent = document.createElement('span');
  removeOptionContent.classList.add('option-content', 'disable-selection');
  removeOptionContent.innerHTML = config.symbols.remove;

  //

  done.appendChild(doneOptionContent);
  remove.appendChild(removeOptionContent);
  options.appendChild(done);
  options.appendChild(remove);
  item.append(text);
  item.appendChild(options);

  //

  elem.appendChild(item);
  saveList();

};

let removeItem = function (elem)
{
  elem.remove();
  saveList();
};

let allItems = function ()
{
  return document.querySelectorAll('.item');
};

let allTextareas = function ()
{
  return document.querySelectorAll('textarea');
};

let saveList = function ()
{
  let todo = {data:[]};
  let items = allItems();
  items.forEach( (item) =>
  {
    todo.data.push({"text": item.firstChild.value, "completed": item.classList.contains('item-completed')});
  });
  localStorage.setItem( "todo", JSON.stringify(todo));
  console.log( 'retrieved:', localStorage.getItem('todo'));
};

let updateLastEnabled = function ()
  {
    let lastEnabled = document.querySelector('#last_enabled');
    if (lastEnabled)
    {
      lastEnabled.removeAttribute('id');
      lastEnabled.setAttribute('disabled', true);
      lastEnabled.classList.remove('is-editing');
      lastEnabled.closest('.item').classList.remove('clicked');
      console.log('last previous cleaned', lastEnabled);
    }
    return !isEmpty( lastEnabled );
  };

let isEnabled = function ( item ) {
    let ta = item.querySelector('textarea');
    let result = !(isEmpty(ta.getAttribute('disabled')));
    console.log('ta', ta, 'result', result);
    return result;
  };

export {
defaults,
        todo,
        saveTodo,
        saveDefaultTodo,
        hasSavedData,
        addItem,
        removeItem,
        saveList,
        isEmpty,
        updateLastEnabled,
        isEnabled
}
