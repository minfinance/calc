import { savings,futureValue, geoSeries, savingsPerYear } from './calc';
import _ from 'lodash';

test('savings() return correct calculations', () => {
  let result = savings(1000, 30, 32, 1000, 0.05)

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({year:30, yearStart:1000, savingsPerYear:1000, interest:50})
  expect(result[1]).toEqual({year:31, yearStart:2050, savingsPerYear:1000, interest:102.5})
  expect(result[2]).toEqual({year:32, yearStart:3152.5, savingsPerYear:1000, interest:157.625})
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

test('futureValue() return a correct value by year', () => {
  expect(futureValue(100, 0.1, 5)).toBeCloseTo(161.051)
});

test('geoSeries() return a correct value', () => {
  expect(geoSeries(1.021,3)).toBeCloseTo(4.12777)
});