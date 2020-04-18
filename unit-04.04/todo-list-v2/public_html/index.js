'use strict';

import { MainDiv } from './main/MainDiv.js';

/**
 * The application's main listener. This script is the only one
 * that is called from the index.html file. All the others come
 * from this file.
 * If you want to open the app directly from the index.html file, make sure
 * that in:
 * - Chrome, this flag is set to 'disabled':
 * chrome://flags/#cross-origin-isolation
 * - Firefox, privacy.file_unique_origin is set to 'false'
 */
window.addEventListener('DOMContentLoaded', function () {
  // localStorage.clear();
  MainDiv.init();
});


