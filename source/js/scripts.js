'use strict';

(() => {
  let buttonsCollapse = document.querySelectorAll('.footer__button-collapse');

  for (let button of buttonsCollapse) {
    button.classList.remove('footer__button-collapse--no-js');

    button.addEventListener('click', (evt) =>{
      for (let buttonCollapse of buttonsCollapse) {
        console.log(buttonsCollapse != evt.target)
        if (buttonCollapse.classList.contains('footer__button-collapse--closed') != false) {
          buttonCollapse.classList.add('footer__button-collapse--closed');
        }
      }

      evt.target.classList.toggle('footer__button-collapse--closed');
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

  if (document.documentElement.clientWidth < 1024) {
    aboutUsText.textContent = kitcut(aboutUsText.textContent, 201)
  }

  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth < 1024) {
      aboutUsText.textContent = kitcut(aboutUsText.textContent, 201)
    } else {
      aboutUsText.textContent = oldText;
    }
  });
})();
