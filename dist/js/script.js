/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
window.addEventListener('DOMContentLoaded', () => {
  // 
  //Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }
  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer DeadLine
  const deadline = '2023-09-29';
  function setZero(num) {
    if (num < 0) {
      return num = 0;
    } else {
      return num;
    }
  }
  function getTimeRemaining(endtime) {
    const t = setZero(Date.parse(endtime) - Date.parse(new Date())),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor(t / 1000 * 60 % 60),
      seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  ;
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
    ;
  }
  ;
  setClock('.timer', deadline);

  //Modal window

  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modalClose = document.querySelector('[data-close]');
  const modal = document.querySelector('.modal');
  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }
  modalTrigger.forEach(item => {
    item.addEventListener('click', openModal);
  });
  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, 15000);
  function showModalbyScrollBottom() {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalbyScrollBottom);
    }
  }
  window.addEventListener('scroll', showModalbyScrollBottom);
  // Создание класса для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentElement) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }
      this.classes = classes;
      this.course = 80;
      this.parent = document.querySelector(parentElement);
      this.changeToRub();
    }
    changeToRub() {
      this.price = this.price * this.course;
    }
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes.push('menu__item'); // если забыли написать класс - ставим класс по умолчанию
        element.classList.add(this.classes[0]); // добавляем в element класс по умолчанию
      } else {
        this.classes.forEach(className => element.classList.add(className)); // если не забыли, добавляем те классы, которые передали ниже в MenuCard()
      }

      element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                `;
      this.parent.append(element);
    }
  }
  new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 8, '.menu .container').render();
  new MenuCard("img/tabs/elite.jpg", "elite", 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 12, '.menu .container', 'menu__item').render();
  new MenuCard("img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 10, '.menu .container', 'menu__item').render();
});

// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function() {
//         console.log(`Hello, ${this.name}`);
//     }
// }
// User.prototype.exit = function(name) {
//     console.log(`Пользователь ${this.name} вышел!`);
// }

// const vadim = new User ('Vadim', 22);
// const alex = new User ('Alex', 24);
// vadim.exit();
// vadim.hello();
// alex.hello();
// console.log(vadim, alex);

// REST оператор
// const log = function(a, b, ...rest) {
//     console.log(a, b, rest);
// }
// log('basic', 'rest', 'opetator', 'usage', 'salem');

// function calcOrDouble(number, basis = 2)  {
//     console.log(number * basis);
// }
// calcOrDouble(3);

//  const person = {
//     name: 'Alex',
//     tel: '79325533677',
//     parents: {
//         mom: 'Olga',
//         dad: 'Mike'
//     }
//  }

// console.log(JSON.parse(JSON.stringify(person)));

// const clone = JSON.parse(JSON.stringify(person));
// clone.parents.mom = 'Ann';
// console.log(clone);
// console.log(person);
/******/ })()
;
//# sourceMappingURL=script.js.map