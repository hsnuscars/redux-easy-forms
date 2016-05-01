import { expect } from 'chai';
import { libData, FORMKEY_USERFORM, FORMKEY_PROFILEFORM, VALUE_EMAIL, VALUE_GENDER_FEMALE, VALUE_SPORTS_RUNNING } from './_test-data';
import { getForm } from '../src/REFormsAPI';


describe( 'getForm()', () => {
  it( "should return the correct object of values per the supplied 'formKey'", () => {
    const expected = { email: 'matt@example.com', password: '' };
    const actual   = getForm( libData, FORMKEY_USERFORM );
    expect( actual ).to.eql( expected );
  });

  it( "should return an object containing all forms when 'formKey' not supplied", () => {
    const expected = {
      userForm:    { email: 'matt@example.com', password: '' },
      profileForm: { gender: 'female', sports: [ 'running' ] },
      testForm:    { descr: 'Calling all reformers!' }
    };
    const actual = getForm( libData );
    expect( actual ).to.eql( expected );
  });

  it( "should return an empty object when incorrect 'formKey' is supplied", () => {
    const expected = {};
    const actual   = getForm( libData, 'bogus' );
    expect( actual ).to.eql( expected );
  });
});
