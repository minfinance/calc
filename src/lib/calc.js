import _ from 'lodash';

export function entries(state) {
  let params = {
    fromAge: parseInt(state.fromAge),
    toAge:parseInt(state.toAge),
    yearsToWork: parseInt(state.yearsToWork),
    monthlyExpense: parseInt(state.monthlyExpense),
    initialSavings: parseInt(state.initialSavings),
    growthPercent: parseInt(state.growthPercent)
  }

  let spendings = spending(params.fromAge + params.yearsToWork + 1, params.toAge, params.monthlyExpense);
  let target = spendings[0].expense + spendings[0].yearEnd
  console.log(target);

  return savings(params.initialSavings, params.fromAge, params.fromAge+params.yearsToWork, 65000 * 12, params.growthPercent * 0.01)
         .concat(spendings)
}

export function savings(initialSavings, fromAge, toAge, savingsPerYear, growthRate = 0) {
  var result = []
  var currentSavings = 0
  
  for(var i=fromAge;i<=toAge;i++) {
    result.push({
        year: i, 
        yearStart: currentSavings,
        yearEnd: currentSavings * (1+growthRate) + savingsPerYear
    })
    currentSavings += savingsPerYear;
  }

  return result
}

export function spending(fromAge, toAge, monthlyExpense) {
  var result = _.range(fromAge, toAge+1).map( y => ({
    year: y,
    expense: futureValue(monthlyExpense * 12, 0.021, y - fromAge)
  }) );

  var sum = 0
  for(var i=result.length-1;i>=0;i--) {
    result[i].yearEnd = sum;
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