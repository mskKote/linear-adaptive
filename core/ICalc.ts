export type breakpoint = { X: number, Y: number }
export type variable = string
export type breakpointValue = {
  breakpoint: breakpoint,
  variables: Array<{ variable: variable, value: number }>
}
export type breakpointValueRevert = {
  variableName: variable,
  breakpoints: Array<{ breakpoint: breakpoint, value: number }>
}

export interface ICalc {
  /**
   * Array of **breakpoints**
   */
  breakpoints: Array<breakpoint>
  /**
   * Array of **variables**
   */
  variables: Array<variable>
  /**
   * Array of breakpoints values. 
   * 
   * Layer1: array of breakpoints
   * 
   * Layer2: array of variables and their values
   */
  values: Array<breakpointValue>

  /**
   * Add a variable to **breakpoints** and **variables**
   * @param variable new variable. It will add it everywhere in logic
   */
  addVariable: (variable: variable) => ICalc
  /**
   * delete a variable from of **breakpoints** and **variables**
   * @param variable new variable. It will delete it everywhere in logic
   */
  deleteVariable: (variable: variable) => ICalc

  /**
   * Add a breakpoint to **breakpoints** and **variables**
   * @param breakpoint new variable. It will add it everywhere in logic
   */
  addBreakpoint: (breakpoint: breakpoint) => ICalc
  /**
   * Deletes a breakpoint from of **breakpoints** and **variables**
   * @param breakpoint new variable. It will delete it everywhere in logic
   */
  deleteBreakpoint: (breakpoint: breakpoint) => ICalc

  /**
 * Update values on ***breakpoint*** at ***variable*** 
 * @param breakpoint breakpoint that will change
 * @param variable variable that will change
 * @param newValue new value 
 */
  changeValue: (breakpoint: breakpoint, variable: variable, newValue: number) => ICalc

  getRevertValues: () => Array<breakpointValueRevert>
}