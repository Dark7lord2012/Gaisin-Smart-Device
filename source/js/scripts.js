'use strict';

(() => {
  let buttonsCollapse = document.querySelectorAll('.footer__button-collapse');

  for (let button of buttonsCollapse) {
    button.classList.remove('footer__button-collapse--no-js');

    button.addEventListener('click', (evt) =>{
      if (evt.target.classList.contains('footer__button-collapse--closed')) {
        for (let btn of buttonsCollapse) {
          btn.classList.add('footer__button-collapse--closed');
        }
        evt.target.classList.remove('footer__button-collapse--closed');
      } else {
        evt.target.classList.add('footer__button-collapse--closed');
      }
    });
  }

  for (let buttonCollapse of buttonsCollapse) {
    buttonCollapse.classList.add('footer__button-collapse--closed');
  }

  // Обрезка символов в абзаце

  const kitcut = (text, limit) => {
    text = text.trim();
    if (text.length <= limit) return text;
    text = text.slice(0, limit);

    return text.trim() + '..';
  }

  const aboutUsText = document.querySelector('.about-us p:last-of-type');
  const oldText = aboutUsText.textContent;
  const maxTabletWidth = 1024;
  const maxSymbols = 200;

  if (document.documentElement.clientWidth < maxTabletWidth) {
    aboutUsText.textContent = kitcut(aboutUsText.textContent, maxSymbols)
  }

  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth < maxTabletWidth) {
      aboutUsText.textContent = kitcut(aboutUsText.textContent, maxSymbols)
    } else {
      aboutUsText.textContent = oldText;
    }
  });
})();
