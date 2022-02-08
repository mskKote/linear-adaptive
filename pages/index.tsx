import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import ResultSection from '../components/result/ResultSection'
import CalcSection from '../components/calc/CalcSection';
import Calc from '../core/Calc';

// let reloads = 0

const defaultCalc = new Calc()
  .addBreakpoint({ X: 375, Y: 0 })
  .addBreakpoint({ X: 667, Y: 0 })
  .addBreakpoint({ X: 834, Y: 0 })
  .addBreakpoint({ X: 1194, Y: 0 })
  .addBreakpoint({ X: 1366, Y: 0 })
  .addBreakpoint({ X: 1920, Y: 0 })
  .addBreakpoint({ X: 3840, Y: 0 })
  .addVariable("variable-1")
  .addVariable("variable-2")

export default () => {
  const [calc, setCalc] = useState(defaultCalc)
  function updateCalc(newCalc: Calc) {
    setCalc(new Calc({ ...newCalc }))
    console.log("Redraw");
  }
  function redraw() {
    updateCalc(calc)
  }
  useEffect(() => {
    // reloads++;
    // console.groupCollapsed('calc');
    // console.table(calc.breakpoints)
    // console.log(calc.variables)
    // console.table(calc.values.map(({ breakpoint, variables }) => ({
    //   ...breakpoint,
    //   variable: variables[0].variable,
    //   value: variables[0].value
    // })))
    // console.log(...calc);
    // console.groupEnd();
  }, [calc])
  //* Определение размеров через URL
  // useEffect(() => {
  //   if (typeof document === 'undefined') return
  //   const url_sizes = new URL(document.URL).searchParams.get("sizes")
  //   if (url_sizes) setScreenSizes(url_sizes.split(',').map(x => +x))
  // }, [])

  return <>
    <Head>
      <title>Linear adaptive</title>
      <meta name="description" content="Adaptive web development calculator. #html #css #scss #sass" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header>
      <h1>MVP калькулятор для адаптива 🦥</h1>
    </header>
    {/* <button onClick={redraw}>reloads: {reloads}</button> */}
    <main>
      <CalcSection calc={calc} updateCalc={updateCalc} />
      <ResultSection breakpoints={calc.breakpoints} />
    </main>

    <footer>
      <a href="https://vk.com/mskkote">По всем вопросам к автору</a>
    </footer>
  </>
}