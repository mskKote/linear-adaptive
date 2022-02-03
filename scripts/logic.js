//*======================== Формула
function advancedClamp(screenMin, screenMax, fontMin, fontMax) {
  const vw_max = screenMax / 100
  const vw_min = screenMin / 100
  const M = (fontMax - fontMin) / (vw_max - vw_min)
  const N = fontMax - M * vw_max
  return `clamp(${fontMin}px, ${Math.round(N * 100) / 100}px + ${Math.round(M * 100) / 100}vw, ${fontMax}px)`
}

//*======================== Копирование
function copyResult(id) {
  const result = document.getElementById(`result_${id}`)
  navigator.clipboard.writeText(result.innerText);
}

//*======================== Обработка формы
function getResult(id) {
  const form = document.getElementById(`form_${id}`)
  const { minScreen, maxScreen } = form.dataset
  const fontMin = form['min'].value
  const fontMax = form['max'].value
  if (fontMax === "" || fontMin === "") return
  console.group('advancedClamp');
  console.log(`advancedClamp(${minScreen}, ${maxScreen}, ${fontMin}, ${fontMax})`);
  const result = advancedClamp(minScreen, maxScreen, fontMin, fontMax)
  console.log(result)
  console.groupEnd();
  drawResult(id, result)
}

//*======================== Обработка Enter по кнопке
window.addEventListener("keypress", ({ key }) => {
  if (key !== 'Enter') return
  document.activeElement.click()
})