import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Calc from '../../core/Calc';
import styles from "./ResultSection.module.scss"

type Props = {
  calc: Calc
}

//*======================== Formula for adaptive by clamp() css function
function adaptiveByClamp(
  screenMin: number,
  screenMax: number,
  fontMin: number,
  fontMax: number) {
  const vw_max = screenMax / 100
  const vw_min = screenMin / 100
  const VW = (fontMax - fontMin) / (vw_max - vw_min)
  const PX = fontMax - VW * vw_max
  return {
    PX: Math.round(PX * 100) / 100,
    VW: Math.round(VW * 100) / 100
  }
}
//*======================== 
function getVariableClamp(
  name: string,
  screenMin: number,
  screenMax: number,
  fontMin: number,
  fontMax: number) {
  if (fontMin === fontMax) return `${name}: ${fontMin}px;`

  //* Choose correct varibles for display
  const displayMin = fontMin > fontMax ? fontMax : fontMin
  const displayMax = fontMin > fontMax ? fontMin : fontMax

  //* Alghoritm
  const { PX, VW } = adaptiveByClamp(screenMin, screenMax, fontMin, fontMax)

  //* String processing
  const px_coeff = `${PX}px + `
  const adaptSize = (PX !== 0 ? px_coeff : "") + `${VW}vw`;
  const clamp = `clamp(${displayMin}px, ${adaptSize}, ${displayMax}px);`

  return `${name}: ${clamp}`
}

const media_min_width = (min: number) => `@media screen and (min-width: ${min}px)`
const media_max_width = (max: number) => `@media screen and (max-width: ${max}px)`
const media_min_max_width = (min: number, max: number) =>
  `@media screen and (min-width: ${min}px) and (max-width: ${max}px)`

//?------------------ Bad code, but how to refactor it?
export default ({ calc }: Props) => {
  const { values } = calc
  const _values = [...values]
  const _variablesText: string[] = []

  //*------------------ Sort by descending
  _values.sort((a, b) => b.breakpoint.X - a.breakpoint.X)

  //*------------------ Create variables on sizes
  for (let i = 0; i < _values.length - 1; i++) {
    const breakpointVariables = []
    for (let j = 0; j < _values[i].variables.length; j++) {
      const current = _values[i + 1].variables[j];
      const next = _values[i].variables[j];
      const screenMin = _values[i + 1].breakpoint.X
      const screenMax = _values[i].breakpoint.X
      const fontMin = current.value
      const fontMax = next.value

      // console.log(screenMin, screenMax, fontMin, fontMax,
      //   getVariableClamp(current.variable, screenMin, screenMax, fontMin, fontMax))
      breakpointVariables.push(
        getVariableClamp(current.variable, screenMin, screenMax, fontMin, fontMax))
    }
    _variablesText.push("\t" + breakpointVariables.join("\n\t"))
  }
  // console.log(_variablesText);

  //* ----------------- Create media queries
  let resultCode = ""
  for (let i = 0; i < _values.length; i++) {
    const get_X = (i: number) => _values[i].breakpoint.X
    const wrapLine = (value: string, end: boolean = false) =>
      ` {\n${value}\n}${end ? '' : '\n\n'}`

    // //* Small sizes
    // if (_values.length === 1 || _values.length === 2) {
    //   resultCode =
    //     `${media_min_width(get_X(0) + 1)} {\n}
    //    \n${media_max_width(get_X(0))} {\n}`
    //   break;
    // }

    if (i === 0) continue
    if (i === 1)
      // The largest one
      resultCode += media_min_width(get_X(i) + 1)
        + wrapLine(_variablesText[i - 1])

    else if (i === _values.length - 1)
      // The smallest size
      resultCode += media_max_width(get_X(i - 1) - 1)
        + wrapLine(_variablesText[i - 1], true)

    else
      resultCode += media_min_max_width(get_X(i), get_X(i - 1))
        + wrapLine(_variablesText[i - 1])
  }

  return (<section className={styles.result}>
    <SyntaxHighlighter language='css' children={resultCode} />
  </section>)
}