

const container = document.getElementById('container')
const id = 'form';
const form = document.getElementById(id);
const input = document.getElementById('input');
const list = document.getElementById('prototype-list')
const errorContainer = document.createElement('span');
errorContainer.style.display = 'none';
errorContainer.style.fontSize = '12px';
container.append(errorContainer);

function createPrototypeChainArray (arr) {

  for (let i of arr) {

    let newProt = Object.getPrototypeOf(i);
    if (newProt.prototype !== undefined) {
      arr.push(newProt);
    }
    else {
      const lastPtototype = newProt.__proto__.constructor;
      arr.push(lastPtototype)
      break
    }
  }


  for (let obj in arr) {

    const li = document.createElement('li');

    li.classList.add('list-group-item')
    li.textContent = arr[obj].prototype.constructor.name;
    list.append(li);
    const ol = document.createElement('ol');
    li.append(ol);
    let text = Object.getOwnPropertyNames(arr[obj]);
    console.log(text)
    text.forEach(el => {
      const li2 = document.createElement('li');
      ol.append(li2);
      li2.textContent = `${el}: ${typeof globalThis[el]}`

    })

  }
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const arr = [];

  errorContainer.style.display = 'none';
  form.style.border = '1px solid blue';
  input.style.border = '1px solid blue';

  list.innerHTML = ''


// ошибка если это не модуль или не функция window
  if (!(typeof window[input.value] === 'function') && !(input.value.endsWith('.js'))) {

    form.style.border = '1px solid red';
    input.style.border = '1px solid red';
    errorContainer.textContent = 'Не является классом или функцией';
    errorContainer.style.display = 'block';
    errorContainer.style.color = 'red';
    return
  }

// импортируемый класс доп задание
 if (input.value.endsWith('.js')) {
  const modulePath = input.value;
  try {
    const module = await import(`./${modulePath}`);
    const nameToSearchPrototype = new module.default().constructor;
    arr.push(nameToSearchPrototype);
    createPrototypeChainArray(arr);
    input.value = '';
  } catch {
     errorContainer.style.display = 'block';
     errorContainer.textContent = 'Неверное название импортируемого модуля'
  }
}

// функции в глобальном объекте window
  else {
    const inputValue = globalThis[input.value];
    arr.push(inputValue);
    createPrototypeChainArray(arr);

    input.value = '';
  }
})
