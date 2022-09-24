export function render (data) {
  const container = document.createElement('div');
  container.style.paddingBottom = '50px';
  container.style.paddingTop = '50px';
  const title = document.createElement('h1');
  const backBtn = document.createElement('a');
  backBtn.style.marginBottom = '30px'
  backBtn.textContent = 'Back to episodes';
  backBtn.href = `?orderFilm=`;

  const params = new URLSearchParams(location.search);
  const orderFilm = params.get('orderFilm');

  backBtn.classList.add('btn', 'btn-success')
  title.classList.add('display-4')
  title.innerHTML = `${data.title} id: ${data.episode_id}, выпуск: ${orderFilm}`
  container.classList.add(
    'container',
  )
  const description = document.createElement('p');
  description.textContent = `${data.opening_crawl}`;

  container.append(title, backBtn, description);

  return container
}


export function createList (dataArr, nameKey) {
  let count = 0;
  const listContainer = document.createElement('div');
  listContainer.classList.add('container')
  listContainer.style.paddingBottom = '50px';
  const listTitle = document.createElement('h2');
  listTitle.classList.add('display-5', "text-center");
  listTitle.textContent = nameKey[0].toUpperCase() + nameKey.slice(1);
  const list = document.createElement('ul');
  list.classList.add('list-group');
  for (const i of dataArr) {
    count += 1;
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'list-group-item-light');
    listItem.textContent =`${count} ${i.name}`;
    list.append(listItem)
  }

  listContainer.append(listTitle, list)
  return listContainer
}

