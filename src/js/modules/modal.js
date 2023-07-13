function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);


	modal.classList.remove('show');
	modal.classList.add('hide');
	document.body.style.overflow = '';

}
function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);


	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}


function modal(triggerSelector, modalSelector, modalTimerId) {

	const modalTrigger = document.querySelectorAll();
	const modalClose = document.querySelector(triggerSelector); // сменили функционал в строке 127
	
	const modal = document.querySelector(modalSelector);

	modalTrigger.forEach(item => {
		item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});


	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
               
		}
	});
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});
	const modalTimerId = setTimeout(openModal, 50000);
        
	function showModalbyScrollBottom() {
		if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 1) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalbyScrollBottom);
		}
	}
	window.addEventListener('scroll', showModalbyScrollBottom);

	
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
export default modal;
export {closeModal};
export {openModal};