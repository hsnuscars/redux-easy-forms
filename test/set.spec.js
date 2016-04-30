import { expect } from 'chai';
import { libData, testStore, FORMKEY_USERFORM, FORMKEY_PROFILEFORM } from './_test-data';

import { set } from '../src/REFormsAPI';

describe( 'set()', () => {
  it( "should set data into store...", () => {
    const fieldKey = 'email';
    const newValue = 'peter@moarwick.com';
    const setData = { [ fieldKey ]: newValue };
    set( libData, setData );
    const updatedStore = testStore.getState().REForms;
    const actual = updatedStore[ FORMKEY_USERFORM ][ fieldKey ].value;
    expect( actual ).to.eql( newValue );
  });
});
