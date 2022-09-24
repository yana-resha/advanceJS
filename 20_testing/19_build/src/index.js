/* eslint-disable no-shadow */
import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validationNumberCard, validateCVCCard } from './validation-rules';

import { el, setChildren } from 'redom';
import Inputmask from 'inputmask';
import CardInfo from 'card-info';
import Payment from 'payment';

const container = el('div.container');
const mainTitle = el(
  'h1.text-primary',
  { style: { 'text-align': 'center' } },
  'Валидация карт'
);

setChildren(window.document.body, container);
setChildren(container, mainTitle);

export function createValidationForm() {
  const errSpan = el('span');
  errSpan.textContent = '';
  const cardImageBlock = el('div.container-for-image');
  const spinner = el('div.d-flex.align-items-center', [
    el('span.visually-hidden.mr-5', 'Определяется тип карты...'),
    el('div.spinner-border.text-primary.spinner-border-sm', { role: 'status' }),
  ]);

  const successClassListBorder = 'border-success';
  const dangerClassListBorder = 'border-danger';
  const inputClassListBorder = 'border-primary';

  // номер карты
  const numberCardInput = el('input.form-control', {
    type: 'text',
    placeholder: 'Номер карты',
    oninput() {
      setChildren(errSpan, '');
      setChildren(cardImageBlock, spinner);
      numberCardInput.classList.remove(
        dangerClassListBorder,
        successClassListBorder
      );
      numberCardInput.classList.add(inputClassListBorder);
    },

    onblur() {
      setChildren(cardImageBlock, '');
      const inputValue = this.inputmask.unmaskedvalue();
      const validateCard = validationNumberCard(inputValue);

      if (Payment.fns.cardType(inputValue)) {
        const logo = new CardInfo(inputValue, {
          brandsLogosPath: './image/',
        });
        const image = el('img', {
          src: logo.brandLogoPng,
          alt: logo.brandAlias,
        });
        setChildren(cardImageBlock, image);
      }

      if (validateCard === false) {
        numberCardInput.classList.add(dangerClassListBorder);
        const err = el('div', 'Карта не валидна');
        setChildren(errSpan, err);
        numberCardInput.setAttribute('data-value', 'false');
      } else {
        numberCardInput.classList.add(successClassListBorder);
        numberCardInput.setAttribute('data-value', 'true');
      }
    },
  });
  const numberMask = new Inputmask('9999 9999 9999 9999 99');
  numberMask.mask(numberCardInput);

  // дата действия карты

  const dateInput = el('input.form-control', {
    type: 'text',
    placeholder: 'MM/ГГ',
    oninput() {
      setChildren(errSpan, '');
      dateInput.classList.remove(dangerClassListBorder, successClassListBorder);
      dateInput.classList.add(inputClassListBorder);
    },
    onblur() {
      if (Payment.fns.validateCardExpiry(this.value) === false) {
        dateInput.classList.add(dangerClassListBorder);
        dateInput.setAttribute('data-value', 'false');
        const err = el('div', 'Срок действия вашей карты истек');
        setChildren(errSpan, err);
      } else {
        dateInput.classList.add(successClassListBorder);
        dateInput.setAttribute('data-value', 'true');
      }
    },
  });
  const dateMask = new Inputmask('', {
    alias: 'datetime',
    inputFormat: 'mm/yy',
  });
  dateMask.mask(dateInput);
  // инпутмаск cvc

  const cvcInput = el('input.form-control', {
    type: 'text',
    placeholder: 'CVV/CVC',
    oninput() {
      cvcInput.classList.remove(dangerClassListBorder, successClassListBorder);
      cvcInput.classList.add(inputClassListBorder);
    },
    onblur() {
      const inputValue = this.inputmask.unmaskedvalue();
      const validateCVC = validateCVCCard(inputValue);
      if (validateCVC === false) {
        cvcInput.classList.add(dangerClassListBorder);
        cvcInput.setAttribute('data-value', 'false');
        const err = el('div', 'Невелидное значение');
        setChildren(errSpan, err);
      } else {
        cvcInput.classList.add(successClassListBorder);
        cvcInput.setAttribute('data-value', 'true');
      }
    },
  });
  const cvcMask = new Inputmask('999');
  cvcMask.mask(cvcInput);

  // инпут email

  const emailInput = el('input.form-control', {
    type: 'email',
    placeholder: 'Email',
    oninput() {
      setChildren(errSpan, '');
      emailInput.classList.remove(
        dangerClassListBorder,
        successClassListBorder
      );
      emailInput.classList.add(inputClassListBorder);
    },
    onblur() {
      if (!this.value.includes('@')) {
        emailInput.classList.add(dangerClassListBorder);
        emailInput.setAttribute('data-value', 'false');
        const err = el('div', 'Невалидный e-mail');
        setChildren(errSpan, err);
      } else {
        emailInput.classList.add(successClassListBorder);
        emailInput.setAttribute('data-value', 'true');
      }
    },
  });

  const btnSubmitForm = el(
    'button.btn.btn-primary.mt-5',
    {
      type: 'submit',
      onclick(e) {
        e.preventDefault();
      },
    },
    'Отправить'
  );

  btnSubmitForm.disabled = true;

  const form = el('form.d-flex.input-group.row.mb-3', [
    numberCardInput,
    dateInput,
    cvcInput,
    emailInput,
    el('div.my-3', btnSubmitForm),
    errSpan,
  ]);

  const allInput = form.querySelectorAll('input');
  allInput.forEach((el) => {
    el.addEventListener('input', () => {
      btnSubmitForm.disabled = true;
    });
  });
  allInput.forEach((el) => {
    el.addEventListener('blur', () => {
      if (Array.from(allInput).every((el) => el.dataset.value === 'true')) {
        btnSubmitForm.disabled = false;
      }
    });
  });

  // container.append(form, cardImageBlock);
  return form;
}

const form = createValidationForm();

let forminnerHTML = form.innerHTML.toString();
let expectedFormInnerHTML =
  '<input class="form-control" type="text" placeholder="Дата окончания действия карты" inputmode="numeric"><input class="form-control" type="text" placeholder="CVC/CVV" inputmode="text"><input class="form-control" type="email" placeholder="Email для отправки онлайн-чека"><div class="my-3">';

let arr = [];
for (let i of form.children) {
  arr.push(i);
}
let arrPlaceholder = ['Номер карты', 'MM/ГГ', 'CVV/CVC', 'Email'];
for (let i = 0; i < 4; ++i) {
  console.log(arr[i].placeholder)
  console.log(arr[i].placeholder == arrPlaceholder[i]);
}
container.append(form);
