(() => {

  const container = document.createElement('div');
  container.classList.add('container')

  let title = document.createElement('h1')
  title.classList.add('title-style');
  title.textContent = 'Игра в пары';

  let endTitle = document.createElement('h2');
  endTitle.classList.add('title-style');

  let form = document.createElement('form');
  form.classList.add('form');
  form.classList.add('input-group', 'mb-3');


  let inputCountCard = document.createElement('input');
  inputCountCard.classList.add('input');
  inputCountCard.classList.add('form-control');
  inputCountCard.placeholder = 'Укажите кол-во карточек по вертикали/горизонтали';
  inputCountCard.type = 'number';
  inputCountCard.value = '';

  const inputRulesText = document.createElement('div');
  inputRulesText.classList.add('input-rules');
  inputRulesText.textContent = '';

  let buttonInput = document.createElement('button');
  buttonInput.textContent = 'Начать игру';
  buttonInput.classList.add('btn', 'btn-success');
  buttonInput.classList.add('input-group-append');
  buttonInput.disabled = true;

  form.append(inputCountCard);
  form.append(buttonInput);

  const list = document.createElement('ul');
  list.classList.add('container-card');

  const timerContainer = document.createElement('div');
  timerContainer.classList.add('timer-container');

  const timerElement = document.createElement('div');
  timerElement.classList.add('timer');
  // let countTimer = 60;
  timerElement.textContent = '60';

  let card;


  let countArray = []; //массив для чисел которые будут в колоде
  let cardArray = [];
  let countCard;

  function createCards (countCardsInGame) {

    for (let i = 1; i <= countCardsInGame; ++i) {

      countArray.push(Math.round(i / 2))
    }
     //  создаю и использую функцию Фишер Йет для перемешивания чисел в массиве (в моем случае карт в колоде)
    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }
    shuffle(countArray)
    //  создаю карты
    for (const content of countArray) {
     card = document.createElement('li');
     card.classList.add('card');  // стили карты
     card.classList.add('card-close-style');  // стили для закрытой карты
     card.textContent = content;
     list.append(card);
    }

    for (let card of list.children) {
      cardArray.push(card);
  };

  }

  // function inputValue () {
    inputCountCard.addEventListener('input', () => {
      function inputValue () {
        if (inputCountCard.value < 2 || inputCountCard.value > 10) {

          inputRulesText.textContent = 'Введите четное число не менее 2 и не более 10';
          // buttonInput.disabled = true;

          setTimeout(inputCountCard.value = '', 2000);
          // setTimeout(buttonInput.disabled = false, 10000);

        }

        else if (!((inputCountCard.value % 2) === 0)) {
          inputRulesText.textContent = 'Введите четное число';
          // buttonInput.disabled = true;

          setTimeout(inputCountCard.value = '', 1000)
        }

        else {
          inputRulesText.textContent = ''
          buttonInput.disabled = false;
        }
      }
      setTimeout(inputValue, 1000);
    });






  let timerID;

  function funcTimer() {
    timerElement.textContent = timerElement.textContent - 1;
    let timerValue = parseInt(timerElement.textContent);
    if (timerValue <= 0) {
      timerID = clearInterval(timerID);
      timerID = undefined;
      for (card of cardArray) {
        card.classList.add('event')
      };
      endTitle.textContent = 'Игра окончена!'
    };
    if (timerID === undefined) {
      return timerValue;
    }
  };


  function startTimer() {
    if (timerID === undefined) {
      timerID = setInterval(funcTimer, 1000);
    };
  };


  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let count = inputCountCard.value;
    endTitle.textContent = `Игра началась!`;
    timerContainer.append('У вас ',  timerElement, 'секунд');
    container.append(timerContainer);
    countCard = count * 2;

    createCards(countCard);
    startTimer()

     let blackArr = []; //массив для совпавших карт

     for (let card of cardArray) {
       card.addEventListener('click', () => {
         card.classList.remove('card-close-style');

         let newArr = cardArray.filter(el => {
           return !el.classList.contains('card-close-style') && !el.classList.contains('black')
         }); // создаю массив открытых карт

         if (newArr.length === 2) {
           if (newArr[0].textContent === newArr[1].textContent) { // ищу одинаковые пары
             newArr[0].classList.add('black');
             newArr[1].classList.add('black');
           }
         };
         console.log('newArr', newArr);
         if (newArr.length >= 3) {
           console.log(newArr[0].textContent, newArr[1].textContent, newArr[2].textContent);
           if (newArr[0].textContent === newArr[1].textContent) { // ищу одинаковые пары
             newArr[0].classList.add('black');
             newArr[1].classList.add('black');
           }

           else if (newArr[0].textContent !== newArr[1].textContent) {
             newArr[2].classList.remove('card-close-style');
             newArr[0].classList.add('card-close-style');
             newArr[1].classList.add('card-close-style');
           };

           if (newArr[1].textContent === newArr[2].textContent) {
             newArr[1].classList.add('black');
             newArr[2].classList.add('black');
           }

           else if (newArr[1].textContent !== newArr[2].textContent) {
             // newArr[0].classList.add('card-close-style');
             newArr[1].classList.add('card-close-style');
             newArr[2].classList.add('card-close-style');
           };
         };
           blackArr = cardArray.filter(el => el.classList.contains('black') === true);
           if (blackArr.length === cardArray.length) {
             endTitle.textContent = 'Игра окончена!'
           };

       });
    }
           inputCountCard.value = '';
  });

  container.append(title);
  container.append(form);
  container.append(inputRulesText);
  container.append(list);
  container.append(endTitle);


  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(container)
  });
})();

