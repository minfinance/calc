import { savings,futureValue, geoSeries } from './calc';
import _ from 'lodash';

test('savings() return correct years', () => {
  let years = savings(0, 1, 15).map( i => i.year )

  expect(years).toHaveLength(15)
  expect(years).toEqual(_.range(1,16))
});

test('savings() return compounded savings without growth rate', () => {
  let result = savings(0, 1, 5, 10000)
  expect(result[4].yearStart).toEqual(10000 * 4)
  expect(result[4].yearEnd).toEqual(10000 * 5)
});

test('futureValue() return a correct value by year', () => {
  expect(futureValue(100, 0.1, 5)).toBeCloseTo(161.051)
});

test('geoSeries() return a correct value', () => {
  expect(geoSeries(1.021,3)).toBeCloseTo(4.12777)
});