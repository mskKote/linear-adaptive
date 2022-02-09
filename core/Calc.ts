import * as ICalc from './ICalc';

export default class Calc implements ICalc.ICalc {

  //*----------------------------- Properties
  breakpoints: ICalc.breakpoint[];
  variables: ICalc.variable[];
  values: ICalc.breakpointValue[];
  *[Symbol.iterator]() {
    yield this.breakpoints
    yield this.variables
    yield this.values
  }
  //*----------------------------- Constructor
  constructor({ breakpoints, variables, values }:
    {
      breakpoints: ICalc.breakpoint[],
      variables: ICalc.variable[],
      values: ICalc.breakpointValue[]
    } = { breakpoints: [], variables: [], values: [] }) {
    this.breakpoints = breakpoints
    this.variables = variables
    this.values = values
  }

  //*----------------------------- Methods
  //* variables
  changeVariable(curr: ICalc.variable, newVariable: ICalc.variable) {
    this.variables = this.variables.map(variable => variable === curr ? newVariable : variable)
    this.values = this.values.map(value => ({
      breakpoint: value.breakpoint,
      variables: value.variables.map(_curr => ({
        variable: _curr.variable === curr ? newVariable : _curr.variable,
        value: _curr.value
      }))
    }))
  }
  addVariable(variable: ICalc.variable = "") {
    this.variables.push(variable)
    this.values.forEach(breakpoint => {
      breakpoint.variables.push({ variable, value: 0 })
    })
    return this
  }
  deleteVariable(variable: ICalc.variable) {
    this.variables = this.variables.filter(x => x !== variable)
    this.values.forEach(breakpoint => {
      breakpoint.variables = breakpoint.variables.filter(x => x.variable !== variable)
    })
    return this
  }

  //* breakpoints
  addBreakpoint(breakpoint: ICalc.breakpoint) {
    this.breakpoints.push(breakpoint)
    this.values.push({
      breakpoint,
      variables: this.variables.map(variable => ({ variable, value: 0 }))
    })
    return this
  }
  deleteBreakpoint({ X, Y }: ICalc.breakpoint) {
    this.breakpoints = this.breakpoints.filter(point => !(point.X === X && point.Y === Y))
    this.values = this.values.filter(({ breakpoint }) => !(breakpoint.X === X && breakpoint.Y === Y))
    return this
  }

  //* values
  changeValue({ X, Y }: ICalc.breakpoint, variable: ICalc.variable, newValue: number) {
    this.values.forEach(value => {
      if (!(value.breakpoint.X === X && value.breakpoint.Y === Y)) return
      value.variables = value.variables.map(old => ({
        variable: old.variable,
        value: old.variable === variable ? newValue : old.value
      }))
    })
    return this
  }

  getRevertValues() {
    const revertValues: ICalc.breakpointValueRevert[] = []
    for (const variable of this.variables) {
      //* Собрать все значения для 1 переменной
      const newValue: ICalc.breakpointValueRevert = {
        variableName: variable,
        breakpoints: []
      }
      //* Цикл по значениям
      for (const { breakpoint, variables } of this.values) {
        const findedVar = variables.find(({ variable: _variable }) => _variable === variable)
        newValue.breakpoints.push({ breakpoint: breakpoint, value: findedVar.value })
      }

      //* Добавление нового значения
      revertValues.push(newValue)
    }
    return revertValues
  };
}