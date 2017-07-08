import {spending, savings, savingsPerYear} from './calc'

export function compute(state) {
  let toAge = parseInt(state.toAge, 10) 
  let workTillAge = parseInt(state.workTillAge, 10) 
  let fromAge = parseInt(state.fromAge, 10)
  let monthlyExpense = parseInt(state.monthlyExpense, 10);
  let initialSavings = parseInt(state.initialSavings, 10);
  let growthRate = parseInt(state.growthPercent, 10) * 0.01;

  let yearsToWork = workTillAge - fromAge + 1;

  let spendings = spending(fromAge, workTillAge, toAge, monthlyExpense);
  let target = spendings[0].expense + spendings[0].yearEnd
  
  let savingsPerYearAmount = savingsPerYear(target, initialSavings, yearsToWork, growthRate)
  let savingsTable = savings(initialSavings, fromAge, workTillAge, savingsPerYearAmount, growthRate)
  
  savingsTable.push({
    year: "รวม",
    yearStart: target,
  })
  spendings.push({
    year: "รวม",
    yearStart: 0,
  })

  return {
    yearsToWork: yearsToWork,
    spendingYears: toAge - workTillAge,
    savingsPerMonth: savingsPerYearAmount / 12,
    savings: savingsTable,
    spendings: spendings
  }
}