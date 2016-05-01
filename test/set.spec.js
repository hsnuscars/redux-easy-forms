import { expect } from 'chai';
import { libData, testStore, FORMKEY_USERFORM, FORMKEY_PROFILEFORM, VALUE_SPORTS_RUNNING, VALUE_SPORTS_BIKING } from './_test-data';
import { unsetForm, get, set } from '../src/REFormsAPI';

afterEach(function() {
  unsetForm( libData );
});

describe( 'set()', () => {

  it( "should set a single value into a 'text' field", () => {
    const newValue = 'peter@moarwick.com';
    const setData  = { email: newValue };
    set( libData, setData );
    const updatedStore = testStore.getState().REForms;
    const actual       = updatedStore[ FORMKEY_USERFORM ].email.value;
    expect( actual ).to.eql( newValue );
  });

  it( "should toggle a single value into a 'multiple' field's array", () => {
    const newValue = [ VALUE_SPORTS_RUNNING, VALUE_SPORTS_BIKING ];
    const setData  = { sports: VALUE_SPORTS_BIKING };
    set( libData, setData );
    const updatedStore = testStore.getState().REForms;
    const actual       = updatedStore[ FORMKEY_PROFILEFORM ].sports.value;
    expect( actual ).to.eql( newValue );
  });

  it( "should set an array value into a 'multiple' field", () => {
    const newValue = [ VALUE_SPORTS_BIKING ];
    const setData  = { sports: newValue };
    set( libData, setData );
    const updatedStore = testStore.getState().REForms;
    const actual       = updatedStore[ FORMKEY_PROFILEFORM ].sports.value;
    expect( actual ).to.eql( newValue );
  });

  it( "should no-op if value is of wrong type, e.g. undefined, false, Obj", () => {
    const origValue = get( libData, 'email' );
    const setData   = { email: undefined };       // <-- invalid value
    set( libData, setData );
    const updatedStore = testStore.getState().REForms;
    const actual       = updatedStore[ FORMKEY_USERFORM ].email.value;
    expect( actual ).to.eql( origValue );
  });
});
