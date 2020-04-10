'use strict';

// import {Clicked} from '../index/ClickedEntity.js';

/**
 *
 * @type type
 */
export class Utils {
  /**
   *
   */
  static consolo = {
    debug: function (save, ...args) {
      if (save) {
        let saveLog = function () {
          let todoLog = localStorage.getItem('todo-log');
          if (Utils.isEmpty(todoLog)) {
            todoLog = '';
          }

          todoLog = todoLog.concat(args.join())
              .concat('\n');
          localStorage.setItem('todo-log', todoLog);
        };
        saveLog();
      }
      else {
        console.debug('%c', "color: red;", args);
      }
    },

    json: function (json, beautify) {
      let strJson = beautify ?
          JSON.stringify(json, null, 2) :
          JSON.stringify(json);
      return strJson;
    }
  };

  /**
   * Detects if an object is null, or undefined, or has no length.
   */
  static isEmpty(obj) {
////        let objc = getObject
//        let itIs = new Clicked(getObject).name() !== 'item' || !getObject || !getObject.length;
//
//        // let itIs = ( getObject === null )
//        //            || ( typeof getObject === 'undefined' )
//        //            || ( typeof getObject.length !== 'undefined' && getObject.length === 0 )
//        console.log('-----');
//          console.log('getObject', getObject);
//          console.log('getObject.length', !getObject ? "n/a" : getObject.length);
//          console.log('itIs', itIs );
//          return itIs;
//      
//      //            || ( typeof getObject.size === 'undefined' || getObject.size === 0 );

    let theType = Utils.getType(obj);

    let result =
        (theType === 'null' || theType === 'undefined') ||
        (theType === 'string' && obj.length === 0) ||
        (theType === 'array' && obj.length === 0) ||
        (theType === 'node-list' && obj.length === 0) ||
        (theType === 'collection' && obj.length === 0) ||
        (theType === 'number' && (obj === Number(0 / 0))) ||
        (theType === 'cliked' &&)
        (theType !== 'element');

    return result;
  }

  /**
   *
   * Sources:
   * https://webbjocke.com/javascript-check-data-types/
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
   * https://stackoverflow.com/a/36857902
   *
   * This function can be optmized by using object.constructor and other techniques
   *
   */
  //
  // TODO: Optimize and uniform (?) this function.
  //
  static getType(obj) {
    let isJson = function (obj) {
      try {
        JSON.parse(obj.toString);
      } catch (e) {
        return false;
      }
    };
    // @formatter:off
    let theType =
      obj === null ? 'null' :
      typeof obj === 'undefined' ? 'undefined' :
      typeof obj === 'function' ? 'function' :
      typeof obj === 'string' || obj instanceof String ? 'string' :
      typeof obj === 'number' && isFinite(obj) ? 'number' :
      typeof obj === 'boolean' ? 'boolean' :
      typeof obj === 'symbol' ? 'symbol' :
      obj instanceof Error && typeof obj.message !== 'undefined' ? 'error' :
      obj instanceof Clicked ? 'clicked' :
      obj instanceof Item ? 'item':
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

  /**
   * Swaps the objects s1 by s2, or vice-versa, depending on the the input value.
   * If the input value isn't equals to s1 or s2 the function returns null.
   *
   * @param {Object} value
   * @param {Object} s1
   * @param {Object} s2
   * @returns {Boolean}
   */
  static swap(value, s1, s2) {
    return value === s1 ? s2 :
        value === s2 ? s1 : null;
  }

  /**
   * Utility function - returns a random string with length 'l'
   */
  static randomString(l) {
    let str = '';
    let rand;
    for (let i = 0; i < l; i++) {
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
