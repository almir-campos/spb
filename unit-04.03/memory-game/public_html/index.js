'use strict';

import { addCards, flipClosure } from './card.js';
//let config  = require ('./config.json');
import { config, rc } from './cfg.js';
/**
 * All the logic starts here. Just when the page is fully loaded.
 * 
 * @type type
 */
window.addEventListener('DOMContentLoaded', function ()
{
    let mainDiv = document.querySelector('#main');
    mainDiv.style.gridTemplateColumns='repeat('+ rc.c +',1fr)';
    addCards(config.number_of_pairs, mainDiv);

    let flipper = flipClosure();

    mainDiv.addEventListener('click', function (e)
    {
        flipper(e);
    });
});
