import { expect } from 'chai';
import { libData } from './_test-data';
import { propsChecked } from '../src/REFormsAPI';

describe( 'propsChecked()', () => {
  it( 'should return a correct set of props given a valid fieldKey', () => {
    const expected = {
      formKey:       'profileForm',
      type:          'radio',
      checked:       true,     // value is 'female'
      multiple:      false,
      disabled:      false,
      focused:       false,
      touched:       false,
      dirty:         false,
      errors:        [],
      serverErrors:  [],
      value:         'female',
      valuePristine: 'female',
      valueIn:       'female',
      valueOut:      'female',
      onFocus:       true,     // if function
      onChange:      true,     // if function
      onBlur:        true      // if function
    };

    const actual = propsChecked( libData, 'gender', 'female' );
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
