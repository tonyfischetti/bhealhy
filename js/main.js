

import { zzz } from './utils.js';



let vbClicked = false;

const veggieburgerClicked = () => {
  if(vbClicked){
    vbClicked = false;
  } else {
    vbClicked = true;
  }
  if(vbClicked){
    veggieburgerOpen();
  } else {
    veggieburgerClosed();
  }
}


const veggieburgerOpen = () => {
  const allthese = Array.from(document.getElementsByClassName("hide-when-small"));
  allthese.forEach(el => {
    el.classList.remove("hide-when-small");
  });
  const hwb = document.getElementById("kludge");
  hwb.style.display = "none";
}

const veggieburgerClosed = () => {
  const allthese = Array.from(document.getElementsByClassName("fickle"));
  allthese.forEach(el => {
    el.classList.add("hide-when-small");
  });
  const hwb = document.getElementById("kludge");
  hwb.style.display = "flex";
}


const start = () => {

  let tmp = "working";
  console.log(`JS is ${tmp}`);

  let msg = "same message";
  zzz(msg);

  const veg = document.getElementById("veggie-burger");
  veg.addEventListener('click', veggieburgerClicked);

};


window.addEventListener('DOMContentLoaded', start);

