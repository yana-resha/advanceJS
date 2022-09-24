
export function getTodoListLocal (owner) {

  localStorage.setItem(owner, JSON.stringify(JSON.parse(localStorage.getItem(owner))))

  return JSON.parse(localStorage.getItem(owner))
}


export function createTodoItemLocal ({owner, name}) {
  let newDone = {owner: owner, name: name, id: Math.round(Math.random() * 100)};

  let getLocalList = JSON.parse(localStorage.getItem(owner));
  let forSetLocalList = [];
  getLocalList.forEach(el => {
    forSetLocalList.push(el)
  });
  forSetLocalList.push(newDone);
  localStorage.setItem(owner, JSON.stringify(forSetLocalList));
  return newDone
}

export function switchTodoItemDoneLocal ({todoItem}) {
  todoItem.done = !todoItem.done;
  let getLocalList = JSON.parse(localStorage.getItem(todoItem.owner));
  let forSetLocalList = [];
  getLocalList.forEach(el => {
    if (el.id === todoItem.id) el.done = !el.done;
    forSetLocalList.push(el)
  });
  localStorage.setItem(todoItem.owner, JSON.stringify(forSetLocalList));
}

export function deleteTodoItemLocal ({element, todoItem}) {
  if (!confirm) {
    return;
  };
  element.remove();

  let getLocalList = JSON.parse(localStorage.getItem(todoItem.owner));
  let forSetLocalList = [];
  getLocalList.forEach(el => {
    if (el.id !== todoItem.id) forSetLocalList.push(el);
  });

  localStorage.setItem(todoItem.owner, JSON.stringify(forSetLocalList));
}
