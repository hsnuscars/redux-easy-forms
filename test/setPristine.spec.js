import { expect } from 'chai';
import { libData, testStore, FORMKEY_TESTFORM, FORMKEY_PROFILEFORM, VALUE_GENDER_MALE, VALUE_SPORTS_BIKING } from './_test-data';
import { get, set, setPristine, clear, unset, unsetForm } from '../src/REFormsAPI';

afterEach(function() {
  unsetForm( libData );
});

describe( 'setPristine()', () => {

  it( "should reset a single field to its pristine value", () => {
    const fieldKey  = 'descr';
    const origValue = get( libData, fieldKey );
    const newValue  = 'New description';

    // set a new value into a field
    set( libData, { [ fieldKey ]: newValue } );
    let updatedData    = testStore.getState().REForms;
    let updatedLibData = { ...libData, ...{ data: updatedData } };

    // set current value as 'pristine'
    setPristine( updatedLibData, fieldKey );
    updatedData    = testStore.getState().REForms;
    updatedLibData = { ...libData, ...{ data: updatedData } };

    // clear field
    clear( updatedLibData, fieldKey );
    updatedData    = testStore.getState().REForms;
    updatedLibData = { ...libData, ...{ data: updatedData } };

    // reset to (new) pristine value
    unset( updatedLibData, fieldKey );
    updatedData    = testStore.getState().REForms;
    updatedLibData = { ...libData, ...{ data: updatedData } };
    const actual = updatedData[ FORMKEY_TESTFORM ][ fieldKey ].value;

    // set back to original value, and set 'pristine' (so other tests don't break)
    set( libData, { [ fieldKey ]: origValue } );
    updatedData    = testStore.getState().REForms;
    updatedLibData = { ...libData, ...{ data: updatedData } };
    setPristine( updatedLibData, fieldKey );

    expect( actual ).to.eql( newValue );
  });
});
