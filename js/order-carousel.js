'use strict';

import { Splide } from './vendor/splide.esm.js';




const start = () => {
  console.log("carousel js loaded");


  const splide = new Splide("#main-slider",
    {
      type: 'loop',
      width: 400,
      height: 400,
      pagination: false,
      cover: true,
      autoplay: true,
      interval: 3000,
      perPage: 1,
      gap: 30,
      perMove: 1,
  });

  const initThumbnail = (thumbnail, index) => {
    thumbnail.addEventListener("click", function () {
      splide.go(index);
    });
  };

  const thumbnails = document.getElementsByClassName("thumbnail");
  let current;

  for (let i = 0; i < thumbnails.length; i++) {
    initThumbnail(thumbnails[i], i);
  }


  splide.on("mounted move", function () {
    const thumbnail = thumbnails[splide.index];

    if (thumbnail) {
      if (current) {
        current.classList.remove("is-active");
      }

      thumbnail.classList.add("is-active");
      current = thumbnail;
    }
  });


  splide.mount();
  // splide.play();


};

window.addEventListener('DOMContentLoaded', start);



// --------------------------------------------------------------- //
//
//


