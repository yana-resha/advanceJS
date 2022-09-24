// индикатор загрузки
// объявление об ошибке fetch и кнопка попробовать снова
// дом элемент который будет добавляться в селектор
// метов fetch

  // индикатор загрузки
  // индикатор загрузки
// объявление об ошибке fetch и кнопка попробовать снова
// дом элемент который будет добавляться в селектор
// метов fetch



// индикатор загрузки
export function showLoader () {

    const loadText = document.createElement('div');
    loadText.textContent = 'Идет загрузка';

    loadText.style.display = 'flex';
    return loadText;

}

// индикатор ошибки
export function showErrorState () {

  const errorContainer = document.createElement('div')
  const errorText = document.createElement('div');
  const loadBtn = document.createElement('button');
  loadBtn.classList.add('btn', 'btn-primary');
  loadBtn.textContent = 'Перезагрузить страницу';
  // errorText.textContent = err.message;
  errorText.style.marginRight = '15px'

  errorContainer.style.display = 'flex';


  errorContainer.append(errorText, loadBtn)

  return errorContainer
}



class ComponentError extends Error {

  constructor(err) {
    super(err)
  }

}

export class BaseComponent {

  constructor(selector, showLoader, showErrorState, fetchId) {

    this.selector = document.getElementById(selector);
    this.showLoader = showLoader;
    this.showErrorState = showErrorState;
    this.fetchId = fetchId;

      // если селектор не найден выкидываем ошибку
      if (this.selector === null) {
        const err = 'Указанный DOM-элемент отсутствуем на странице'
        throw new ComponentError(err);
      }
      else {
      // если селектор найден вызываем метод фетч и идикатор загрузки



      this.selector.append(this.showLoader)
      this.fetch()
        .then(arr => {
         this.createDomElement(arr)

        })
        .catch(err => {
         this.selector.append(this.showErrorState)
         this.showErrorState.children[0].textContent = err.message;
         this.showErrorState.children[1].addEventListener('click', () => {
           this.showErrorState.style.display = 'none';
           this.showLoader.style.display = 'flex';
           this.fetch().then(data => this.createDomElement(data))
            .catch(err => {
              this.showErrorState.style.display = 'flex';
              this.showErrorState.children[0].textContent = err.message;
            })
            .finally(() => {
              this.showLoader.style.display = 'none';
            })
         })
        })
        .finally(() => {
         this.showLoader.style.display = 'none';
        })
      }
  }


// метод фетч
  fetch () {
    return new Promise((resolve, reject) => {
      const data = fetch(`https://rickandmortyapi.com/api/character/${this.fetchId}`).then(res => {
        if (res.ok) {
          this.res = res.json()

          resolve(this.res);
        }

        if (res.status === 404) {
          reject(new TypeError('Страница не найдена'));
        }
      })
    });
  }




  // создаю домэлемент на основе полученных данных из апи и добавляю в selector
  createDomElement (obj) {
    if (this.card) return this.card

      const card = document.createElement('div');
      this.card = card;
      card.classList.add('card', 'border', 'border-primary', 'flex-column', 'justify-content-between');
      card.style.width = '18rem';
      card.style.marginBottom = '15px';
      card.style.paddingBottom = '5px';

      const image = document.createElement('img');
      image.classList.add('card-img-top');
      image.src = obj.image;

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = obj.name;

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = obj.gender;

      card.append(image, cardTitle, cardText);

      this.selector.append(this.card)

    return this.card
  }

}

export class AddToCartComponent extends BaseComponent {


  addBusket () {
    if (this.addButton) return this.addButton
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'align-self-center');
    button.textContent = 'Добавить в корзину';
    this.addButton = button;
    this.addButton.addEventListener('click', () => {
      this.addButton.style.display = 'none'
      if (this.btnContainer) this.btnContainer.style.display = 'flex';
    })
    return this.addButton
  }

  countBusket (count) {
    if (this.btnContainer) return this.btnContainer
    const btnContainer = document.createElement('div');
    this.btnContainer = btnContainer;
    btnContainer.style.display = 'flex';
    btnContainer.classList.add('justify-content-center')
    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.style.paddingLeft = '20px'
    minusBtn.style.paddingRight = '20px'
    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.style.paddingLeft = '20px'
    plusBtn.style.paddingRight = '20px'
    minusBtn.classList.add('btn','btn-primary');
    plusBtn.classList.add('btn', 'btn-primary')
    const counter = document.createElement('div');
    counter.textContent = count;
    counter.style.marginLeft = '15px';
    counter.style.marginRight = '15px';
    btnContainer.append(minusBtn, counter, plusBtn)

    this.counter = counter;
    this.minusBtn = minusBtn;
    this.plusBtn = plusBtn;

    this.minusBtn.addEventListener('click', () => {
      this.countCardInBasket -= 1;
      if (this.countCardInBasket <= 0) {
        this.addButton.style.display = ''
        this.btnContainer.style.display = 'none'
      }

    })

    this.plusBtn.addEventListener('click', () => {
      this.countCardInBasket += 1;
    })

    return btnContainer
  }


  fetchBusket () {

    return new Promise((resolve, reject) => {
        super.fetch()
          .then(data => {

            this.data = data;
            this.data.number = Math.round(Math.random()* 10);
            const card =  super.createDomElement(this.data);
            this.card = card;


            this.countCardInBasket = this.data.number;




            resolve(this.card, this.countList)
      })
    })
  }


    set countCardInBasket (number) {
      this._countCardInBasket = number;

      if (this._countCardInBasket <= 0) {
        this._countCardInBasket = 0;
        this.card.append(this.addBusket())
      }
      else {

        this.card.append(this.countBusket(this.countCardInBasket))
        this.counter.textContent = this._countCardInBasket;
      }
    }

    get countCardInBasket () {
      return this._countCardInBasket
    }




  createBusket () {

    this.fetchBusket()

  }



}

