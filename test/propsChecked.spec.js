import { expect } from 'chai';
import { libData, FORMKEY_PROFILEFORM, VALUE_GENDER_FEMALE } from './_test-data';
import { propsChecked } from '../src/REFormsAPI';

describe( 'propsChecked()', () => {
  it( 'should return a correct set of props given a valid fieldKey', () => {
    const expected = {
      formKey:       FORMKEY_PROFILEFORM,
      type:          'radio',
      checked:       true,     // should be when value is 'female'
      multiple:      false,
      disabled:      false,
      focused:       false,
      touched:       false,
      dirty:         false,
      errors:        [],
      serverErrors:  [],
      value:         VALUE_GENDER_FEMALE,
      valuePristine: VALUE_GENDER_FEMALE,
      valueIn:       VALUE_GENDER_FEMALE,
      valueOut:      VALUE_GENDER_FEMALE,
      onFocus:       true,     // stub for function
      onChange:      true,     // stub for function
      onBlur:        true      // stub for function
    };

    const actual = propsChecked( libData, 'gender', VALUE_GENDER_FEMALE );
    actual.onFocus  = typeof actual.onFocus === 'function' ? true : false;
    actual.onChange = typeof actual.onChange === 'function' ? true : false;
    actual.onBlur   = typeof actual.onBlur === 'function' ? true : false;
    expect( actual ).to.eql( expected );
  });


  it( 'should return a "fallback" object if incorrect or no fieldKey', () => {
    const expected = { value: '' };
    const actual   = propsChecked( libData, 'bogus' );
    expect( actual ).to.eql( expected );
  });
});
