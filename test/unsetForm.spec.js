import { expect } from 'chai';
import { libData, testStore, FORMKEY_USERFORM, FORMKEY_PROFILEFORM, VALUE_GENDER_MALE, VALUE_SPORTS_BIKING } from './_test-data';
import { resetForm, getForm, clearForm } from '../src/REFormsAPI';

afterEach(function() {
  resetForm( libData );
});

describe( 'resetForm()', () => {

  it( "should restore entire form its pristine state", () => {
    const clearedFormComp = { gender: '', sports: [] };

    // remember form's starting values
    const origForm = getForm( libData, FORMKEY_PROFILEFORM );

    // clear the form
    clearForm( libData, FORMKEY_PROFILEFORM );

    const clearedData = testStore.getState().REForms;
    let data           = { data: clearedData };
    let updatedLibData = { ...libData, ...data };

    // get form data after cleared
    const clearedForm = getForm( updatedLibData, FORMKEY_PROFILEFORM );

    // restore the form
    resetForm( updatedLibData, FORMKEY_PROFILEFORM );

    const resetData = testStore.getState().REForms;
    data           = { data: resetData };
    updatedLibData = { ...libData, ...data };

    // get form after restore
    const actual = getForm( updatedLibData, FORMKEY_PROFILEFORM );

    expect( clearedForm ).to.eql( clearedFormComp );
    expect( actual ).to.eql( origForm );
  });


  it( "should restore all forms to their pristine state", () => {
    const clearedFormsComp = {
      userForm:    { email: '', password: '' },
      profileForm: { gender: '', sports: [] },
      testForm:    { descr: '' }
    };

    // remember forms' starting values
    const origForms = getForm( libData );

    // clear all forms
    clearForm( libData );

    const clearedData = testStore.getState().REForms;
    let data           = { data: clearedData };
    let updatedLibData = { ...libData, ...data };

    // get all forms after cleared
    const clearedForms = getForm( updatedLibData );

    // restore all forms
    resetForm( updatedLibData );

    const resetData = testStore.getState().REForms;
    data           = { data: resetData };
    updatedLibData = { ...libData, ...data };

    // get values of all forms after restore
    const actual = getForm( updatedLibData );

    expect( clearedForms ).to.eql( clearedFormsComp );
    expect( actual ).to.eql( origForms );
  });
});
