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
    let mainDiv = document.querySelector('#main');
//    mainDiv.style.gridTemplateColumns='repeat('+ rc.c +',1fr)';

    // Generates and adds the card to the view
    addCards(config.number_of_pairs, mainDiv);

    xyz();

    let flipper = flipClosure();

    mainDiv.addEventListener('click', function (e)
    {
        flipper(e);
    });
});
