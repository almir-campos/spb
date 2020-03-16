'use strict';
import { optimizedRectangle } from './utils.js';

let config = {
    "number_of_pairs": 10,
    "show_timeout": 2000
};

const rc = optimizedRectangle( config.number_of_pairs  * 2, 2);
//console.log( rc );
export { config, rc }
