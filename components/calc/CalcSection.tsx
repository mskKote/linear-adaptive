import React from 'react';
import Calc from '../../core/Calc';
import styles from './CalcSection.module.scss'


type Props = {
  calc: Calc
  updateCalc: (calc: Calc) => void
}

enum calcActions {
  changeValue,
  changeVariable,
  addVariable,
  addBreakpoint,
  deleteVariable,
  deleteBreakpoint
}

export default ({ calc, updateCalc }: Props) => {
  const { breakpoints, variables } = calc
  const revertValues = calc.getRevertValues()

  function calcAction(action: calcActions, ...args: any) {
    //* логирование
    console.group(calcActions[action]);
    console.log(args);

    //* Вызов действия
    switch (action) {
      case calcActions.changeValue: calc.changeValue(args[0], args[1], args[2]); break;
      case calcActions.changeVariable: calc.changeVariable(args[0], args[1]); break;
      case calcActions.addVariable: calc.addVariable(args[0]); break;
      case calcActions.addBreakpoint: calc.addBreakpoint(args[0]); break;
      case calcActions.deleteVariable: calc.deleteVariable(args[0]); break;
      case calcActions.deleteBreakpoint: calc.deleteBreakpoint(args[0]); break;
    }

    //* Обновление логики
    updateCalc(calc)
    console.groupEnd();
  }

  //*---------------------------- Логика таблицы
  const tableHead = () => <tr>
    <th>Переменная</th>
    {breakpoints.map(({ X, Y }, i: number) =>
      <th key={i}>
        <div className={styles.breakpoint}>
          <span>{X}px</span>
          <button onClick={() => calcAction(calcActions.deleteBreakpoint, { X, Y })}>❌</button>
        </div>
      </th>)}
    <th>Действия</th>
  </tr>

  const tableRow = () => <>
    {revertValues.map(({ variableName, breakpoints }, i: number) =>
      <tr key={i}>
        {/* Название переменной */}
        <td>
          <input
            placeholder='переменная'
            value={variableName}
            onInput={({ currentTarget }) =>
              calcAction(calcActions.changeVariable, variableName, currentTarget.value)} />
        </td>
        {/* Позиции для переменной */}
        {breakpoints.map(({ breakpoint, value }, td_i: number) =>
          <td key={`${i}-${td_i}`}>
            <input
              placeholder='0'
              type='number'
              defaultValue={value}
              onInput={({ currentTarget }) =>
                calcAction(calcActions.changeValue, breakpoint, variableName, +currentTarget.value)
              } />
          </td>)}
        {/* Действие */}
        <td>
          <button onClick={() => calcAction(calcActions.deleteVariable, variableName)}>Удалить</button>
        </td>
      </tr>)}
  </>

  const tableFoot = () => <tr>
    <td>
      <button
        disabled={variables.filter(x => x === "").length > 0}
        onClick={() => calcAction(calcActions.addVariable)}>
        Добавить переменную
      </button>
    </td>
  </tr>

  return (<section>
    <table className={styles.calc}>
      <thead>{tableHead()}</thead>
      <tbody>{tableRow()}</tbody>
      <tfoot>{tableFoot()}</tfoot>
    </table>
  </section>)
}