  'use strict';
  /**
   * 
   * @type type
   */
  export class Utils
    {
      /**
       * 
       */
      static consolo = {
        /**
         * 
         * @param {type} save
         * @param {type} args
         * @returns {undefined}
         */
        debug: function (save, ...args)
          {
            if (save)
              {
                let saveLog = function ()
                  {
                    let todoLog = localStorage.getItem('todo-log');
                    if (Utils.isEmpty(todoLog))
                      {
                        todoLog = '';
                      }

                    todoLog = todoLog.concat(args.join()).concat('\n');
                    localStorage.setItem('todo-log', todoLog );
                  };
                saveLog();
              }
            else
              {
                console.debug('%c', "color: red;", args);
              }
          },

        /**
         * 
         * @param {type} json
         * @param {type} beautify
         * @returns {undefined}
         */
        json: function (json, beautify)
          {
            let strJson = beautify ?
                JSON.stringify(json, null, 2) :
                JSON.stringify(json);
            return strJson;
          }
      };

      /**
       * 
       * @param {type} obj
       * @returns {Utils.isEmpty.itIs}
       */
      static isEmpty(obj)
        {
          let itIs = (obj === null)
              || (typeof obj === 'undefined')
              || (typeof obj.length !== 'undefined' && obj.length === 0)
              || (typeof obj.size === 'undefine' && obj.size() === 0);
          return itIs;
        }

      /**
       * 
       * @param {type} value
       * @param {type} s1
       * @param {type} s2
       * @returns {unresolved}
       */
      static swap(value, s1, s2)
        {
          return (value === s1 ? s2 : s1);
        }
    }