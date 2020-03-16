'use strict';

const FRONT = 0;
const BACK = 1;

import { optimizedRectangle, randomString, randomInt } from './utils.js';
import { rc } from './cfg.js';


/**
 *
 * @param {type} card
 * @returns {Boolean}
 */
function isFaceUp(card)
{
  return card.dataset.faceup === 'true';
}

function getFace(card, n)
{
  return card.children[n];
}


export function flipClosure()
{
  let pairIndex = 0;
  let pairArray = [];
  let viewing_cards = false;

  let timeout = function ()
  {
    return setTimeout(function ()
    {
      flipCard(pairArray[ 0 ]);
      flipCard(pairArray[ 1 ]);
      viewing_cards = false;
    }, 3000);
  };
  let timeoutId;

  return function (e)
  {
    // If it's not a card, do nothing.
    if (e.target.parentElement.dataset.pairid === undefined)
    {

      return;
    }

    let card = e.target.parentElement;

    // If the card is face up, do nothing.
    if (isFaceUp(card))
    {
      return;
    }

    // Cancels the timeout and flip the cards with face up
    if (viewing_cards)
    {
      clearTimeout(timeoutId);
      flipCard(pairArray[ 0 ]);
      flipCard(pairArray[ 1 ]);
      viewing_cards = false;
    }

    // Updates the pair array
    pairArray[ pairIndex ] = e.target.parentElement;

    // Flips the current card
    flipCard(card);

    // Checks if the visible card matches
    if (pairIndex++ === 1)
    {
      pairIndex = 0;
      // Yes. Changes their front color and keeps them open.
      if (pairArray[ 0 ].dataset.pairid === pairArray[ 1 ].dataset.pairid)
      {
        let face = getFace(pairArray[0], FRONT);
        face.classList.add('matched');
        face.children[1].style.display = 'block';
        //
        face = getFace(pairArray[1], FRONT);
        face.classList.add('matched');
        face.children[1].style.display = 'block';
        //
        pairArray[0].style.boxShadow='none';
        pairArray[1].style.boxShadow='none';
      }
      // No. Sets timeout for flipping the cards and
      // set the status to "viewing cards" (which can be interrupted)
      else
      {
        viewing_cards = true;
        timeoutId = timeout();
      }
    }
  };
}


/**
 * Flips a card back to front, and vice-versa.
 *
 * @param {type} card
 * @returns {undefined}
 */
function flipCard(card)
{
  let front = card.querySelector('.card-front');
  let back = card.querySelector('.card-back');
  toggleView(front);
  toggleView(back);
  card.dataset.faceup = front.classList.contains('show');
}

/**
 * Togle the visibility of a card face
 * - It can be optimized to use the ClassList 'toggle()' method
 *
 * @param {type} face
 */
function toggleView(face)
{
  let cl = face.classList;
  if (cl.contains('show'))
  {
    cl.replace('show', 'hide');
  } else if (cl.contains('hide'))
  {
    cl.replace('hide', 'show');
  }
}
/**
 * Turns an array with 'n' card pairs (total of '2 * n' cards)
 *
 * @param n - number of card pairs
 * @returns {Array|createCardArray.cardArray}
 */
function createCardArray(n)
{
  let cardArray = new Array();
  let card;
  for (let i = 0; i < n; i++)
  {
    // Creates the first card
    card = createOneCard(i);
//        card.innerText = i;
    cardArray.push(card);
    // Creates the pair of the first car.
    // Both will have the same value for the 'data-pair' attribute
    card = createOneCard(i, card.dataset.pairid);
//        card.innerText = i;
    cardArray.push(card);
  }
  console.log('createCardArray', cardArray);
  return cardArray;
}

/**
 * Returns a card or it's pair (if 'pairid' is provided)
 * - In the future create the classes Card and Face
 *
 * @param {String} pairid
 * @returns {Element|createOneCard.card}
 */
function createOneCard(content, pairid)
{
  let front = document.createElement('div');
  front.classList.add('card');
  front.classList.add('card-front');
  front.classList.add('hide');

  let check = document.createElement('div');
  check.classList.add('check');
  check.innerText = '\u2713';

  let back = document.createElement('div');
  back.classList.add('card');
  back.classList.add('card-back');
  back.classList.add('show');

  let card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-pairid', pairid === null || pairid === undefined ? randomString(6) : pairid); //**
  card.setAttribute('data-faceup', "false");
  //
  front.innerHTML = '<div class="face-content">' + content + '</div>';
  front.append(check);
  card.append(front);
  //
  card.append(back);
  return card;
}


function shuffleArray(arr)
{
  let l = arr.length;
  let i;
  let shuffled = [];
  while (l > 0)
  {
    i = randomInt(0, l - 1);
    shuffled.push(arr[i]);
    arr.splice(i, 1);
    l = arr.length;
  }
  return shuffled;
}

export function xyz()
{
  let carr = createCardArray(4);
  let sarr = shuffleArray(carr);
  for (let i = 0; i < sarr.length; i++)
  {
    console.log(sarr[i]);
  }
}

/**
 * Appends 'n' pairs of cards to the element 'elem' in a random order
 *
 * @param {type} n
 * @param {type} elem
 * @returns {undefined}
 */
export function addCards(n, elem)
{
  let cardArray = shuffleArray(createCardArray(n));
  let l = cardArray.length;
  let c = 0;
  let row;

  for (let i = 0; i < l; i++)
  {
    if (i % rc.c === 0)
    {
      row = document.createElement('div');
      row.classList.add('row');
      elem.appendChild(row);
      console.log(row, i, rc.c);
    }
    row.appendChild(cardArray[i]);
  }





//          = document.createElement('div');
//  row.classList.add('row');
//  elem.appendChild(row);

//  let count = 0;
//  while (l > 0)
//  {
//    if (count % 2 === 0)
//    {
//      row = document.createElement('div');
//      row.classList.add('row');
//      elem.appendChild(row);
//    }
//    i = randomInt(0, l - 1);
//    row.appendChild(cardArray[i]);
//    cardArray.splice(i, 1);
//    l = cardArray.length;
//    count++;
//  }

}

