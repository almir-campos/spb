'use strict';

import { addCards, flipClosure, xyz } from './card.js';
import { config, rc, getStored, setStored } from './cfg.js';

/**
 * All the logic starts here. Just when the page is fully loaded.
 *
 * @type type
 */
window.addEventListener('DOMContentLoaded', function ()
{

    let stored = getStored();
    let mainDiv = document.querySelector('#main');

    init(mainDiv);

    /**
     * 
     * @type Function
     */
    let flipper = flipClosure();
    mainDiv.addEventListener('click', function (e)
    {
        flipper(e);
    });

    /**
     * 
     * @type Element
     */
    let newBt = document.getElementById('newBt');
    newBt.addEventListener('click', function (e)
    {
        stored.reset = "true";
        setStored( stored );
        init(mainDiv);
    });
    
    let numberOfPairsInput = document.getElementById('num_pairs');
    numberOfPairsInput.addEventListener( 'change', function(e)
    {
        stored.number_of_pairs = numberOfPairsInput.value;
        setStored( stored );
    });
    
    
});

function init(mainDiv)
{
    resetInfo();
    hideFireworks();
    cleanDeckAddNewCards(mainDiv);

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

function hideFireworks()
{
    let fireworks = document.querySelector('#fireworks');
    fireworks.style.display = 'none';
    fireworks.style.visibility = 'hidden';
}

function cleanDeckAddNewCards(mainDiv)
{
    // Cleans the Deck
    mainDiv.innerHTML = '';
    // Generates and adds the card to the view
    addCards(config.number_of_pairs, mainDiv);

}
