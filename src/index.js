import './pages/index.css';
import { elements } from './scripts/constants.js';
import { setupModal } from './scripts/modal.js';
import { createCard, renderInitialCards } from './scripts/card.js';

// Инициализация модальных окон
const { openModal: openEditModal, closeModal: closeEditModal } = setupModal(elements.editPopup);
const { openModal: openAddModal, closeModal: closeAddModal } = setupModal(elements.addPopup);
const { openModal: openImageModal } = setupModal(elements.imagePopup);

//Обработчики открытия модальных окон
//добавляем заполнение формы редактирования
elements.editButton.addEventListener('click', () => {

  const currentName = document.querySelector('.profile__title').textContent;
  const currentJob = document.querySelector('.profile__description').textContent;
 
  elements.editForm.querySelector('.popup__input_type_name').value = currentName;
  elements.editForm.querySelector('.popup__input_type_description').value = currentJob;
  
  openEditModal();

});

// обработчик для кнопки добавления
elements.addButton.addEventListener('click', openAddModal);

// Функция для открытия попапа с картинкой
function handleCardClick(cardData) {
  const imagePopup = elements.imagePopup;
  imagePopup.querySelector('.popup__image').src = cardData.link;
  imagePopup.querySelector('.popup__image').alt = cardData.name;
  imagePopup.querySelector('.popup__caption').textContent = cardData.name;
  openImageModal();
}

// Рендер начальных карточек
renderInitialCards(handleCardClick);

// Обработчики форм
elements.editForm.addEventListener('submit', handleEditSubmit);
elements.addForm.addEventListener('submit', handleAddSubmit);

function handleEditSubmit(evt) {
  evt.preventDefault();
  
  const nameInput = elements.editForm.querySelector('.popup__input_type_name');
  const jobInput = elements.editForm.querySelector('.popup__input_type_description');
  
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  
  closeEditModal();
}

function handleAddSubmit(evt) {
  evt.preventDefault();
  
  const placeName = elements.addForm.querySelector('.popup__input_type_card-name').value;
  const imageUrl = elements.addForm.querySelector('.popup__input_type_url').value;
  
  const newCard = {
    name: placeName,
    link: imageUrl
  };
  
  // Добавляем новую карточку в начало списка
  const cardElement = createCard(newCard, handleCardClick);
  elements.placesList.prepend(cardElement);
  
  // Сбрасываем форму и закрываем попап
  elements.addForm.reset();
  closeAddModal();
}