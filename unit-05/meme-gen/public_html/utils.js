"use strict";

export class Utils {
  static htmlIdToJs(toRemove, htmlId) {
    return htmlId.replace(toRemove, '')
                 .replace(/(\-)(.)/g,
                          (match, a, b, offset, str) => b.toUpperCase());
  }
}
