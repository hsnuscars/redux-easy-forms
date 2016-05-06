import { REFORMS_INIT, REFORMS_UPDATE_FIELDS } from './REFormsActions';

import * as __ from './utils';


export default function REFormsReducer( state={}, action ) {

  switch( action.type ) {
    /*
     * Populate Redux with user's initial REForms data set
     * Dispatched from REFormsEnhance, prior to mounting any decorated component
     */
    case REFORMS_INIT:
      const data = _validateAll( action.data, action.fns );
      return { ...state, ...data };


    /*
     * Universal reducer to perform field updates
     * Expects fieldUpdateList to be an array of field objects to be updated
     * Each field obj must contain formKey, fieldKey, plus whatever props we want updated on it
     * If updating value, it will be run through: 1) in-formatters, 2) validators (if any)
     */
    case REFORMS_UPDATE_FIELDS:
      const { fieldUpdateList, fns } = action;
      const stateClone = __.cloneObject( state );

      fieldUpdateList.forEach( ( newProps ) => {
        const { formKey, fieldKey, value, ...rest } = newProps;

        const validators = fns[ formKey ][ fieldKey ].validators;
        const filters    = fns[ formKey ][ fieldKey ].filters || {};

        // reference correct field obj
        const fieldObj = stateClone[ formKey ][ fieldKey ];
        const { type, multiple, valuePristine } = fieldObj;

        // change status flags only if present in new props
        if ( 'focused' in newProps ) { fieldObj.focused = newProps.focused; }
        if ( 'touched' in newProps ) { fieldObj.touched = newProps.touched; }

        // when 'dirty' is being explicitly updated to 'false', means we're setting 'pristine'
        // the actual 'dirty' flag is determined way below..
        if ( 'dirty' in newProps && newProps.dirty === false ) {
          fieldObj.valuePristine = fieldObj.multiple ? [ ...fieldObj.value ] : fieldObj.value;
          fieldObj.touched   = false;
        }

        // check for serverErrors, ensure stored as array
        if ( 'serverErrors' in newProps ) {
          const serverErrors = newProps.serverErrors === '' ? [] : __.toArray( newProps.serverErrors );
          fieldObj.serverErrors = serverErrors;
        }

        // handle value updates
        if ( _isValidTypeValue( value, type, multiple ) ) {
          let valueIn = value;

          // if in-filter specified, apply it
          if ( filters.in ) {
            if ( Array.isArray( value ) ) {
              valueIn = value.map( val => filters.in( val ) );

            } else {
              valueIn = filters.in( value );
            }
          }

          // assign value
          if ( !fieldObj.multiple ) {
            fieldObj.value = valueIn;

          // ensure fields intended to hold multiple vals are arrays
          } else {
            // if trying to set a '', turn it into a []
            if ( valueIn === '' ) {
              fieldObj.value = [];

            // if trying to set a single value into a multiple field, toggle it in/out of current array
            } else if ( !Array.isArray( valueIn ) ) {
              fieldObj.value = __.toggle( fieldObj.value, valueIn );

            } else {
              fieldObj.value = valueIn;
            }
          }

          // run validations, assign errors
          fieldObj.errors = _validate( valueIn, validators );
        }

        // determine status of 'dirty' based on current valuePristine
        fieldObj.dirty = multiple ? !__.isEqualArrays( fieldObj.value, fieldObj.valuePristine ) : fieldObj.value !== fieldObj.valuePristine;

        // update field in state copy!
        // TODO: do we even need ...rest here?
        // TODO: if so, should validate obj keys against supported props only, otherwise set can intro garb props!
        stateClone[ formKey ][ fieldKey ] = { ...rest, ...fieldObj };

      });

      return stateClone;


    /*
     * Fallback
     */
    default:
      return state;
  }
}


/*
 * Iterate over the supplied forms data and invoke validations on each field
 * Set any error messages into the errors prop (array), return updated forms data
 */
function _validateAll( data, fns ) {
  let dataClone = __.cloneObject( data );

  Object.keys( dataClone ).forEach( ( formKey ) => {
    Object.keys( dataClone[ formKey ] ).forEach( ( fieldKey ) => {
      let fieldObj     = dataClone[ formKey ][ fieldKey ];
      const validators = fns[ formKey ][ fieldKey ].validators;
      fieldObj.errors  = _validate( fieldObj.value, validators );
    });
  });

  return dataClone;
}


/*
 * Run the supplied value against all validaton fns (if any)
 * Return array of error messages (or empty array)
 */
function _validate( value, validators ) {
  let errors = [];

  if ( Array.isArray( validators ) ) {
    validators.forEach( ( vObj ) => {

      // run supplied validator fn (if 'arg' provided, pass it as the second argument)
      // TODO: validators.js barfs if value isn't a string.. check first if fn belongs to validators.js??
      const isValid = vObj.arg ? vObj.fn( value, vObj.arg ) : vObj.fn( value );

      // if invalid, push the corresponding error message (or default text)
      if ( !isValid ) { errors.push( vObj.error || 'Invalid value' ); }
    });
  }

  return errors;
}


/*
 * Determine if value is okay to update
 */
function _isValidTypeValue( value, type, multiple ) {
  const valueType = typeof value;
  let isValid     = true;

  if ( Array.isArray( value ) ) {
    if ( !multiple ) { isValid = false; }

  } else if ( valueType === 'undefined' || ( valueType !== 'string' && valueType !== 'number' ) ) {
    isValid = false;
  }

  return isValid;
}
