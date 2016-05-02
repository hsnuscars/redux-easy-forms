import { expect } from 'chai';
import { libData, testStore, FORMKEY_USERFORM, FORMKEY_PROFILEFORM, FORMKEY_TESTFORM } from './_test-data';
import { unsetForm, getForm, clearForm } from '../src/REFormsAPI';

afterEach(function() {
  unsetForm( libData );
});

describe( 'clearForm()', () => {

  it( "should clear a single form, leaving remaining form(s) intact", () => {
    const expectedForm1 = getForm( libData, FORMKEY_USERFORM );
    const expectedForm2 = { gender: '', sports: [] };

    clearForm( libData, FORMKEY_PROFILEFORM );
    const clearedData    = testStore.getState().REForms;
    const data           = { data: clearedData };
    const updatedLibData = { ...libData, ...data };

    const postClearForm1 = getForm( updatedLibData )[ FORMKEY_USERFORM ];
    const postClearForm2 = getForm( updatedLibData )[ FORMKEY_PROFILEFORM ];

    expect( postClearForm1 ).to.eql( expectedForm1 );
    expect( postClearForm2 ).to.eql( expectedForm2 );
  });

  it( "should clear several forms, leaving remaining form(s) intact", () => {
    const expectedForm1 = { email: '', password: '' };
    const expectedForm2 = { gender: '', sports: [] };
    const expectedForm3 = getForm( libData, FORMKEY_TESTFORM );

    clearForm( libData, [ FORMKEY_USERFORM, FORMKEY_PROFILEFORM ] );
    const clearedData    = testStore.getState().REForms;
    const data           = { data: clearedData };
    const updatedLibData = { ...libData, ...data };

    const postClearForm1 = getForm( updatedLibData )[ FORMKEY_USERFORM ];
    const postClearForm2 = getForm( updatedLibData )[ FORMKEY_PROFILEFORM ];
    const postClearForm3 = getForm( updatedLibData )[ FORMKEY_TESTFORM ];

    expect( postClearForm1 ).to.eql( expectedForm1 );
    expect( postClearForm2 ).to.eql( expectedForm2 );
    expect( postClearForm3 ).to.eql( expectedForm3 );
  });

  it( "should clear all forms", () => {
    const expectedForm1 = { email: '', password: '' };
    const expectedForm2 = { gender: '', sports: [] };
    const expectedForm3 = { descr: '' };

    clearForm( libData );
    const clearedData    = testStore.getState().REForms;
    const data           = { data: clearedData };
    const updatedLibData = { ...libData, ...data };

    const postClearForm1 = getForm( updatedLibData )[ FORMKEY_USERFORM ];
    const postClearForm2 = getForm( updatedLibData )[ FORMKEY_PROFILEFORM ];
    const postClearForm3 = getForm( updatedLibData )[ FORMKEY_TESTFORM ];

    expect( postClearForm1 ).to.eql( expectedForm1 );
    expect( postClearForm2 ).to.eql( expectedForm2 );
    expect( postClearForm3 ).to.eql( expectedForm3 );
  });
});
