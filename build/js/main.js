'use strict';

(() => {
  // Aккoрдеон в футере

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

  // попытки вспомнить localStorage
  try {
    var storageName = localStorage.getItem('name');
    var storagePhone = localStorage.getItem('phone');
    var storageQuestion = localStorage.getItem('question');
  } catch(error) {
    isStorageSupport = false;
    console.log(error);
  }
  let isStorageSupport = true;

  // Переменные для блока .popup-callback
  const buttonOpenModal = document.querySelector('.header__button-feedback');
  const popupCallback = document.querySelector('.popup-callback');
  const closePopupCallback = document.querySelector('.popup-callback__button-close');
  const wrapperPopupCallback = document.querySelector('.popup-callback__wrapper');
  const inputNamePopup = document.querySelector('.popup-callback input[type="text"]');
  const inputPhonePopup = document.querySelector('.popup-callback input[type="tel"]');
  const inputQuestionPopup = document.querySelector('.popup-callback textarea');
  const buttonSubmitPopup = document.querySelector('.popup-callback button[type="submit"]');
  const body = document.querySelector('.body');
  const popupTabLoopers = document.querySelectorAll('.popup-callback__looper');


  buttonOpenModal.addEventListener('click', () => {
    popupCallback.classList.add('popup-callback--opened');
    popupCallback.addEventListener('click', onOverlayClick);
    window.addEventListener('keydown', onWindowPressEsc);
    body.classList.add('body--blocked');

    if (storageName) {
      inputNamePopup.value = storageName;
      inputPhonePopup.focus();
    }

    if (storagePhone) {
      inputPhonePopup.value = storagePhone;
      inputQuestionPopup.focus();
    }

    if (storageQuestion) {
      inputQuestionPopup.value = storageQuestion;
      buttonSubmitPopup.focus();
    }
  });

  closePopupCallback.addEventListener('click', () => {
    popupCallback.classList.remove('popup-callback--opened');
    popupCallback.removeEventListener('click', onOverlayClick);
    window.removeEventListener('keydown', onWindowPressEsc);
    body.classList.remove('body--blocked');
  });

  // // 5 простых строчек для реализации клика по оверлею, но сколько времени на них протрачено...
  const onOverlayClick = (evt) => {
    if (!wrapperPopupCallback.contains(evt.target)) {
      popupCallback.classList.remove('popup-callback--opened');
      body.classList.remove('body--blocked');
    }
  };

  const onWindowPressEsc = (evt) => {
    if (evt.key === 'Escape') {
      popupCallback.classList.remove('popup-callback--opened');
      body.classList.remove('body--blocked');
      window.removeEventListener('keydown', onWindowPressEsc);
    }
  };

  buttonSubmitPopup.addEventListener('click', (evt) => {
    if (!inputNamePopup.value || !inputPhonePopup.value || !inputQuestionPopup.value) {
      evt.stopPropagation();
      evt.preventDefault();
      // анимация ошибки тут должна быть?
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', inputNamePopup.value);
        localStorage.setItem('phone', inputPhonePopup.value);
        localStorage.setItem('question', inputQuestionPopup.value);
      }
    }
  });

  for (let looper of popupTabLoopers) {
    looper.addEventListener('focus', () => {
      closePopupCallback.focus();
    });
  }

  // localStorage для блока .feedback-form

  const inputNameFeedback = document.querySelector('.feedback-form input[type="text"]');
  const inputPhoneFeedback = document.querySelector('.feedback-form input[type="tel"]');
  const inputQuestionFeedback = document.querySelector('.feedback-form textarea');
  const buttonSubmitFeedback = document.querySelector('.feedback-form button[type="submit"]');

  // inputNameFeedback.focus();

  if (storageName) {
    inputNameFeedback.value = storageName;
  }

  if (storagePhone) {
    inputPhoneFeedback.value = storagePhone;
  }

  if (storageQuestion) {
    inputQuestionFeedback.value = storageQuestion;
  }

  buttonSubmitFeedback.addEventListener('click', (evt) => {
    if (!inputNameFeedback.value || !inputPhoneFeedback.value || !inputQuestionFeedback.value) {
      evt.stopPropagation();
      evt.preventDefault();
      // анимация ошибки тут должна быть?
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', inputNameFeedback.value);
        localStorage.setItem('phone', inputPhoneFeedback.value);
        localStorage.setItem('question', inputQuestionFeedback.value);
      }
    }
  });
})();
