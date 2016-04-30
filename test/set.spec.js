import { expect } from 'chai';

import { libData, FORMKEY_USERFORM, FORMKEY_PROFILEFORM } from './_test-data';
import { testStore } from './_test-store';

import { set } from '../src/REFormsAPI';

describe( 'set()', () => {
  it( "should set data into store...", () => {
    const fieldKey = 'email';
    const newValue = 'peter@moarwick.com';
    const setData = { [ fieldKey ]: newValue };
    set( libData, setData );

    let timeout = setTimeout( () => {
      const updatedStore = testStore.getState().REForms;
      console.log( updatedStore[ FORMKEY_USERFORM ][ fieldKey ].value );
    }, 100 );

    // const actual = updatedStore[ FORMKEY_USERFORM ][ fieldKey ].valueOut;
    // expect( actual ).to.eql( newValue );


  });
});
