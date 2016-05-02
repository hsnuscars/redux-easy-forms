import { expect } from 'chai';
import * as __ from '../src/utils';

import { libData, FORMKEY_USERFORM, ERROR_1, ERROR_2, SERVER_ERROR_1, SERVER_ERROR_2 } from './_test-data';
import { isValid } from '../src/REFormsAPI';


describe( 'isValid()', () => {
  const formKey  = FORMKEY_USERFORM;
  const fieldKey = 'password';
  
  it( "should return 'false' if any validation errors exist for the supplied 'fieldKey'", () => {
    const libDataClone = __.cloneObject( libData );
    const passField    = libDataClone.data[ formKey ][ fieldKey ];
    passField.errors   = [ ERROR_1 ];
    const actual       = isValid( libDataClone, fieldKey );
    expect( actual ).to.eql( false );
  });
  
  it( "should return 'false' if any server errors exist for the supplied 'fieldKey'", () => {
    const libDataClone     = __.cloneObject( libData );
    const passField        = libDataClone.data[ formKey ][ fieldKey ];
    passField.serverErrors = [ SERVER_ERROR_1 ];
    const actual           = isValid( libDataClone, fieldKey );
    expect( actual ).to.eql( false );
  });
  
  it( "should return 'true' if no errors the supplied 'fieldKey' has no errors", () => {
    const libDataClone = __.cloneObject( libData );
    const actual       = isValid( libDataClone, fieldKey );
    expect( actual ).to.eql( true );
  });
});
