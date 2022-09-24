
const mainContainer = document.getElementById('container');


export default async function createPageProduct () {

let moduleAPI = await import('./api.js');
let moduleVeiw = await import('./veiw.js');


// спинер
const spinner =  moduleVeiw.spinnerLoad();
spinner.style.display = 'flex';
document.body.append(spinner);


// функция по открытию и закрытию блока ошибок
function OpenThenCloseErrorBlock (error) {
  const errorBlock = moduleVeiw.errorWindow(error)
  document.body.append(errorBlock)
  setTimeout(moduleVeiw.BlockNone, 3000, errorBlock)
}

async function repeatRequests (nameFunc, countRequests) {
  let count = 0;
   for (let i = 0; i < countRequests; ++i) {
    if (count < countRequests) {
      nameFunc()
      .then(data => moduleVeiw.createProductList(data))
      .then(list => mainContainer.append(list))
      .catch(error => {
        ++count
        
        if (count === countRequests) {
          const newError = {};
          newError.message = 'Произошла ошибка, попробуйте обновить страницу позже'
          OpenThenCloseErrorBlock (newError)
        }
      })
    }
  }
}

moduleAPI.loadProduct()
.then(data => moduleVeiw.createProductList(data))
.then(list => mainContainer.append(list))
.catch((error) => {
  if (error.name === 'SyntaxError') {
    const err = {};
    err.message = 'Произошла ошибка, попробуйте обновить страницу позже (JSON)';
    OpenThenCloseErrorBlock(err)
   }
   else if (error.status === 404) {
    OpenThenCloseErrorBlock (error)
   }
   else if (error.status === 500) {
    repeatRequests(moduleAPI.loadProduct, 2)
   }
   else {
     const err = new TypeError('Неизвестная ошибка, но вы попробуйте обновить страницу')
     OpenThenCloseErrorBlock (err)
     throw err
   }
})
.finally(() => {
  moduleVeiw.BlockNone(spinner)
})

}


createPageProduct ()
