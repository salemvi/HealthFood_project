/* eslint-disable no-undef */
function calc() {

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
}
module.exports = calc;

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