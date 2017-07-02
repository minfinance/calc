import _ from 'lodash';

let inflationRate = 1.012

export function entries(state) {
  let fromAge = parseInt(state.fromAge);
  let toAge = parseInt(state.toAge);
  let yearsToWork = parseInt(state.yearsToWork);
  let monthlyExpense = parseInt(state.monthlyExpense);
  let initialSavings = parseInt(state.initialSavings);
  let growthPercent = parseInt(state.growthPercent);

  let spendings = spending(fromAge, fromAge + yearsToWork, toAge, monthlyExpense);
  let target = spendings[0].expense + spendings[0].yearEnd
  
  let savingsPerYear = (target - initialSavings * Math.pow(1 + 0.01*growthPercent, yearsToWork - 1)) / geoSeries(1 + 0.01*growthPercent, yearsToWork - 1)
  var keep = savings(initialSavings, fromAge, fromAge+yearsToWork-1, savingsPerYear, growthPercent * 0.01)

  return keep.concat(spendings)
}

export function savings(initialSavings, fromAge, toAge, savingsPerYear, growthRate = 0) {
  var result = []
  var currentSavings = initialSavings
  
  for(var i=fromAge;i<=toAge;i++) {
    result.push({
        year: i, 
        expense: savingsPerYear,
        yearStart: currentSavings,
        yearEnd: (currentSavings * (1+growthRate)) + savingsPerYear
    })
    currentSavings = (currentSavings * (1+growthRate)) + savingsPerYear;
  }

  return result
}

export function spending(startingAge, fromAge, toAge, monthlyExpense) {
  var result = _.range(fromAge, toAge+1).map( y => ({
    year: y,
    expense: futureValue(monthlyExpense * 12, 0.021, y - startingAge)
  }) );

  var sum = 0
  for(var i=result.length-1;i>=0;i--) {
    result[i].yearEnd = sum;
    result[i].yearStart = sum+result[i].expense;
    sum += result[i].expense;
  }

  return result;
}

export function futureValue(presentValue, rate, years) {
  return presentValue * Math.pow(1 + rate, years);
}

export function geoSeries(r,n) {
  return (1-Math.pow(r, n+1))/(1-r);
}