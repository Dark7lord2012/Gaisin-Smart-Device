'use strict';

(() => {
  // aккардеон в футере

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

  // Маска для поле ввода телефона (+JQuery) - господи как лаконично!

  $('input[type="tel"]').mask("+7(999) 9999999");

  // Oткрытие закрытие попапа заказа звонка в шапке

  const buttonOpenModal = document.querySelector('.header__button-feedback');
  const popupCallback = document.querySelector('.popup-callback');
  const closePopupCallback = document.querySelector('.popup-callback__button-close');
  const wrapperPopupCallback = document.querySelector('.popup-callback__wrapper');
  const inputNamePopup = document.querySelector('.popup-callback input[type="text"]');


  buttonOpenModal.addEventListener('click', () => {
    popupCallback.classList.add('popup-callback--opened');
    popupCallback.addEventListener('click', onOverlayClick);
    window.addEventListener('keydown', onWindowPressEsc);
    inputNamePopup.focus();
  });

  closePopupCallback.addEventListener('click', () => {
    popupCallback.classList.remove('popup-callback--opened');
    popupCallback.removeEventListener('click', onOverlayClick);
    window.removeEventListener('keydown', onWindowPressEsc);
  });

  // // 5 простых строчек для реализации клика по оверлею, но сколько времени на них протрачено...
  const onOverlayClick = (evt) => {
    if (!wrapperPopupCallback.contains(evt.target)) {
      popupCallback.classList.remove('popup-callback--opened');
    }
  };

  const onWindowPressEsc = (evt) => {
    if (evt.key === 'Escape') {
      popupCallback.classList.remove('popup-callback--opened');
    }
  };

  // попытки вспомнить localStorage
  let isStorageSupport = true;

  try {
    let storageName = localStorage.getItem('name');
    let storageEmail = localStorage.getItem('email');
  } catch(error) {
    isStorageSupport = false;
    console.log(error);
  }
})();
