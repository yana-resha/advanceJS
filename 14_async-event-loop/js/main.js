const cssPromises = {};

function loadResource (src) {
  // js модуль
  if (src.endsWith('.js')) {
    return import(src);
  }
  // css файл
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve())
      });
      document.head.append(link)
    }
    return cssPromises[src]
  }
  // данные сервера
  return fetch(src).then(res => res.json())
}



function renderPage (moduleName, apiURL, css) {
  starContainer.append(loadMessage);
  Promise.all([
    moduleName,
    apiURL,
    css
  ].map(src => loadResource(src))).then(([pageModule, data]) => {
    starContainer.innerHTML = '';
    starContainer.append(pageModule.render(data));
  })
}

const x = document.createElement('p');
function createElement(moduleName, apiURL, nameKey) {
  Promise.all(
    [moduleName, apiURL].map(src => loadResource(src))
    ).then(([pageModule, data]) => {
      Promise.all(data[nameKey].map(el => loadResource(el))).then(newData => {
        starContainer.append(pageModule.createList(newData, nameKey));
      });
  });
}

const loadMessage =  document.createElement('div');
loadMessage.style.margin = '0 auto';
loadMessage.style.padding = '50px';
loadMessage.textContent = 'Подождите идет загрузка';
loadMessage.classList.add('text-center');
const starContainer = document.getElementById('star');
const params = new URLSearchParams(location.search);
const orderFilm = params.get('orderFilm');
const objToLoadMainPage = { js:'./main-page.js', api: 'https://swapi.dev/api/films', css: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'};
const objToLoadDescriptionPage = { js:'./description-page.js', api: `https://swapi.dev/api/films/${orderFilm}`, css: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'}



if (orderFilm) {
  renderPage(objToLoadDescriptionPage.js, objToLoadDescriptionPage.api, objToLoadDescriptionPage.css);
  createElement(objToLoadDescriptionPage.js, objToLoadDescriptionPage.api, 'planets');
  createElement(objToLoadDescriptionPage.js, objToLoadDescriptionPage.api, 'species');
  createElement(objToLoadDescriptionPage.js, objToLoadDescriptionPage.api, 'starships');
  createElement(objToLoadDescriptionPage.js, objToLoadDescriptionPage.api, 'vehicles');
  createElement(objToLoadDescriptionPage.js, objToLoadDescriptionPage.api, 'characters');
}

else {
  renderPage(objToLoadMainPage.js, objToLoadMainPage.api, objToLoadMainPage.css);
}










