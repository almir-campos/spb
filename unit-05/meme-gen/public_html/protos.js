'use strict';

const badWords = [
  'bad word', 'donald trump'
];

String.prototype.containsBadWords = function () {
  const str = this.valueOf().toLowerCase();
  const result = badWords.includes(str);
  return result;
};
