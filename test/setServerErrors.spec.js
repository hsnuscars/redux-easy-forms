import { expect } from 'chai';
import { libData, testStore, FORMKEY_TESTFORM } from './_test-data';
import { unsetForm, setServerErrors, props } from '../src/REFormsAPI';

afterEach(function() {
  unsetForm( libData );
});

describe( 'setServerErrors()', () => {

  it( "should set errors into the field's serverErrors prop", () => {
    const fieldKey = 'email';
    const errorMsg = 'Test error message';
    setServerErrors( libData, { [ fieldKey ]: errorMsg } );

    const updatedData    = testStore.getState().REForms;
    const updatedLibData = { ...libData, ...{ data: updatedData } };
    const actual         = props( updatedLibData, fieldKey );

    expect( actual.serverErrors[ 0 ] ).to.eql( errorMsg );
  });
});
