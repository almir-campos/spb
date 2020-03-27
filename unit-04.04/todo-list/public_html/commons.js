const defaults = [
  {done: false, mode: 'edit', content: ''}
];

let todo;

let saveTodo = function (json)
  {
    console.log('Saving todo...');
    localStorage.setItem('todo', JSON.stringify(json));
  };

let saveDefaultTodo = function ()
  {
    console.log('Saving default todo...');
    saveTodo(defaults);
  };

let hasSavedData = function ()
  {
    return todo !== null && todo !== undefined;
  };

let toggleOptions = function (optionsDiv)
  {

  };

let addItem = function (elem)
  {

    let item = document.createElement('div');
    item.classList.add('item', 'not-clicked');

    let text = document.createElement('textarea');
    console.log('text elem:', elem);
    text.classList.add('text');
    text.toggleAttribute('disabled');

    let options = document.createElement('div');
    options.classList.add('options');

    let done = document.createElement('div');
    done.classList.add('option', 'done');

    let remove = document.createElement('div');
    remove.classList.add('option', 'remove');

    let doneOptionContent = document.createElement('span');
    doneOptionContent.classList.add('option-content');
    doneOptionContent.innerHTML = '&#10004;';

    let removeOptionContent = document.createElement('span');
    removeOptionContent.classList.add('option-content');
    removeOptionContent.innerHTML = '&#x274C;';

    //

    done.appendChild(doneOptionContent);
    remove.appendChild(removeOptionContent);
    options.appendChild(done);
    options.appendChild(remove);
    item.append(text);
    item.appendChild(options);

    //

    elem.appendChild(item);

//    let htmlStr = 
//             '<div class="item">'
//            +'  <textarea class="text" rows="3" cols="4"></textarea>'
//            +'  <div class="options">'
//            +'    <div class="option done"><span class="option-content">&#10004;</span></div>'
//            +'    <div class="option remove"><span class="option-content">&#x274C;</span></div>'
//            +'  </div>'
//            +'</div>';
//    elem.innerHTML += htmlStr;
  };

let removeItem = function (elem)
  {
    elem.remove();
  };

let allItems = function ()
  {
    return document.querySelectorAll('.item');
  };

let allTextareas = function ()
  {
    return document.querySelectorAll('textarea');
  };

let bulkToggleClass = function (toRemove, toAdd)
  {
//    console.log(0, toRemove, toAdd);
    let elems = document.querySelectorAll('.' + toRemove);
//    console.log(1, elems);

    if (elems.isEmpty())
      {
        return;
      }
//    console.log(elems);
    elems.forEach((elem) =>
    {
      if (elem.classList.contains(toRemove))
        {
          console.log('removing:', toRemove);
          elem.classList.replace(toRemove, toAdd);
        }
      else if (!elem.classList.contains(toAdd))
        {
          console.log('adding: ', toAdd);
          elem.classList.add(toAdd);
        }
    });
  };

let disableTextareas = function ()
  {
    let textareas = allTextareas();
    textareas.forEach(textarea =>
    {
//      if (!textarea.classList.isEmpty())
//        {
          console.log('removing...', textarea.classList );
          textarea.classList.remove('is-editing');
//        }
      if (!textarea.hasAttribute('disabled'))
        {
          textarea.toggleAttribute('disabled');
        }
    });
  };

export {
defaults,
    todo,
    saveTodo,
    saveDefaultTodo,
    hasSavedData,
    addItem,
    removeItem,
    bulkToggleClass,
    disableTextareas
    }
