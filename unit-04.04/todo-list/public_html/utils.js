  'use strict';
  
  
  
  export class Utils
    {
      constructor()
        {
        }

      static consolo = {
        debug: function (...args)
          {
            console.debug('%c', "color: red;", args);
          },
          json: function( json )
          {
            Utils.consolo.debug( 'JSON beautified');
            console.log( JSON.stringify(json, null, 2 ));
          }
      };

      static randomString(l)
        {
          let str = '';
          let rand;
          for (let i = 0; i < l; i++)
            {
              rand = Math.random();
              if (rand < 0.33)
                {
                  str += String.fromCharCode(Utils.randomInt(48, 57));
                }
              else if (rand < 0.66)
                {
                  str += String.fromCharCode(Utils.randomInt(65, 90));
                }
              else
                {
                  str += String.fromCharCode(Utils.randomInt(97, 122));
                }
            }
          return str;
        }
      static randomInt(min, max)
        {
          return min + Math.floor(Math.random() * (max - min + 1));
        }

      static isEmpty(obj)
        {
          let itIs = (obj === null)
              || (typeof obj === 'undefined')
              || (typeof obj.length !== 'undefined' && obj.length === 0)
              || (typeof obj.size === 'undefine' && obj.size() === 0);
          return itIs;
        }
        static swap( value, s1, s2 )
        {
          return (value === s1 ? s2 : s1);
        }
    }


