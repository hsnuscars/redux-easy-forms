import { expect } from 'chai';
import { libData } from './test-data';
import { props } from '../src/REFormsAPI';

describe( 'props()', () => {
  it( 'should return a correct set of props given a valid fieldKey', () => {
    const expected = {
      formKey:      'userForm',
      type:         'text',
      multiple:     false,
      disabled:     false,
      focused:      false,
      touched:      false,
      dirty:        false,
      errors:       [],
      serverErrors: [],
      value:        '',
      valueOrig:    '',
      valueIn:      '',
      valueOut:     '',
      onFocus:      true,   // if function
      onChange:     true,   // if function
      onBlur:       true    // if function
    };

    const actual = props( libData, 'email' );
    actual.onFocus  = typeof actual.onFocus === 'function' ? true : false;
    actual.onChange = typeof actual.onChange === 'function' ? true : false;
    actual.onBlur   = typeof actual.onBlur === 'function' ? true : false;

    expect( actual ).to.eql( expected );
  });

  it( 'should return a "fallback" object if incorrect or no fieldKey', () => {
    const expected = { value: '' };
    const actual   = props( libData, 'bogus' );

    expect( actual ).to.eql( expected );
  });
});
