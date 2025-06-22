import { elements } from './constants.js';

export function createCard(cardData, userId, handleCardClick, handleDeleteClick, handleLikeClick) {
  const cardElement = elements.cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }

  // Проверяем, лайкнул ли текущий пользователь карточку
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Добавляем обработчики событий
  deleteButton.addEventListener('click', () => handleDeleteClick(cardData._id, cardElement));
  likeButton.addEventListener('click', () => handleLikeClick(cardData._id, likeButton, likeCount));
  cardImage.addEventListener('click', () => handleCardClick(cardData));

  return cardElement;
}