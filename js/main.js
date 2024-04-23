"use strict"

jQuery(document).ready(function () {
    
  $(".phone").mask("+7 (999) 999-99-99"); 
  
  jQuery('.send-form').click( function() {
    var form = jQuery(this).closest('form');
    
    if ( form.valid() ) {
      //form.css('opacity','.5');
      var actUrl = form.attr('action');

      jQuery.ajax({
        url: actUrl,
        type: 'post',
        dataType: 'html',
        data: form.serialize(),
        success: function(data) {
          form.html(data);
          form.css('opacity','1');
                  //form.find('.status').html('Заявка отправлена <p>Перезвоним вам в ближайшее время</p> Спасибо!');
                  //$('#myModal').modal('show') // для бутстрапа
        },
        error:	 function() {
            form.find('.status').html('серверная ошибка');
        }
      });
    }
  });
});

const openHeaderMenu = document.querySelector('.header__services-button');
const headerMenuList = document.querySelector('.header__list-wrapper');

openHeaderMenu.addEventListener('click', () => {
 headerMenuList.classList.toggle('open-list');
 openHeaderMenu.classList.toggle('open-arrow');
});

document.addEventListener('click', (e) => {
 if (!headerMenuList.contains(e.target) && !openHeaderMenu.contains(e.target)) {
    headerMenuList.classList.remove('open-list');
    openHeaderMenu.classList.remove('open-arrow');
 }
});

//------------------------------------------------------------------------Меню-Бургер
const burgerMenu = document.querySelector('.header__burger-wrapper');
const menuBody= document.querySelector('.menu');

if(burgerMenu) {
    burgerMenu.addEventListener("click", function (e) {
      burgerMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    });
}
//------------------------------------------------------------------------закрытие меню при клике вне его
document.addEventListener ('click', (e) => {
  if (!burgerMenu.contains(e.target)) {
    menuBody.classList.remove('_active');
    burgerMenu.classList.remove('_active');
  }
});
//------------------------------------------------------------------------закрытие меню при клике вне его


//------------------------------------------------------------------------Прокрутка при клике
let buttons = document.querySelectorAll('.menu__link');

buttons.forEach((elem)=>{
  elem.addEventListener('click',()=>{
    menuBody.classList.remove('_active');
    burgerMenu.classList.remove('_active');
  })
})

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
      
        window.scrollTo({
        top:gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}
//------------------------------------------------------------------------Прокрутка при клике


//------------------------------------------------------------------------Готовые блоки кода

//------------------------------------------------------------------------Quiz
//const quizBody = document.querySelector('.quiz__body');
//const quizStart = document.querySelector('.quiz__start');
//const formQuiz = document.querySelector('.quiz-form');
//const formItems = formQuiz.querySelectorAll('fieldset');
//const formBtnNext = formQuiz.querySelectorAll('.quiz-form__btn-next');
//const formBtnPrev = formQuiz.querySelectorAll('.quiz-form__btn-prev');
//const overlay = document.querySelector('.overlay');

//const answersObj = {
//  step0: {
//    question: '',
//    answers: [],
//  },
//  step1: {
//    question: '',
//    answers: [],
//  },
//  step2: {
//    question: '',
//    answers: [],
//  },
//  step3: {
//    question: '',
//    answers: [],
//  },
//  step4: {
//    name: "",
//    phone: "",
//    email: "",
//    call: "",
//  },
//}
//
////отключаем квиз
//quizBody.style.display = "none";
//// включаем квиз при клике
//quizStart.addEventListener('click', () => {
//  quizBody.style.display = "block";
//  quizStart.style.display = "none";
//  questionCounter(1);
//});
//
//// создаем индикатор прогресса и выводим номер текущего вопроса
//let questionNumb = 1;
//function questionCounter(index) {
//
//  const quizIndicator = document.querySelector('.quiz-indicator');
//  quizIndicator.innerHTML = `${index} / ${formItems.length}`;
//
//  let progress = document.querySelector(".quiz__progress-inner");
//  progress.style.width = `${Math.round(((index) / formItems.length) * 100)}%`;
//}
//
//// включаем в работу кнопки
//for(let i = 0; i < formBtnPrev.length; i++) {
//  formBtnPrev[i].addEventListener('click', (event) => {
//    event.preventDefault();
//    formItems[i + 1].style.display = "none";
//    formItems[i].style.display = "block";
//    questionNumb--;
//    questionCounter(questionNumb);
//  });
//}
//
//formBtnNext.forEach((btn, btnIndex) => {
//  btn.addEventListener('click', (event) => {
//    event.preventDefault();
//    formItems[btnIndex].style.display = "none";
//    formItems[btnIndex + 1].style.display = "block";
//    questionNumb++;
//    questionCounter(questionNumb);
//    
//  });
//  btn.disabled = true;    
//});
//
////перебираем fieldset и выводим первый
//formItems.forEach((formItem, formItemIndex) => {
//    if(formItemIndex === 0) {
//    formItem.style.display = "block";
//  } else {
//    formItem.style.display = "none";
//  }
//
//  if(formItemIndex !== formItems.length - 1) {
//    const inputs = formItem.querySelectorAll("input");
//    const itemTitle = formItem.querySelector('.quiz-form__title');
//    
//    answersObj[`step${formItemIndex}`].question = itemTitle.textContent;
//
//    inputs.forEach((input) => {
//      const parent = input.parentNode;
//      input.checked = false;
//      parent.classList.remove(".active-radio");
//      parent.classList.remove(".active-checkbox");
//    });
//  }
//  
//    // выбор radio и checkbox
//    formItem.addEventListener('change', (event) => {
//      const target = event.target;
//      const inputsChecked = formItem.querySelectorAll("input:checked");
//
//      if(formItemIndex !== formItems.length - 1) {
//      answersObj[`step${formItemIndex}`].answers.length = 0;
//      inputsChecked.forEach((inputChecked) => {
//        answersObj[`step${formItemIndex}`].answers.push(inputChecked.value);
//      });
//
//      if(inputsChecked.length > 0) {
//        formBtnNext[formItemIndex].disabled = false;
//      } else {
//        formBtnNext[formItemIndex].disabled = true;
//      }
//      
//      if (target.classList.contains("quiz-form__radio")) {
//        const radios = formItem.querySelectorAll(".quiz-form__radio");
//
//        radios.forEach(input => {
//          if(input === target) {
//            input.parentNode.classList.add(".active-radio");
//          } else {
//            input.parentNode.classList.remove(".active-radio");
//          }
//        });
//      } else if (target.classList.contains("quiz-form__checkbox")) {
//        target.parentNode.classList.toggle(".active-checkbox");
//      } else {
//        return;
//      }
//    }
//  });
//});
//
//// сбор и отпрака формы
//const sendForm = () => {
//  formQuiz.addEventListener('submit', (event) => {
//    event.preventDefault();
//    
//    answersObj.step4.name = document.getElementById('quiz-name').value;
//    answersObj.step4.phone = document.getElementById('quiz-phone').value;
//    answersObj.step4.email= document.getElementById('quiz-email').value;
//    answersObj.step4.call = document.getElementById('quiz-call').value;
//    
//    for (let key in answersObj.step4) {
//      if (answersObj.step4[key].value === "") {
//        alert("Введите данные во все поля");
//      }
//    }
//
//    if (document.getElementById("quiz-policy").checked) {
//      postData(answersObj)
//      .then((res) => res.json())
//      .then((res) => {
//        if(res["status"] === "ok") {
//          overlay.style.display = "none";
//          quizBody.style.display = "none";
//          quizStart.style.display = "block";
//          formQuiz.reset();
//          alert(res["message"]);
//        } else if (res["status"] === "error") {
//          alert(res["message"]);
//        }
//      });
//    } else {
//      alert("Дайте согласие на обработку персональных данных")
//    }
//  });
//};
//
//  const postData = (body) => {
//    return fetch("./server.php", {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//      },
//      body: JSON.stringify(body)
//    });
//  };
//
//  overlay.style.display = "none";
//  quizBody.style.display = "none";
//
//  const pastTestButton = document.querySelector('.pas__test-button');
//  pastTestButton.addEventListener("click", () => {
//    formItems.forEach((formItem, formItemIndex) => {
//      if (formItemIndex === 0) {
//        formItem.style.display = "block";
//      } else {
//        formItem.style.display = "none";
//      }
//      
//      const inputs = formItem.querySelectorAll("input");
//      inputs.forEach((input) => {
//        const parent = input.parentNode;
//        input.checked = false;
//        parent.classList.remove("active-radio");
//        parent.classList.remove("active-checkbox");
//      });
//    });
//    formBtnNext.forEach((btn) => {
//      btn.disabled = true;
//    });
//    overlay.style.display = "block";
//    quizBody.style.display = "block";
//  });
//    sendForm();

//------------------------------------------------------------------------Quiz

//------------------------------------------------------------------------select выпадающий список
//document.querySelectorAll('.dropdown').forEach(function(dropDownWrapper) {
//
//  const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
//  const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
//  const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
//  const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
//  
//  //клик по кнопки. открыть/закрыть
//  dropDownBtn.addEventListener('click', function () {
//    dropDownList.classList.toggle('dropdown__list--active');
//    this.classList.add('dropdown__button--active');
//  });
//  //выбор элемента списка, запомнить выбранное значение, закрыть дропдаун
//  dropDownListItems.forEach(function (listItem) {
//      listItem.addEventListener('click', function (e) {
//        e.stopPropagation();
//        dropDownBtn.innerText = this.innerText;
//        dropDownBtn.focus();
//        dropDownInput.value = this.dataset.value;
//        dropDownList.classList.remove('dropdown__list--active');
//      })
//  });
//  //клик снаружи дропдауна, закрываем его
//  document.addEventListener('click', function (e) {
//    if (e.target !== dropDownBtn) {
//      dropDownList.classList.remove('dropdown__list--active');
//      dropDownBtn.classList.remove('dropdown__button--active');
//    }
//  })
//  
//  document.addEventListener('keydown', function (e) {
//    if (e.key === 'Tab' || e.key === 'Escape') {
//      dropDownList.classList.remove('dropdown__list--active');
//      dropDownBtn.classList.remove('dropdown__button--active');
//    }
//  })
//});
//
//------------------------------------------------------------------------select выпадающий список


//------------------------------------------------------------------------Слайдер
const mainSwiper = new Swiper('.main__swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  speed: 1000,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 640px
    1200: {
      slidesPerView: 2,
    }
  }
});


const worksSlider = new Swiper('.works__slider', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 1000,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


const designSlider = new Swiper('.design__slider', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 1000,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    880: {
      slidesPerView: 2,
    },
  }
 });



 const reviewsSlider = new Swiper('.reviews__slider', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 3,
  spaceBetween: 20,
  speed: 1000,
  autoHeight: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    980: {
      slidesPerView: 3,
    }
  }
 });


 const projectsSlider = new Swiper('.projects__slider', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  speed: 1000,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    1200: {
      slidesPerView: 2,
    }
  }
});


//------------------------------------------------------------------------Слайдер

//------------------------------------------------------------------------Слайдер

 var mixer = mixitup('.design__body', {
  load: {
    filter: '.cabinet'
  },
  animation: {
    enable: false,
    nudge: false,
  }
 });

//------------------------------------------------------------------------Слайдер

//------------------------------------------------------------------------добавление контент при клике на кнопку
$(function(){
  $('.works__button-more').click(function(){
      $('.works__body-more').toggleClass('more');
      $('.works__button-more').toggleClass('close');
      $('.works__btn-more').toggleClass('btn-open');
  });
  $('.works__btn-more').click(function(){
    $('.works__body-more-two').toggleClass('more');
    $('.works__btn-more').toggleClass('close');
});
 });
//------------------------------------------------------------------------добавление контент при клике на кнопку


//------------------------------------------------------------------------popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;
const timeout = 800;

// Use event delegation for popup links
document.addEventListener('click', function(e) {
 if (e.target.matches('.popup-link')) {
    const popupName = e.target.getAttribute('href').replace('#', '');
    const currentPopup = document.getElementById(popupName);
    popupOpen(currentPopup);
    e.preventDefault();
 }
});

// Use event delegation for popup close icons
document.addEventListener('click', function(e) {
 if (e.target.matches('.close-popup')) {
    popupClose(e.target.closest('.popup'));
    e.preventDefault();
 }
});

function popupOpen(currentPopup) {
 if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener("click", function(e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
 }
}

function popupClose(popupActive, doUnlock = true) {
 if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    }
 }
}

function bodyLock() {
 const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
 lockPadding.forEach(el => el.style.paddingRight = lockPaddingValue);
 body.style.paddingRight = lockPaddingValue;
 body.classList.add('lock');

 unlock = false;
 setTimeout(function() {
    unlock = true;
 }, timeout);
}

function bodyUnlock() {
 setTimeout(function() {
    lockPadding.forEach(el => el.style.paddingRight = '0px');
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
 }, timeout);
 unlock = false;
 setTimeout(function() {
    unlock = true;
 }, timeout);
}

document.addEventListener('keydown', function(e) {
 if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
 }
});

//------------------------------------------------------------------------popup


//------------------------------------------------------------------------Accordion
const titles = document.querySelectorAll('.accordion__title');
const contents = document.querySelectorAll('.accordion__content');

titles.forEach(item => item.addEventListener('click', () => {
    const activeContent = document.querySelector('#' + item.dataset.tab);

    if (activeContent.classList.contains('active')) {
        activeContent.classList.remove('active');
        item.classList.remove('active');
        activeContent.style.maxHeight = 0;
    } else {
      contents.forEach(element => {
        element.classList.remove('active');
        element.style.maxHeight = 0;
      });
      titles.forEach(element => element.classList.remove('active'));

      item.classList.add('active');
      activeContent.classList.add('active');
      activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
    }
}));
document.querySelector('[data-tab="tab-1').classList.add('active');
document.querySelector('#tab-1').classList.add('active');
document.querySelector('#tab-1').style.maxHeight = document.querySelector('#tab-1').scrollHeight + 'px';
//------------------------------------------------------------------------Accordion


//------------------------------------------------------------------------Tabs
//const tabsButton = document.querySelectorAll('.tabs-button');
//const tabsContent = document.querySelectorAll('.tabs-content');
//
//tabsButton.forEach((tab, index) => {
//  tab.addEventListener('click', () => {
//    tabsButton.forEach(tab => {tab.classList.remove('active-tab')});
//    tab.classList.add('active-tab');
//    
//    tabsContent.forEach(content => {content.classList.remove('active-tab')})
//    tabsContent[index].classList.add('active-tab');
//  });
//});
//------------------------------------------------------------------------Tabs


//------------------------------------------------------------------------Animation
//const animItems = document.querySelectorAll('._anim-items');
//if (animItems.length > 0) {
//  window.addEventListener('scroll', animOnScroll);
//  function animOnScroll() {
//    for (let index = 0; index < animItems.length; index++) {
//        const animItem = animItems[index];
//        const animItemHeight = animItem.offsetHeight;
//        const animItemOffset = offset(animItem).top;
//        const animStart = 5;
//
//        let animItemPoint = window.innerHeight - animItemHeight / animStart;
//
//        if (animItemHeight > window.innerHeight) {
//          animItemPoint = window.innerHeight - window.innerHeight / animStart;
//        }
//
//        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
//          animItem.classList.add('_action');
//        } else {
//          animItem.classList.remove('_action');
//        }
//    }
//  }
//  function offset(el) {
//    const rect = el.getBoundingClientRect(),
//    scrollLeft  = window.pageXOffset || document.documentElement.scrollLeft,
//    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//    return {top: rect.top + scrollTop, left: rect.left + screenLeft}
//  }
//  animOnScroll();
//}
//------------------------------------------------------------------------Animation

