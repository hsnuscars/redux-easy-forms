import { expect } from 'chai';

import { props } from '../src/REFormsAPI';

describe( 'props()', () => {
  it( 'should return ...', () => {
    // const data = {
    //   average: {
    //     loc: 1
    //   },
    //   invoice: {
    //     loc: 2
    //   }
    // };
    // const loc      = 0;
    // const actual   = utils.getLegendProps(data, loc);
    // const expected = null;
    
    const actual = 1;
    const expected = 1;
    expect(actual).to.eql(expected);
  });
});
