const defaults = [
  {done: false, mode: 'edit', content: ''}
];

let todo;

let saveTodo = function( json )
{
  console.log( 'Saving todo...');
  localStorage.setItem( 'todo', JSON.stringify( json ) );
};

let saveDefaultTodo = function()
{
  console.log( 'Saving default todo...');
  saveTodo( defaults );
};

let hasSavedData = function()
{
  return todo !== null && todo !== undefined;
};

let toggleOptions = function( optionsDiv )
{

};

export {
  defaults,
  todo,
  saveTodo,
  saveDefaultTodo,
  hasSavedData
}
