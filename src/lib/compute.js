import {spending, savings, geoSeries} from './calc'

export function compute(state) {
  let toAge = parseInt(state.toAge, 10) 
  let workTillAge = parseInt(state.workTillAge, 10) 
  let fromAge = parseInt(state.fromAge, 10)
  let monthlyExpense = parseInt(state.monthlyExpense, 10);
  let initialSavings = parseInt(state.initialSavings, 10);
  let growthPercent = parseInt(state.growthPercent, 10);

  let yearsToWork = workTillAge - fromAge;

  let spendings = spending(fromAge, workTillAge, toAge, monthlyExpense);
  let target = spendings[0].expense + spendings[0].yearEnd
  
  let savingsPerYear = (target - initialSavings * Math.pow(1 + 0.01*growthPercent, yearsToWork - 1)) / geoSeries(1 + 0.01*growthPercent, yearsToWork - 1)
  var keep = savings(initialSavings, fromAge, fromAge+yearsToWork-1, savingsPerYear, growthPercent * 0.01)


  return {
    yearsToWork: yearsToWork,
    spendingYears: toAge - (yearsToWork + fromAge),
    savingsPerMonth: savingsPerYear / 12,
    savings: keep,
    spendings: spendings
  }
}