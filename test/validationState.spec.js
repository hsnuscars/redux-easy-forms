import { expect } from 'chai';
import * as __ from '../src/utils';
import { ERROR_1, ERROR_2, SERVER_ERROR_1, SERVER_ERROR_2, libData } from './_test-data';
import { validationState } from '../src/REFormsAPI';


describe( 'validationState()', () => {
  const formKey  = 'userForm';
  const fieldKey = 'email';

  const RESULT_ERROR   = { validationState: 'error' };
  const RESULT_SUCCESS = { validationState: 'success' };
  const RESULT_OTHER   = {};

  it( "should return { validationState: 'success' } when validated ok and dirty", () => {
    const libDataClone = __.cloneObject( libData );
    const emailField   = libDataClone.data[ formKey ][ fieldKey ];
    emailField.dirty   = true;      // field must be touched
    const actual       = validationState( libDataClone, fieldKey );
    expect( actual ).to.eql( RESULT_SUCCESS );
  });


  it( "should return { validationState: 'error' } when errors and touched", () => {
    const libDataClone = __.cloneObject( libData );
    const emailField   = libDataClone.data[ formKey ][ fieldKey ];
    emailField.errors  = [ ERROR_1, ERROR_2 ];
    emailField.touched = true;      // field must be touched

    const actual = validationState( libDataClone, fieldKey );
    expect( actual ).to.eql( RESULT_ERROR );
  });


  it( "should return an empty object when validated ok but not dirty", () => {
    const libDataClone = __.cloneObject( libData );
    const actual       = validationState( libDataClone, fieldKey );
    expect( actual ).to.eql( RESULT_OTHER );
  });


  it( "should return an empty object when errors but not touched", () => {
    const libDataClone      = __.cloneObject( libData );
    const emailField        = libDataClone.data[ formKey ][ fieldKey ];
    emailField.serverErrors = [ SERVER_ERROR_1, SERVER_ERROR_2 ];
    const actual            = validationState( libDataClone, fieldKey );
    expect( actual ).to.eql( RESULT_OTHER );
  });
});
