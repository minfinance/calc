export const inflationRate = 0.021

export function savings(initialSavings, fromAge, toAge, savingsPerYear, growthRate) {
  var result = []
  var currentSavings = initialSavings
  
  for(var i=fromAge;i<=toAge;i++) {
    let interest = currentSavings * growthRate
    result.push({
        year: i, 
        savingsPerYear: savingsPerYear,
        yearStart: currentSavings,
        interest: interest,
        yearEnd: currentSavings + interest + savingsPerYear
    })
    currentSavings = currentSavings + interest + savingsPerYear;
  }

  return result
}

export function spending(fromAge, workTillAge, toAge, initial, yearlyExpense, growthRate) {
  var result = [];
  var current = initial;
  for(var y=workTillAge+1;y<=toAge;y++) {
    var expense = futureValue(yearlyExpense, inflationRate, y - fromAge)
    let interest = growthRate * (current - expense);

    result.push({
      year: y,
      expense: expense,
      yearStart: current,
      interest: (interest < 0.001) ? 0 : interest,
      yearEnd: (1 + growthRate) * (current - expense),
    })

    current = (1 + growthRate)*(current-expense)
  }

  return result;
}

//Calculate expense backwards
export function totalSpendings(fromAge, workTillAge, toAge, yearlyExpense, growthRate) {
  var yearEnd = 0
  let growthFactor = 1 + growthRate

  for(var i=toAge;i>workTillAge;i--) {
    let gross = yearEnd / growthFactor;
    let expenseAtYear = futureValue(yearlyExpense, inflationRate, i - fromAge)

    yearEnd = gross + expenseAtYear
  }

  return yearEnd
}

export function savingsPerYear(target, initialSavings, yearsToWork, growthRate) {
  let growth = 1 + growthRate

  return (target - initialSavings * Math.pow(growth, yearsToWork)) / geoSeries(growth, yearsToWork - 1)
}

export function futureValue(presentValue, rate, years) {
  return presentValue * Math.pow(1 + rate, years);
}

export function geoSeries(r,n) {
  if(r === 1) {
    return n+1;
  }

  return (1-Math.pow(r, n+1))/(1-r);
}