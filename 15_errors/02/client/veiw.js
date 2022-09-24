

export function createProductList (data) {

  const containerCard = document.createElement('div');
  containerCard.classList.add('d-flex', 'justify-content-between', 'flex-wrap')

    for (let i of data.products) {
      const card = document.createElement('div');
      card.classList.add('card', 'mb-3');
      card.style.width = '18rem';

      const image = document.createElement('img');
      image.classList.add('card-img-top');
      image.src = i.image;

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const nameCard = document.createElement('h5');
      nameCard.classList.add('card-title');
      nameCard.textContent = i.name;

      const price = document.createElement('p');
      price.classList.add('card-text');
      price.textContent = `цена: ${i.price}`;

      const btnCard = document.createElement('a');
      btnCard.classList.add('btn', 'btn-primary');
      btnCard.href = '';
      btnCard.textContent = 'Подробнее';
      btnCard.style.pointerEvents = 'none'


      cardBody.append(nameCard, price, btnCard);

      card.append(image);
      card.append(cardBody);
      containerCard.append(card)
    }

  return containerCard
}

export function spinnerLoad () {
  const spinnerContainer =  document.createElement('div');
  spinnerContainer.classList.add('justify-content-center');

  const borderSpinner = document.createElement('span');
  borderSpinner.classList.add('spinner-border', 'text-primary');
  borderSpinner.role = 'status';

  const spinnerContent = document.createElement('span');

  spinnerContainer.classList.add('visually-hidden');
  spinnerContainer.append(borderSpinner);
  return spinnerContainer
}

export function errorWindow (error) {
  const errorContainer =  document.createElement('div');
  errorContainer.style.display = '';
  errorContainer.style.position = 'absolute';
  errorContainer.style.bottom = '0px';
  errorContainer.style.right = '0px';
  errorContainer.style.width = 'auto';
  errorContainer.style.height = 'auto';
  errorContainer.style.border = '1px solid red'
  errorContainer.style.transition = 'display 1s easy-in-out';
  const errorBlock = document.createElement('div');
  errorBlock.style.padding = '20px';
  errorBlock.textContent = error.message;
  errorContainer.append(errorBlock);
  return errorContainer
}

export function BlockNone (block) {
  block.style.display = 'none';
}


