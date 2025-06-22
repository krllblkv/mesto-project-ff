import './pages/index.css';
import { elements } from './scripts/constants.js';
import { setupModal } from './scripts/modal.js';
import { createCard } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar
} from './scripts/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId;

// Инициализация модальных окон
const { openModal: openEditModal, closeModal: closeEditModal } = setupModal(elements.editPopup);
const { openModal: openAddModal, closeModal: closeAddModal } = setupModal(elements.addPopup);
const { openModal: openImageModal, closeModal: closeImageModal } = setupModal(elements.imagePopup);
const { openModal: openAvatarModal, closeModal: closeAvatarModal } = setupModal(elements.avatarPopup);
const { openModal: openConfirmModal, closeModal: closeConfirmModal } = setupModal(elements.confirmPopup);

// Включение валидации форм
enableValidation(validationConfig);

// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    renderUserInfo(userData);
    renderCards(cards);
  })
  .catch(err => {
    console.error(`Ошибка при загрузке данных: ${err}`);
  });

// Функция отображения информации пользователя
function renderUserInfo(userData) {
  if (!elements.profileImage || !elements.profileTitle || !elements.profileDescription) return;
  elements.profileTitle.textContent = userData.name;
  elements.profileDescription.textContent = userData.about;
  elements.profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

// Функция отображения карточек
function renderCards(cards) {
  cards.forEach(card => {
    const cardElement = createCard(
      card,
      userId,
      handleCardClick,
      handleDeleteClick,
      handleLikeClick
    );
    elements.placesList.append(cardElement);
  });
}

// Обработчик клика по карточке (просмотр изображения)
function handleCardClick(cardData) {
  elements.popupImage.src = cardData.link;
  elements.popupImage.alt = cardData.name;
  elements.popupCaption.textContent = cardData.name;
  openImageModal();
}

let cardToDelete = null;

// Обработчик удаления карточки
function handleDeleteClick(cardId, cardElement) {
  cardToDelete = { cardId, cardElement };
  openConfirmModal();
}

// Подтверждение удаления
elements.confirmPopup.querySelector('.popup__button').addEventListener('click', () => {
  if (cardToDelete) {
    deleteCard(cardToDelete.cardId)
      .then(() => {
        cardToDelete.cardElement.remove();
        closeConfirmModal();
        cardToDelete = null;
      })
      .catch(err => {
        console.error(`Ошибка при удалении карточки: ${err}`);
      });
  }
});

// Обработчик лайка карточки
function handleLikeClick(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  (isLiked ? unlikeCard(cardId) : likeCard(cardId))
    .then(updatedCard => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCount.textContent = updatedCard.likes.length;
    })
    .catch(err => {
      console.error(`Ошибка при ${isLiked ? 'снятии' : 'постановке'} лайка: ${err}`);
    });
}

// Редактирование профиля
elements.editButton.addEventListener('click', () => {
  elements.editNameInput.value = elements.profileTitle.textContent;
  elements.editJobInput.value = elements.profileDescription.textContent;
  clearValidation(elements.editForm, validationConfig);
  openEditModal();
});

elements.editForm.addEventListener('submit', handleEditFormSubmit);

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  const defaultText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  updateUserInfo(elements.editNameInput.value, elements.editJobInput.value)
    .then(userData => {
      renderUserInfo(userData);
      closeEditModal();
    })
    .catch(err => {
      console.error(`Ошибка при обновлении профиля: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = defaultText;
    });
}

// Добавление новой карточки
elements.addButton.addEventListener('click', () => {
  clearValidation(elements.addForm, validationConfig);
  openAddModal();
});

elements.addForm.addEventListener('submit', handleAddFormSubmit);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  const defaultText = submitButton.textContent;
  submitButton.textContent = 'Создание...';

  addNewCard(elements.addCardNameInput.value, elements.addCardUrlInput.value)
    .then(newCard => {
      const cardElement = createCard(
        newCard,
        userId,
        handleCardClick,
        handleDeleteClick,
        handleLikeClick
      );
      elements.placesList.prepend(cardElement);
      elements.addForm.reset();
      closeAddModal();
    })
    .catch(err => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = defaultText;
    });
}

// Обновление аватара
elements.avatarEditButton.addEventListener('click', () => {
  clearValidation(elements.avatarForm, validationConfig);
  openAvatarModal();
});

elements.avatarForm.addEventListener('submit', handleAvatarFormSubmit);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  const defaultText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  updateAvatar(elements.avatarUrlInput.value)
    .then(userData => {
      renderUserInfo(userData);
      elements.avatarForm.reset();
      closeAvatarModal();
    })
    .catch(err => {
      console.error(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = defaultText;
    });
}