'use strict';

const utils = {
  consolo: {
    debug: function( ...args )
    {
      console.debug('%c' + args, "color: red;");
    }
  }
};

export { utils }
  
