

function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');  //чтобы стилизовать кнопку
  let button = document.createElement('button');
  form.classList.add('input-group', 'mb-3'); //1 содержит в себе группу элементов формы, стилизуется бутстрапом //2 оставляем отступ после формы
  input.classList.add('form-control'); // чтобы бутстрап правильно отобразил элемент формы
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append'); // чтобы позиционировать элемент в форме справа
  button.classList.add('btn', 'btn-primary'); // 1 для того чтобы применить все стили для кнопки в бутстрапе //2 нарисует кнопку синим цветом
  button.textContent = 'Добавить дело';
  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);
  return {
    form,
    input,
    button,
  }
}
function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItemElement(todoItem, {onDone, onDelete}) {
  const doneClassList = 'list-group-item-success';
  let item = document.createElement('li');
  let itemContent = document.createElement('span');
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  if (todoItem.done) {
    item.classList.add(doneClassList)
  }
  itemContent.textContent = todoItem.name;
  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';
  doneButton.addEventListener('click', function() {
    onDone({todoItem, element: item} );
    item.classList.toggle(doneClassList, todoItem.done);
  });
  // confirm встроенная функция браузера, выйдет окно при нажатии, если true произойдет действие
  deleteButton.addEventListener('click', function() {
    if (confirm('Вы уверены?')) {
      onDelete({todoItem , element: item})
    }
  });
  item.append(itemContent);
  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);
  return item

};




async function createTodoApp(container, {title, owner, todoItemList = [],
  onCreteFormSubmit,
  onDoneClick, onDeleteClick}) {
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const handlers = {onDone: onDoneClick,onDelete: onDeleteClick}

  todoItemList.forEach(todoItem => {
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement);
  });
  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);
  todoItemForm.button.disabled = true;


  todoItemForm.input.addEventListener('input', function() {
    if (todoItemForm.input.value.length > 0) {
      todoItemForm.button.disabled = false;
    }
    else {
      todoItemForm.button.disabled = true;
    };
  })
  // регистрируем событие submit у form, оно свойственно только для form
  todoItemForm.form.addEventListener('submit', async e => {
    // код для того чтобы отменить стандартные действия браузера, в данном случае мы отменяем перезагрузку страницы при отправке формы
    e.preventDefault();
    //  игнорируем отправку формы если поле для ввода пустое
    if (!todoItemForm.input.value) {
      return
    }
    const todoItem = await onCreteFormSubmit({owner, name: todoItemForm.input.value.trim()});

    let todoItemElement = createTodoItemElement(todoItem, handlers);

    todoList.append(todoItemElement);
    todoItemForm.input.value = '';
    todoItemForm.button.disabled = true;
  });
}

export {createTodoApp};
