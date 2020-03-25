'use strict';
import { optimizedRectangle } from './utils.js';

//localStorage.clear();

let stored = getStored();
let numberOfPairsInput = document.getElementById('num_pairs');
numberOfPairsInput.value = stored.number_of_pairs;

console.log( 'stored', stored);

let config = {
    "number_of_pairs": stored.number_of_pairs,
    "show_timeout": 2000
};
let rc = optimizedRectangle( config.number_of_pairs  * 2, 2);

function getStored()
{
    let data = localStorage.getItem('spb_mg');
//    console.log( 'data/before', data );
    if (data === null || data === undefined)
    {
        data = {reset: "false", number_of_pairs: 3}; //Default
        setStored( data );
        return data;
    }
//    console.log( "data/after", data );
    return JSON.parse( data );
}

function setStored( data )
{
    localStorage.setItem( 'spb_mg', JSON.stringify(data) );
    console.log( 'setStorage/data', data );
}

function updateConfig( data )
{
    config.number_of_pairs = data.number_of_pairs;
    
}

export { config, rc, getStored, setStored }
