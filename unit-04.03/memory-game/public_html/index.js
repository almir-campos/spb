'use strict';

import { addCards, flipClosure, xyz } from './card.js';
import { config, rc } from './cfg.js';

/**
 * All the logic starts here. Just when the page is fully loaded.
 *
 * @type type
 */
window.addEventListener('DOMContentLoaded', function ()
{
  localStorage.setItem('reset', 'false');
  let mainDiv = document.querySelector('#main');

  init(mainDiv);

  let flipper = flipClosure();

  mainDiv.addEventListener('click', function (e)
  {
    flipper(e);
  });

  let newBt = document.getElementById('newBt');
  newBt.addEventListener('click', function (e)
  {
    localStorage.setItem('reset', 'true');
    init(mainDiv);
  });
});

function init(mainDiv)
{
  resetInfo();
  mainDiv.innerHTML = '';
  // Generates and adds the card to the view
  addCards(config.number_of_pairs, mainDiv);

}

function resetInfo()
{
  let found_pairs_div = document.getElementById('found_pairs');
  let clicks_div = document.getElementById('clicks');
  let score_div = document.getElementById('score');
  found_pairs_div.innerText = 0;
  clicks_div.innerText = 0;
  score_div.innerText = 0;

}
