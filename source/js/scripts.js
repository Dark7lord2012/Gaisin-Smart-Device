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
})();
