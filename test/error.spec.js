import { expect } from 'chai';
import * as __ from '../src/utils';

import { ERROR_1, ERROR_2, SERVER_ERROR_1, SERVER_ERROR_2, libDataErrors } from './test-data';
import { error } from '../src/REFormsAPI';


describe( 'error()', () => {
  const formKey           = 'emailsForm';
  
  it( 'should return an empty string if field has no errors', () => {
    const libData      = __.cloneObject( libDataErrors );
    const fieldKey     = 'emailCorrect';
    const emailField   = libData.data[ formKey ][ fieldKey ];
    emailField.errors  = [];
    emailField.touched = true;                    // field must be touched
  
    const actual = error( libData, fieldKey );
    expect( actual ).to.eql( '' );
  });
  
  it( 'should return first validation error, if any exist', () => {
    const libData      = __.cloneObject( libDataErrors );
    const fieldKey     = 'emailIncorrect';
    const emailField   = libData.data[ formKey ][ fieldKey ];
    emailField.errors  = [ ERROR_1, ERROR_2 ];
    emailField.touched = true;                    // field must be touched
  
    const actual = error( libData, fieldKey );
    expect( actual ).to.eql( ERROR_1 );
  });
  
  it( 'should return first server error, if both validation and server error(s) exist', () => {
    const libData           = __.cloneObject( libDataErrors );
    const fieldKey          = 'emailIncorrect';
    const emailField        = libData.data[ formKey ][ fieldKey ];
    emailField.errors       = [ ERROR_1, ERROR_2 ];
    emailField.serverErrors = [ SERVER_ERROR_1, SERVER_ERROR_2 ];
    emailField.touched      = true;               // field must be touched
  
    const actual = error( libData, fieldKey );
    expect( actual ).to.eql( SERVER_ERROR_1 );
  });
  
  it( 'should return an empty string if field not touched', () => {
    const libData     = __.cloneObject( libDataErrors );
    const fieldKey    = 'emailIncorrect';
    const emailField  = libData.data[ formKey ][ fieldKey ];
    emailField.errors = [ ERROR_1, ERROR_2 ];
    
    const actual = error( libData, fieldKey );
    expect( actual ).to.eql( '' );
  });
  
  it( 'should return an empty string if errors exist but field is focused', () => {
    const libData      = __.cloneObject( libDataErrors );
    const fieldKey     = 'emailIncorrect';
    const emailField   = libData.data[ formKey ][ fieldKey ];
    emailField.errors  = [ ERROR_1, ERROR_2 ];
    emailField.touched = true;                    // field must be touched
    emailField.focused = true;                    // but not focused..
    
    const actual = error( libData, fieldKey );
    expect( actual ).to.eql( '' );
  });
});
