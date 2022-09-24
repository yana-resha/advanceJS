document.addEventListener('DOMContentLoaded', () => {

  // задание 1

  const block = document.querySelector('.dropdown-menu')
  const openButton = document.querySelector('.js-open-block');
  const blockToOpen = document.querySelector(openButton.dataset.target);


  openButton.addEventListener('click', (e) => {
    blockToOpen.style.display = 'block';
    e._isClickBtn = true;
  });

  block.addEventListener('click', (e) => {
    e._isClickToBlock = true;
  });

  document.addEventListener('click', (e) => {
    if (e._isClickToBlock) return
    if (e._isClickBtn) return
      blockToOpen.style.display = 'none';
  });

  // задание 2

  const form = document.querySelector('form');
  const inputForm = Array.from(document.querySelectorAll('input'));


  function validate(value) {
    value =  value.trim();
    let newStr;
    newStr = value.split(' ').filter(i => i).join(' ');
    newStr = newStr.replace(/-{2,}/g, '-');
    newStr = newStr.replace(/- /g, '-');
    newStr = newStr.replace(/ -/g, '-');
    // newStr = newStr.replace(/-{2,}/g, '-');
    if (newStr.startsWith('-')) newStr = newStr.substr(1);

    if (newStr.endsWith('-')) newStr = newStr.substr(0, newStr.length - 1)
    newStr = newStr.toLowerCase();
    newStr =  newStr.replace(newStr[0], newStr[0].toUpperCase());
    return newStr
  }

  inputForm.forEach(input => {
    input.addEventListener('keypress', (e) => {
      const newValue = e.key;
      const allowedValue = new RegExp(/^[а-яё -]+$/i);
      if (!newValue.match(allowedValue)) {
        e.preventDefault()
        }
      });
    input.addEventListener('blur', () => {
      input.value = validate(input.value)
    });
  });


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const paragraf = document.createElement('p');
    paragraf.classList.add('fio')
    let str = String();
    inputForm.forEach(input => {
      str += validate(input.value) + ' ';
    });
    paragraf.textContent = str.trim();
    document.querySelector('form').append(paragraf);
    inputForm.forEach(input => input.value = '')
  });



  // задание 3

  const btnScroll = document.createElement('button');
  btnScroll.classList.add('btn-scroll', 'btn', 'btn-secondary');
  btnScroll.textContent = 'Вернуться наверх';
  btnScroll.style.display = 'none';
  document.querySelector('.container').append(btnScroll);

  window.addEventListener('scroll', (e) => {
    let windowScrollCoordinats = window.pageYOffset;
    const conditionToSmoothScroll = 500;

    if (windowScrollCoordinats > conditionToSmoothScroll) {
      btnScroll.style.display = 'block';
    }
    else {
      btnScroll.style.display = 'none'
    }
  }, {passive: true})

  btnScroll.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})


function canvas () {
  const container = document.querySelector('.canvas')
  var canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  canvas.width = 400;

  canvas.style.display = 'flex'
  canvas.style.flexDirection = 'row';
  canvas.style.justifyContent = 'space-between'
  canvas.style.border = '1px solid red'
  container.append(canvas)

  let ctx = canvas.getContext("2d")
  ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
  ctx.fillRect(50, 0,  100, 50);
  ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
  ctx.fillRect(150, 150, 200, 200);
  ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
  ctx.fillRect(200, 50, 200, 200);

  const svg = document.createElement('svg')
  svg.size = 300;
  container.append(svg)
}

canvas()
