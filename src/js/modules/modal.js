function modal() {


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
}
// eslint-disable-next-line no-undef
module.exports = modal;