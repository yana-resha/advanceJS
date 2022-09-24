
export async function loadProduct () {;

  return fetch('http://localhost:3000/api/products')
                              .then(response => {
                                if (response.ok) {
                                  return response.json()
                                }
                                if (response.status === 500) {
                                    const  errorObj = {};
                                    errorObj.status = response.status;
                                    errorObj.message = 'Произошла ошибка, попробуйте обновить страницу позже';
                                    throw errorObj
                                }

                                if (response.status === 404) {
                                  const  errorObj = {};
                                  errorObj.status = response.status;
                                  errorObj.message = 'Список товаров пуст';
                                  throw errorObj
                                }
                              })

}


