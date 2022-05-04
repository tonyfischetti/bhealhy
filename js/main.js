'use strict';

import { zzz } from './utils.ts';


const start = () => {

  let tmp = "working";
  console.log(`JS is ${tmp}`);

  let msg = "same message";
  zzz(msg);


};


window.addEventListener('DOMContentLoaded', start);

