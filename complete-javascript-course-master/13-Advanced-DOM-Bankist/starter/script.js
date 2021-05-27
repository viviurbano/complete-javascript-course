'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// select element

// create element

// delete element

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.querySelector('.header');

// retorna um nó. Diferente do HTMLCollection, a lista dos nós não atualiza
const allSections = document.querySelectorAll('.section');
console.log(allSections);

const section1 = document.getElementById('section--1');
console.log(section1);

//retorna um HTMLCollection -  que atualiza caso o elemento seja atualizado
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// pesquisar .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = `We use cookies for improved funcionality and analitics`;
message.innerHTML =
  'We use cookies for improved funcionality and analitics. <button class="btn--close-cookie">Got it</button>';
