import { expect } from 'chai';
import { libData, testStore, FORMKEY_PROFILEFORM, VALUE_GENDER_MALE, VALUE_SPORTS_BIKING } from './_test-data';
import { getForm, clearForm, setFormPristine, set, unsetForm } from '../src/REFormsAPI';

afterEach(function() {
  unsetForm( libData );
});

describe( 'setFormPristine()', () => {

  it( "should set form's current values as 'pristine'", () => {
    const origValues = getForm( libData, FORMKEY_PROFILEFORM );
    const newValues = {
      gender: '',
      sports: []
    };

    // set new values into form's fields (by clearing it)
    clearForm( libData, FORMKEY_PROFILEFORM );
    let updatedData    = testStore.getState().REForms;
    let updatedLibData = { ...libData, ...{ data: updatedData } };

    // set current form as 'pristine'
    setFormPristine( updatedLibData, FORMKEY_PROFILEFORM );
    updatedData    = testStore.getState().REForms;
    updatedLibData = { ...libData, ...{ data: updatedData } };

    // set form values
    set( updatedLibData, { gender: VALUE_GENDER_MALE, sports: [ VALUE_SPORTS_BIKING ] } );
    updatedData    = testStore.getState().REForms;
    updatedLibData = { ...libData, ...{ data: updatedData } };

    // reset form to its (new) pristine values
    unsetForm( updatedLibData, FORMKEY_PROFILEFORM );
    updatedData    = testStore.getState().REForms;
    updatedLibData = { ...libData, ...{ data: updatedData } };
    const actual   = getForm( updatedLibData, FORMKEY_PROFILEFORM );

    // set form back to initial values, set to 'pristine' (so other tests don't break)
    set( libData, origValues );
    updatedData    = testStore.getState().REForms;
    updatedLibData = { ...libData, ...{ data: updatedData } };
    setFormPristine( updatedLibData, FORMKEY_PROFILEFORM );

    expect( actual ).to.eql( newValues );
  });
});
