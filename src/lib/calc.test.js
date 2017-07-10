import { savings,futureValue, geoSeries, savingsPerYear, spending, totalSpendings, inflationRate } from './calc';
import _ from 'lodash';

test('savings() return correct calculations', () => {
  let result = savings(1000, 30, 32, 1000, 0.05)

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({year:30, yearStart:1000, savingsPerYear:1000, interest:50, yearEnd:2050})
  expect(result[1]).toEqual({year:31, yearStart:2050, savingsPerYear:1000, interest:102.5, yearEnd:3152.5})
  expect(result[2]).toEqual({year:32, yearStart:3152.5, savingsPerYear:1000, interest:157.625, yearEnd:4310.125})
});

test('spending() calculate correct expense without growth', () => {
  let fromAge = 30;
  let workTillAge = 32;
  let toAge = 34;
  let yearlyExpense = 1000;

  let inflatedExpense = futureValue(yearlyExpense, inflationRate, 3)
  let initialValue = totalSpendings(fromAge, workTillAge, toAge, yearlyExpense, 0)

  let spendings = spending(fromAge, workTillAge, toAge, initialValue, yearlyExpense, 0)

  expect(spendings).toHaveLength(2)
  expect(spendings[0]).toEqual({year:33, expense: inflatedExpense, yearStart: initialValue, interest: 0, yearEnd: 1086.6832384809995})
  expect(spendings[1]).toEqual({year:34, expense: inflatedExpense * (1+inflationRate), interest: 0, yearStart: 1086.6832384809995, yearEnd: 0})
});

test('totalSpendings() calculate correct expense when growth > 0', () => {
  let fromAge = 30;
  let workTillAge = 32;
  let toAge = 34;
  let yearlyExpense = 1000;

  let inflatedExpense = futureValue(yearlyExpense, inflationRate, 3)
  let initialValue = totalSpendings(fromAge, workTillAge, toAge, yearlyExpense, 0.01)

  let spendings = spending(fromAge, workTillAge, toAge, initialValue, yearlyExpense, 0.01)

  expect(spendings).toHaveLength(2)
  expect(spendings[0]).toEqual({year:33, expense: inflatedExpense, yearStart: initialValue, interest: 10.759239984960391,  yearEnd: 1086.6832384809995})
  expect(spendings[1]).toEqual({year:34, expense: inflatedExpense * (1+inflationRate), interest: 0, yearStart: 1086.6832384809995, yearEnd: 0})
});

test('savingsPerYear() calculate the same number as breakdown in savings()', () => {
  let target = 100000
  let startWork = 30
  let endWork = 32
  let initialSavings = 1000
  let growthRate = 0.05

  let yearsToWork = endWork - startWork + 1

  let computedSavingsPerYear = savingsPerYear(target, initialSavings, yearsToWork, growthRate)
  
  let result = savings(initialSavings, startWork, endWork, computedSavingsPerYear, growthRate)

  let totalYearEnd = result[2].yearStart + result[2].interest + result[2].savingsPerYear
  expect(totalYearEnd).toBeCloseTo(target)
});

test('savingsPerYear() works when growth is 0', () => {
  let target = 100000
  let startWork = 30
  let endWork = 31
  let initialSavings = 1000
  let growthRate = 0

  let yearsToWork = endWork - startWork + 1

  let result = savingsPerYear(target, initialSavings, yearsToWork, growthRate)
  
  expect(result).toBeCloseTo(49500)
});

test('futureValue() return a correct value by year', () => {
  expect(futureValue(100, 0.1, 5)).toBeCloseTo(161.051)
});

test('geoSeries() return a correct value', () => {
  expect(geoSeries(1.021,3)).toBeCloseTo(4.12777)
});

test('geoSeries() return a correct value when rate is 1', () => {
  expect(geoSeries(1,3)).toBeCloseTo(4)
});