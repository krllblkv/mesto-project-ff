import { elements } from './constants.js';

// Создаем DOM-элемент карточки на основе переданных данных
export function createCard(cardData, handleCardClick) {
  const cardElement = elements.cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем обработчик клика по кнопке лайка
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // Добавляем обработчик клика по кнопке удаления
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  // Добавляем обработчик клика по изображению карточки
  cardImage.addEventListener('click', () => handleCardClick(cardData));

  // Возвращаем готовый DOM-элемент карточки
  return cardElement;
}