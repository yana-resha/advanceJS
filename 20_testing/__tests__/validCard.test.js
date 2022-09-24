import {
  validationNumberCard,
  validateCVCCard,
} from '../19_build/src/validation-rules';

test('Валидация номера карты пропускает корректный номер карты', () => {
  expect(validationNumberCard(4200000000000000)).toBe(true);
});

test('Валидация номера карты не пропускает произвольную строку, содержащую любые', () => {
  expect(validationNumberCard('4200000../jgjgj00')).toBe(false);
});

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр', () => {
  expect(validationNumberCard(42)).toBe(false);
});

test('Валидация номера карты не пропускает строку со слишком большим количеством цифр (например, 25)', () => {
  expect(validationNumberCard(4200000000000000000000000)).toBe(false);
});

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами', () => {
  expect(validateCVCCard(720)).toBe(true);
});

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами', () => {
  expect(validateCVCCard(72)).toBe(false);
  expect(validateCVCCard(7)).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами', () => {
  expect(validateCVCCard(72000)).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами', () => {
  expect(validateCVCCard('555')).toBe(true);
  expect(validateCVCCard('5./')).toBe(false);
  expect(validateCVCCard('5a.')).toBe(false);
});
