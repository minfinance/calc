import _ from 'lodash';

export function savings(years, savingPerMonth) {
  let savingsPerYear = savingPerMonth * 12;

  var result = []
  var currentSavings = 0
  
  for(var i=1;i<=years;i++) {
    
    currentSavings += savingsPerYear;
    result.push({
        year: i, 
        yearEnd: currentSavings
    })
  }

  return result
}