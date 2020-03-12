
//  1. Select the section with an id of container without using querySelector.

let secGet = document.getElementById('container');

//  2. Select the section with an id of container using querySelector.

let secSel = document.querySelector("#container");

//  3. Select all of the list items with a class of “second”.

let seconds = document.querySelectorAll('li.second');

//  4. Select a list item with a class of third, but only the list item inside of the ol tag.

let olThird = document.querySelector('ol li.third');

//  5. Give the section with an id of container the text “Hello!”.

   // Notice that this will destroy the content of <section id="container">.
   // So, I'm crating a backup of its content.

let secBkp = secSel.innerHTML;

secSel.innerText="Hello!";

//  6. Add the class main to the div with a class of footer.

let footerElem = document.querySelector( '.footer');
footerElem.classList.add('main');

//  7. Remove the class main on the div with a class of footer.

footerElem.classList.remove('main');

//  8. Create a new li element.

let newLi = document.createElement('li');

//  9. Give the li the text “four”.

newLi.innerText = 'four';

// 10. Append the li to the ul element.

   // Restoring the original value of <section id="container">

secSel.innerHTML = secBkp;

   // Now we can get the 'ul'

let ulElem = document.querySelector('ul');
ulElem.append( newLi );

// 11. Loop over all of the lis inside the ol tag and give them a background color of “green”.

let olElems = document.querySelectorAll('ol li');
for ( let elem of olElems)
{
    elem.style.backgroundColor = 'green';
}

// 12. Remove the div with a class of footer

footerElem.remove();
