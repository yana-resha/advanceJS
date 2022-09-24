/* eslint-disable jest/valid-expect */
import { createValidationForm } from '../19_build/src/index.js';

test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится четыре поля для ввода с плейсхолдерами «Номер карты», «ММ/ГГ», CVV/CVC, Email', () => {
  const form = createValidationForm();
  let arrChildrenForm = [];
  let arrPlaceholder = ['Номер карты', 'MM/ГГ', 'CVV/CVC', 'Email'];
  for (let i of form.children) {
    arrChildrenForm.push(i);
  }
  for (let i = 0; i < 4; ++i) {
    expect(arrChildrenForm[i]).toBeInstanceOf(HTMLInputElement);
    expect(arrChildrenForm[i].placeholder == arrPlaceholder[i]).toBe(true);
  }
});

