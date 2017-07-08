import _ from 'lodash';

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

export function spending(startingAge, fromAge, toAge, monthlyExpense) {
  var result = _.range(fromAge, toAge+1).map( y => ({
    year: y,
    expense: futureValue(monthlyExpense * 12, inflationRate, y - startingAge)
  }) );

  var sum = 0
  for(var i=result.length-1;i>=0;i--) {
    result[i].yearEnd = sum;
    result[i].yearStart = sum+result[i].expense;
    sum += result[i].expense;
  }

  return result;
}

export function savingsPerYear(target, initialSavings, yearsToWork, growthRate) {
  let growth = 1 + growthRate

  return (target - initialSavings * Math.pow(growth, yearsToWork)) / geoSeries(growth, yearsToWork - 1)
}

export function futureValue(presentValue, rate, years) {
  return presentValue * Math.pow(1 + rate, years);
}

export function geoSeries(r,n) {
  return (1-Math.pow(r, n+1))/(1-r);
}