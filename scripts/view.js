//*======================== Получение размеров
let sizes = [375, 667, 835, 1366, 1921, 3841];

const params = new URL(document.URL).searchParams.get("sizes")
if (params) sizes = params.split(',')

function getSizes(sizes) {
  const result = []
  for (let i = 0; i < sizes.length - 1; i++) {
    result.push({
      min: sizes[i],
      max: sizes[i + 1] - 1
    })
  }
  return result
}

//*======================== Отрисовка калькуляторов
function drawField(sizes) {
  const main = document.querySelector("main")
  while (main.firstChild) main.removeChild(main.firstChild);
  const template = document.getElementById("calc")

  for (let i = 0; i < sizes.length; i++) {
    //* Данные
    const { min, max } = sizes[i];
    const id = `${min}_${max}`

    //* Шаблон
    const clone = template.content.cloneNode(true);
    const get = (selector) => clone.querySelector(selector)

    //*---------------------------- Описание
    get(".description").innerHTML = `${min}<b>px</b>&nbsp;→&nbsp;${max}<b>px</b>`
    //*---------------------------- Форма
    const form = get("form");
    form.dataset.minScreen = min
    form.dataset.maxScreen = max
    form.id = `form_${id}`
    //*---------------------------- мин-макс
    form.childNodes[1].setAttribute('onInput', `getResult('${id}')`)
    form.childNodes[3].setAttribute('onInput', `getResult('${id}')`)
    //*---------------------------- Результат
    get("code").id = `result_${id}`
    //*---------------------------- Копирование
    get("button").setAttribute('onClick', `copyResult('${id}')`)

    main.appendChild(clone);
  }
}
console.log(getSizes(sizes));
drawField(getSizes(sizes))

//*======================== Отрисовка результата
function drawResult(id, result) {
  const code = document.getElementById(`result_${id}`)
  code.innerHTML = result
}