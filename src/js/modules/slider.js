/* eslint-disable no-undef */
function slider() {

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
}
module.exports = slider;

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