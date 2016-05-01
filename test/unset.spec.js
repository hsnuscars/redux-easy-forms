import { expect } from 'chai';
import { libData, testStore, FORMKEY_USERFORM, FORMKEY_PROFILEFORM, VALUE_GENDER_MALE, VALUE_SPORTS_BIKING } from './_test-data';
import { unsetForm, get, set, unset } from '../src/REFormsAPI';

afterEach(function() {
  unsetForm( libData );
});

describe( 'unset()', () => {

  it( "should reset a single field to its pristine value", () => {
    const fieldKey  = 'email';
    const origValue = get( libData, fieldKey );
    const tempValue = 'temp';

    set( libData, { [ fieldKey ]: tempValue } );

    let updatedData = testStore.getState().REForms;
    const updatedValue = updatedData[ FORMKEY_USERFORM ][ fieldKey ].value;

    const data = { data: updatedData };
    const updatedLibData = { ...libData, ...data };

    unset( updatedLibData, fieldKey );

    updatedData  = testStore.getState().REForms;
    const actual = updatedData[ FORMKEY_USERFORM ][ fieldKey ].value;

    expect( updatedValue ).to.eql( tempValue );
    expect( actual ).to.eql( origValue );
  });


  it( "should reset several fields to their pristine values", () => {
    const fieldKey1  = 'email';
    const fieldKey2  = 'gender';

    const origValue1 = get( libData, fieldKey1 );
    const origValue2 = get( libData, fieldKey2 );

    const tempValue1 = 'temp';
    const tempValue2 = VALUE_GENDER_MALE;

    const setData = {
      [ fieldKey1 ]: tempValue1,
      [ fieldKey2 ]: tempValue2
    };

    set( libData, setData );

    let updatedData = testStore.getState().REForms;
    const updatedValue1 = updatedData[ FORMKEY_USERFORM ][ fieldKey1 ].value;
    const updatedValue2 = updatedData[ FORMKEY_PROFILEFORM ][ fieldKey2 ].value;

    const data = { data: updatedData };
    const updatedLibData = { ...libData, ...data };

    unset( updatedLibData, [ fieldKey1, fieldKey2 ] );

    updatedData  = testStore.getState().REForms;
    const actual1 = updatedData[ FORMKEY_USERFORM ][ fieldKey1 ].value;
    const actual2 = updatedData[ FORMKEY_PROFILEFORM ][ fieldKey2 ].value;

    expect( updatedValue1 ).to.eql( tempValue1 );
    expect( updatedValue2 ).to.eql( tempValue2 );
    expect( actual1 ).to.eql( origValue1 );
    expect( actual2 ).to.eql( origValue2 );
  });
});
