export function calculateDiscount(price, percent) {

  if ((typeof price) !== 'number' || (typeof percent) !== 'number') {

    throw new TypeError('Введено неверное значение');
  }
    return (price / 100) * percent;
}

// console.log(calculateDiscount(1000, 'kkk'));

export function getMarketingPrice(product) {
  const productObject = JSON.parse(product);

  try {

    return productObject.prices.marketingPrice;

  } catch (error) {
    return null;
  }
}

const product = '{"result":true, "count":42}'

getMarketingPrice(product)

// Функция имитирует неудачный запрос за картинкой
function fetchAvatarImage(userId) {
  return new Promise((resolve, reject) => {
    reject(new Error(`Error while fetching image for user with id ${userId}`));
  });
}

export async function getAvatarUrl(userId) {
  try {
    const image = await fetchAvatarImage(userId);
    return image.url;
  } catch (error) {
    return '/images/default.jpg'
  }
}

getAvatarUrl('ggggg')
