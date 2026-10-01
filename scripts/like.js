/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
Если эти классы поменять в HTML, скрипт перестанет работать. Будьте аккуратны.
*/

const likeHeartArray = document.querySelectorAll('.like-icon');
const likeButtonArray = document.querySelectorAll('.card__like-button');
const iconButtonArray = document.querySelectorAll('.card__icon-button');
const buttonTimers = new WeakMap();

iconButtonArray.forEach((iconButton, index) => {
  iconButton.setAttribute('aria-pressed', 'false');
  iconButton.onclick = () =>
    toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
});

likeButtonArray.forEach((button, index) => {
  button.setAttribute('aria-pressed', 'false');
  button.onclick = () => toggleIsLiked(likeHeartArray[index], button);
});

function toggleIsLiked(heart, button) {
  heart.classList.toggle('is-liked');
  const isLiked = heart.classList.contains('is-liked');
  button.setAttribute('aria-pressed', String(isLiked));
  const iconButton = heart.closest('.card__icon-button');
  iconButton.setAttribute('aria-pressed', String(isLiked));
  iconButton.setAttribute('aria-label', isLiked ? 'Убрать лайк' : 'Поставить лайк');
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  clearTimeout(buttonTimers.get(button));
  const text = heart.classList.contains('is-liked') ? 'Unlike' : 'Like';
  buttonTimers.set(
    button,
    setTimeout(() => {
      button.querySelector('.button__text').textContent = text;
    }, 500)
  );
}
