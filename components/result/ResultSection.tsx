import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { breakpoint } from '../../core/ICalc';
import styles from "./ResultSection.module.scss"

type Props = {
  breakpoints: breakpoint[]
}

//* Bad code, but not so terrible for MVP
export default ({ breakpoints }: Props) => {

  const breakpointsText = [...breakpoints]
  breakpointsText.sort((a, b) => b.X - a.X) //* Sort by descending
  let resultCode = ""
  for (let i = 0; i < breakpointsText.length; i++) {
    if (breakpointsText.length === 1 || breakpointsText.length === 2) {
      resultCode = `@media screen and (min-width: ${breakpointsText[0].X + 1}px) {}
                  \n@media screen and (max-width: ${breakpointsText[0].X}px) {}`
      break;
    }

    if (i === 0) continue
    if (i === 1)
      //* The largest one
      resultCode += `@media screen and (min-width: ${breakpointsText[i].X + 1}px) {}\n\n`
    else if (i === breakpointsText.length - 1)
      //* The smallest size
      resultCode += `@media screen and (max-width: ${breakpointsText[i - 1].X}px) {}`
    else
      resultCode += `@media screen and (min-width: ${breakpointsText[i].X + 1}px) and (max-width: ${breakpoints[i - 1].X}px) {}\n\n`
  }

  return (<section className={styles.result}>
    <SyntaxHighlighter language='css' children={resultCode} />
  </section>)
}