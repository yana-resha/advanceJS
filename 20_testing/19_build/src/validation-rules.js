import Payment from 'payment';

export function validationNumberCard(inputValue) {
  return Payment.fns.validateCardNumber(inputValue);
}

export function validateCVCCard(inputValue) {
  return Payment.fns.validateCardCVC(inputValue);
}
