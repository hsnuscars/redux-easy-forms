import { expect } from 'chai';
import { libData, testStore, FORMKEY_USERFORM, FORMKEY_PROFILEFORM } from './_test-data';
import { unsetForm, clear } from '../src/REFormsAPI';


afterEach(function() {
  unsetForm( libData );
});

describe( 'clear()', () => {

  it( "should clear a single field", () => {
    const fieldKey  = 'email';
    clear( libData, fieldKey );
    const updatedData = testStore.getState().REForms;
    const actual      = updatedData[ FORMKEY_USERFORM ][ fieldKey ].value;
    expect( actual ).to.eql( '' );
  });


  it( "should clear several fields, incl. 'multiple' to an empty array", () => {
    const fieldKey1 = 'email';
    const fieldKey2 = 'sports';
    clear( libData, [ fieldKey1, fieldKey2 ] );
    const updatedData = testStore.getState().REForms;
    const actual1     = updatedData[ FORMKEY_USERFORM ][ fieldKey1 ].value;
    const actual2     = updatedData[ FORMKEY_PROFILEFORM ][ fieldKey2 ].value;
    expect( actual1 ).to.eql( '' );
    expect( actual2 ).to.eql( [] );
  });
});
