
export function render (data) {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  title.classList.add('display-4', "text-center")
  title.textContent = 'Все о звездных войнах'
  container.classList.add(
    'container',
  )

  const list = document.createElement('div');
  list.classList.add("list-group");
  let count = 0;
  for (let i of data.results) {
    count += 1;
    const link = document.createElement('a');
    const subTitle = document.createElement('div');
    subTitle.classList.add('fst-italic', 'fw-weight-light');
    subTitle.textContent =`год выпуска: ${i.release_date}`;
    link.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-light');
    link.href = `?orderFilm=${count}`;
    link.innerHTML = `<strong>${count}</strong> <strong>${i.title}</strong>`
    link.append(subTitle)
    list.append(link)
  }
  container.append(title, list);
  return container
}

