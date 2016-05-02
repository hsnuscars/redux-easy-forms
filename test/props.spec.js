import { expect } from 'chai';
import { libData, FORMKEY_USERFORM, VALUE_EMAIL } from './_test-data';
import { props } from '../src/REFormsAPI';

describe( 'props()', () => {
  it( 'should return a correct set of props given a valid fieldKey', () => {
    const expected = {
      formKey:       FORMKEY_USERFORM,
      type:          'text',
      multiple:      false,
      disabled:      false,
      focused:       false,
      touched:       false,
      dirty:         false,
      errors:        [],
      serverErrors:  [],
      value:         VALUE_EMAIL,
      valuePristine: VALUE_EMAIL,
      valueIn:       VALUE_EMAIL,
      valueOut:      VALUE_EMAIL,
      onFocus:       true,    // stub for function
      onChange:      true,    // stub for function
      onBlur:        true     // stub for function
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
