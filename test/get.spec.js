import { expect } from 'chai';
import { libData, FORMKEY_USERFORM, VALUE_EMAIL, VALUE_SPORTS_RUNNING } from './_test-data';
import { get } from '../src/REFormsAPI';

describe( 'get()', () => {
  it( "should return a correct value (string) from a 'text' field", () => {
    const expected = VALUE_EMAIL;
    const actual   = get( libData, 'email' );
    expect( actual ).to.eql( expected );
  });
  
  it( "should return a correct value when optional 'formKey' arg is supplied", () => {
    const expected = VALUE_EMAIL;
    const actual   = get( libData, 'email', FORMKEY_USERFORM );
    expect( actual ).to.eql( expected );
  });
  
  it( "should return a correct value (array) from a 'multiple' field", () => {
    const expected = [ VALUE_SPORTS_RUNNING ];
    const actual   = get( libData, 'sports' );
    expect( actual ).to.eql( expected );
  });
  
  it( "should return an empty string when incorrect 'fieldKey' is supplied", () => {
    const expected = '';
    const actual   = get( libData, 'bogus' );
    expect( actual ).to.eql( expected );
  });
});
