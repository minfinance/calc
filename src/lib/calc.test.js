import { savings } from './calc';
import _ from 'lodash';

test('savings() return correct years', () => {
  let years = savings(15).map( i => i.year )

  expect(years).toHaveLength(15)
  expect(years).toEqual(_.range(1,16))
});

test('savings() return compounded savings without growth rate', () => {
  let result = savings(5, 10000)
  expect(result[4].yearStart).toEqual(10000 * 4)
  expect(result[4].yearEnd).toEqual(10000 * 5)
});

test('savings() return compounded savings with growth rate', () => {
  let result = savings(2, 10000, 0.1)
  expect(result).toEqual([
    {year: 1, yearStart:0,     yearEnd: 10000},
    {year: 2, yearStart:10000, yearEnd: 11000 + 10000},
  ]);
});