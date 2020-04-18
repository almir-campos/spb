'use strict';

export class Utils {

  /**
   *
   */
  static consolo = {
    debug(save, ...args) {
      if (save) {
        let saveLog = function () {
          let todoLog = localStorage.getItem('todo-log');
          if (Utils.isEmpty(todoLog)) {
            todoLog = '';
          }
          todoLog =
            todoLog.concat(new Date().toDateString()).concat(args.join())
                   .concat('\n');
          localStorage.setItem('todo-log', todoLog);
        };
        saveLog();
      } else {
        console.debug('%c', "color: red;", args);
      }
    },

    json(json, beautify) {
      let strJson = beautify ? JSON.stringify(json, null, 2) :
                    JSON.stringify(json);
      return strJson;
    }
  };


  /**
   * Detects if an object is null, or undefined, or has no length.
   */
  static isEmpty(obj) {

    let theType = Utils.getType(obj);

    let result = (theType === 'null' || theType === 'undefined') ||
                 (theType !== 'element') &&
                 ((theType === 'string' && obj.length === 0) ||
                 (theType === 'array' && obj.length === 0) ||
                 (theType === 'node-list' && obj.length === 0) ||
                 (theType === 'collection' && obj.length === 0) ||
                 (theType === 'number' && (obj === Number(0 / 0))));

    return result;
  }

  static isNotEmpty(obj) {
    return !Utils.isEmpty(obj);
  }

  /**
   *
   * Sources:
   * https://webbjocke.com/javascript-check-data-types/
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
   * https://stackoverflow.com/a/36857902
   *
   * This function can be optmized by using object.constructor and other
   * techniques
   *
   */
  //
  // TODO: Optimize and uniform (?) this function.
  //
  static getType(obj) {
    let isJson = function (obj) {
      try {
        JSON.parse(obj.toString());
      } catch (e) {
        return false;
      }
    };
    // @formatter:off
    let theType =
      obj === null ? 'null' :
      obj === 'null' ? 'null' :
      obj === 'undefined' ? 'undefined' :
      typeof obj === 'undefined' ? 'undefined' :
      typeof obj === 'function' ? 'function' :
      typeof obj === 'string' || obj instanceof String ? 'string' :
      typeof obj === 'number' && isFinite(obj) ? 'number' :
      typeof obj === 'boolean' ? 'boolean' :
      typeof obj === 'symbol' ? 'symbol' :
      obj instanceof Error && typeof obj.message !== 'undefined' ? 'error' :
      obj instanceof Date ? 'date' :
      obj && typeof obj === 'object' && obj.constructor === Array ? 'array' :
      Array.isArray( obj ) ? 'array' :
      NodeList.prototype.isPrototypeOf( obj ) ? 'node-list' :
      HTMLCollection.prototype.isPrototypeOf( obj ) ? 'collection' :
      HTMLElement.prototype.isPrototypeOf( obj ) ? 'element' :
      Set.prototype.isPrototypeOf( obj ) ? 'set' :
      isJson() ? 'json' :
      obj && typeof obj === 'object' && obj.constructor === RegExp ? 'regexp':
      obj && typeof obj === 'object' && obj.constructor === Object ? 'object':
      'unknown';
    // @formatter:on
    return theType;
  }


  // TODO: Either use or Remove this method
  static swap(value, s1, s2) {
    return value === s1 ? s2 : value === s2 ? s1 : null;
  }

  /**
   * Utility function - returns a random string with length 'l'
   */
  static randomString(l) {
    // Always starts with a capital alpha character for
    // compatibility reasons - eg, element id.
    //
    let str = String.fromCharCode(Utils.randomInt(65, 90));
    let rand;
    for (let i = 0; i < l - 1; i++) {
      rand = Math.random();
      if (rand < 0.33) {
        str += String.fromCharCode(Utils.randomInt(48, 57));
      } else if (rand < 0.66) {
        str += String.fromCharCode(Utils.randomInt(65, 90));
      } else {
        str += String.fromCharCode(Utils.randomInt(97, 122));
      }
    }
    return str;
  }

  /**
   *
   * @param {Number} min
   * @param {Number} max
   * @returns {Number}
   */
  static randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}
