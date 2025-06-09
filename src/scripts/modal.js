// Основная функция для настройки модального окна
export function setupModal(modalElement) {
  const closeButton = modalElement.querySelector('.popup__close');

  function openModal() {
    modalElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
  }

  function closeModal() {
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
  }

  function handleEscape(evt) {
    if (evt.key === 'Escape') {
      closeModal();
    }
  }

  modalElement.addEventListener('click', (evt) => {
    if (evt.target === modalElement) {
      closeModal();
    }
  });

  closeButton.addEventListener('click', closeModal);

  return { openModal, closeModal };
}