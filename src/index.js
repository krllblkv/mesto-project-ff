import './pages/index.css';
import { elements } from './scripts/constants.js';
import { setupModal } from './scripts/modal.js';
import { createCard } from './scripts/card.js';
import { initialCards } from './scripts/cards.js';

// Инициализация модальных окон
const { openModal: openEditModal, closeModal: closeEditModal } = setupModal(elements.editPopup);
const { openModal: openAddModal, closeModal: closeAddModal } = setupModal(elements.addPopup);
const { openModal: openImageModal } = setupModal(elements.imagePopup);

// Обработчики открытия модальных окон
elements.editButton.addEventListener('click', () => {
  elements.editNameInput.value = elements.profileTitle.textContent;
  elements.editJobInput.value = elements.profileDescription.textContent;
  openEditModal();
});

// обработчик для кнопки добавления
elements.addButton.addEventListener('click', openAddModal);

// Функция для открытия попапа с картинкой
function handleCardClick(cardData) {
  elements.popupImage.src = cardData.link;
  elements.popupImage.alt = cardData.name;
  elements.popupCaption.textContent = cardData.name;
  openImageModal();
}

// Рендер начальных карточек
function renderInitialCards(handleCardClick) {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, handleCardClick);
    elements.placesList.append(cardElement);
  });
}

renderInitialCards(handleCardClick);

// Обработчики форм
elements.editForm.addEventListener('submit', handleEditSubmit);
elements.addForm.addEventListener('submit', handleAddSubmit);

function handleEditSubmit(evt) {
  evt.preventDefault();
  elements.profileTitle.textContent = elements.editNameInput.value;
  elements.profileDescription.textContent = elements.editJobInput.value;
  closeEditModal();
}

function handleAddSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: elements.addCardNameInput.value,
    link: elements.addCardUrlInput.value
  };
  
  // Добавляем новую карточку в начало списка
  const cardElement = createCard(newCard, handleCardClick);
  elements.placesList.prepend(cardElement);
  
  // Сбрасываем форму и закрываем попап
  elements.addForm.reset();
  closeAddModal();
}