'use strict';
import { optimizedRectangle } from './utils.js';

let config = {
    "number_of_pairs": 8,
    "show_timeout": 2000
};

const rc = optimizedRectangle( config.number_of_pairs );

export { config, rc }