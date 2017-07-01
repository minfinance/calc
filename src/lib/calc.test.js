import { savings } from './calc';
import _ from 'lodash';

test('savings() return correct years', () => {
  let years = savings(15).map( i => i.year )

  expect(years).toHaveLength(15)
  expect(years).toEqual(_.range(1,16))
});

test('savings() return compounded savings without ', () => {
  let result = savings(5, 10000)
  expect(result[4].yearEnd).toEqual(10000 * 12 * 5)
});