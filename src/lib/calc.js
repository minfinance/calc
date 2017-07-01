import _ from 'lodash';

export function savings(years, savingsPerYear, growthRate = 0) {
  var result = []
  var currentSavings = 0
  
  for(var i=1;i<=years;i++) {
    result.push({
        year: i, 
        yearStart: currentSavings,
        yearEnd: currentSavings * (1+growthRate) + savingsPerYear
    })
    currentSavings += savingsPerYear;
  }

  return result
}

export function futureValue(presentValue, rate, years) {
  return presentValue * (1 + rate)^years;
}