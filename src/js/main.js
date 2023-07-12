// eslint-disable-next-line no-undef
const { race } = require('async');
const { default: axios } = require('axios');
// // eslint-disable-next-line no-undef
// const { fuchsia } = require('color-name');
// // eslint-disable-next-line no-undef
// const { head } = require('lodash');
// // eslint-disable-next-line no-undef
// // const { off } = require('gulp');

window.addEventListener('DOMContentLoaded', () => { // 
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

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');

	}
	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if(target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}

			});


		}
	});

	//Timer DeadLine
	const  deadline = '2023-09-29';

	function setZero(num) {
		if (num < 0){
			return num = 0;
		} else {
			return num;
		}

	}

	function getTimeRemaining(endtime) {
		const t = setZero(Date.parse(endtime) - Date.parse(new Date())),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor(( t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 * 60) % 60),
			seconds = Math.floor ((t / 1000) % 60);

		return {
			'total': t,
			'days' : days,
			'hours' : hours,
			'minutes' : minutes,
			'seconds' : seconds
		};
	}
	function getZero(num){
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

	}
	setClock('.timer', deadline);

	//Modal window

	const modalTrigger = document.querySelectorAll('[data-modal]');
	// const modalClose = document.querySelector('[data-close]'); // сменили функционал в строке 127
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


	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
               
		}
	});
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});
	const modalTimerId = setTimeout(openModal, 50000);
        
	function showModalbyScrollBottom() {
		if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener('scroll', showModalbyScrollBottom);
		}
	}
	window.addEventListener('scroll', showModalbyScrollBottom);
	// Создание класса для карточек

	class MenuCard {
		constructor(src, alt, title, descr, price, parentElement, ...classes) { 
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes; 
			this.course = 80;
			this.parent = document.querySelector(parentElement);
			this.changeToRub();
		}
		changeToRub () {
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
	// const getResource = async (url) => {
	// 	const res = await fetch(url);
	// 	if(!res.ok) {
	// 		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	// 	}
	// 	return await res.json();
	// };
	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({img, altimg, title, descr, price}) => {
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});

	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data));
	// function createCard(data) {
	// 	data.forEach(({img, altimg, title, descr, price}) => {
	// 		const element = document.createElement('div');

	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `
	// 		<img src=${img} alt=${altimg}>
	//         <h3 class="menu__item-subtitle">${title}</h3>
	//         <div class="menu__item-descr">${descr}</div>
	//         <div class="menu__item-divider"></div>
	//         <div class="menu__item-price">
	//             <div class="menu__item-cost">Цена:</div>
	//             <div class="menu__item-total"><span>${price}</span> руб/день</div>
	//         </div>
	// 		`;
	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }

	// Forms (MAMP)

	const forms = document.querySelectorAll('form'); // получаем все формыы

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Мы скоро с вами свяжемся',
		fail: 'Что-то пошло не так, пожалуйста повторите попытку',
	};
	forms.forEach(item => {
		bindPostData(item); // проходимся, для работы каждой формы, а не 1
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type' : 'application/json',
			},
			body: data
		});
		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => { // добавляем событие по клику на кнопку
			e.preventDefault(); // сбрасываем перезагркузку страницы
                 
			const statusMessage = document.createElement('img');
			statusMessage.src = message['loading']; //доп класс 
			statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                 `;
			//  form.append(statusMessage); // вставляем в форму надпись о статусе (успех или првал)
			form.insertAdjacentElement('afterend', statusMessage); // более гибко вставляем картинку загрузки

              
                 
			// при симбиозе xml и FormData устанавливать тип не нужно, при json - 'Content-type', 'application/json'
			const formData = new FormData(form); // для передачи всей инфы с формы на сервер (аналог JSON)
                
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data); // выводим в консоль информацию, которая ушла на сервер
					showThanksModal(message['success']);
					form.reset(); // после сабмита формы, текст пользователя внутри сбрасывается
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message['fail']);

				}).finally(() => {
					form.reset(); // после сабмита формы, текст пользователя внутри сбрасывается

				});
			//  request.addEventListener('load', () => { //отслеживаем конечную загрузку объекта
			//      if(request.status === 200) { // если все хорошо
			//          console.log(request.response); // выводим в консоль информацию, которая ушла на сервер
			//          showThanksModal(message['success']);
			//          form.reset(); // после сабмита формы, текст пользователя внутри сбрасывается
			//         statusMessage.remove();
			//      } else {
			//          showThanksModal(message['fail']);
			//      }
 
			//  });
		});
	}
	function showThanksModal (message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
            `;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}
	// fetch(' http://localhost:3000/menu') // заменил на axios
	// 	.then(data => data.json())
	// 	.then(res => console.log(res));


	//Slider
	//v1
	const slides = document.querySelectorAll('.offer__slide'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		//v1	
		slidesWrapper = document.querySelector('.offer__slider-wrapper'), // обертка слайдера
		slidesField = document.querySelector('.offer__slider-inner'), // поле (окошко слайдера)
		width = window.getComputedStyle(slidesWrapper).width; // получаем ширину блока
	//dots for slider
	const slider = document.querySelector('.offer__slider');
	//ind
	let slideIndex = 1;
	let offset = 0;

	//счетчик слайдов
	if(slides.length < 10) {
		total.textContent = `0${slides.length}`;
		
	} else {
		total.textContent = slides.length;
	}
	function addZeroForCurrent() {
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}
	function replaceWords(num) {
		return +num.replace(/\D/ig, '');
	}
	
	
	//ограничиваем и показываем слайды в линию
	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesWrapper.style.overflow = 'hidden';
	
	slides.forEach(slide => {
		slide.style.width = 650 + 'px';
	});

	//dots
	slider.style.position = 'relative';
	const indicatators = document.createElement('ol'),
		dots = [];
	indicatators.classList.add('carousel-indicators');
	slider.append(indicatators);
	for(let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		indicatators.append(dot);
		if(i == 0) {
			dot.classList.add('dot__active');
		}
		dots.push(dot);
	}

	//dots
	function changeActiveDots() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex-1].style.opacity = 1;
	}
	

	next.addEventListener('click', () => {
		if(offset == replaceWords(width) * (slides.length - 1)) { // 650?
			offset = 0;
		} else {
			offset += replaceWords(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if(slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
		addZeroForCurrent();
		changeActiveDots();
	
	});
	prev.addEventListener('click', () => {
		if(offset == 0) { // 650?
			offset = replaceWords(width) * (slides.length - 1);
		} else {
			offset -= replaceWords(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;


		if(slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		addZeroForCurrent();
		//dots
		changeActiveDots();

	});
	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = replaceWords(width) * (slideTo- 1); // 650?

			slidesField.style.transform = `translateX(-${offset}px)`;
			addZeroForCurrent();
			changeActiveDots();

		});
	});
	//Calculator

	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('set');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}
	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375); 
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(element  => {
			element.classList.remove(activeClass);
			if (element.getAttribute('id') == localStorage.getItem('sex')) {
				// localStorage.getItem('sex').classList.add(activeClass);
				element.classList.add(activeClass);
				sex = localStorage.getItem('sex');
			}
			if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				element.classList.add(activeClass);
				ratio = localStorage.getItem('ratio');
			}
			
		});
	}
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');





	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}
		sex === 'female' ?
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
			:
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
	}
	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(element => {
			element.addEventListener('click', (e) => {
				if(e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', sex);
				}
				elements.forEach(element => element.classList.remove(activeClass));
				e.target.classList.add(activeClass);
				
				calcTotal();
			});
		});
	}
	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		
		input.addEventListener('input', () => {
			if (input.value.match(/\D/)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}
			switch (input.getAttribute('id')) {
			case 'height':
				height = +input.value;
				// localStorage.setItem('height');
				break;
			case 'weight':
				weight = +input.value;
				break;
			case 'age':
				age = +input.value;
				break;
			
			}
			calcTotal();
		});
	}
	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');







	//Calculator

	// const result = document.querySelector('.calculating__result span');
	// let sex = 'female', height, weight, age, ratio = 1.375;

	// function calcTotal() {
	// 	if (!sex || !height || !weight || !age || !ratio) {
	// 		result.textContent = '____';
	// 		return;
	// 	}
	// 	sex === 'female' ? 
	// 		result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
	// 		:
	// 		result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
	// }
	// calcTotal();


	// function getStaticInformation(parentSelector, activeClass) {
	// 	const elements = document.querySelectorAll(`${parentSelector} div`);
	// 	elements.forEach(element => {
	// 		element.addEventListener('click', (e) => {
	// 			if (e.target.getAttribute('data-ratio')) {
	// 				ratio = +e.target.getAttribute('data-ratio');
	// 				localStorage.setItem('ratio', ratio);
	// 			} else {
	// 				sex = e.target.getAttribute('id');
	// 				localStorage.setItem('sex', sex);
	// 			}
	// 			elements.forEach(element => element.classList.remove(activeClass));
	// 			e.target.classList.add(activeClass);
	
	// 			calcTotal();
	
	// 		});
	// 	});
		
	// }
	// getStaticInformation('#gender', 'calculating__choose-item_active');
	// getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
		
	// function getDynamicSelector(selector) {
	// 	const input = document.querySelector(selector);
	// 	input.addEventListener('input', () => {
	// 		switch (input.getAttribute('id')) {
	// 		case 'height':
	// 			height = +input.value;
	// 			break;
	// 		case 'weight':
	// 			weight = +input.value;
	// 			break;
	// 		case 'age':
	// 			age = +input.value;
	// 			break;
	// 		}
	// 		calcTotal();
	// 	});

	// }
	// getDynamicSelector('#height');
	// getDynamicSelector('#weight');
	// getDynamicSelector('#age');





	//slider v1

	// showSlides(slideIndex);
	// if(slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(index) {
	// 	if (index > slides.length) {
	// 		slideIndex = 1;
	// 	}
	// 	if (index < 1) {
	// 		slideIndex = slides.length;
	// 	}
	// 	slides.forEach(item => item.style.display = 'none');
	// 	slides[slideIndex-1].style.display = 'block';

	// 	if(slideIndex < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }
	// function plusSlides(index) {
	// 	showSlides(slideIndex += index);
	// }
	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });
	// next.addEventListener('click', () => {
	// 	plusSlides(1);
	// });
	
});
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: "POST",
//     body: JSON.stringify({name: 'Vadim', age: 22}),
//     headers: {
//         'Content-type': 'application/json'
//     }
// })
// .then(response => response.json())
// .then(json => console.log(json))
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
