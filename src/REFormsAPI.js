import { updateFieldsAction } from './REFormsActions';
import * as __ from './utils';

/* -------------------- CONST -------------------- */

const WARN_SET               = 'REForms.set: No field to set!';
const WARN_UNSET             = 'REForms.unset: No field to unset!';
const WARN_UNSET_FORM        = 'REForms.unsetForm: No form to unset!';
const WARN_CLEAR             = 'REForms.clear: No field to clear!';
const WARN_CLEAR_FORM        = 'REForms.clearForm: No form to clear!';
const WARN_SET_PRISTINE      = 'REForms.setPristine: No field to set pristine!';
const WARN_SET_FORM_PRISTINE = 'REForms.setFormPristine: No form to set pristine!';
const WARN_SET_SERVER_ERRORS = 'REForms.setFormPristine: No field to set server errors!';


/* -------------------- API METHODS -------------------- */

/**
 * Get all relevant props for a given input field.
 * For 'select' and 'textarea' inputs, the 'type' prop is not returned.
 * Example: f.props( 'email', 'userForm' )
 * @param   {string} fieldKey  - The key of the requested field
 * @param   {string} [formKey] - The field's formKey (optional, recommended)
 * @returns {Object} Object containing props, or the 'value' prop only (empty string)
 */
export function props( libData, fieldKey='', formKey='' ) {
  const props = _getFieldProps( libData, fieldKey, { formKey } );

  // custom behavior for 'select' & 'textarea' inputs:
  // - add 'componentClass' for React BS
  // - remove the 'type' prop (raw HTML inputs in Chrome choke on it)
  if ( props.type === 'select' || props.type === 'textarea' ) {
    props.componentClass = props.type;
    delete props.type;
  }

  // HACK: at a minimum, return 'value', otherwise React throws "controlled input" warning..
  if ( __.isEmpty( props ) ) { props.value = ''; }
  
  return props;
}


/**
 * Get all relevant props for an input component of type 'checkbox' or 'radio'.
 * The desired 'checkedValue' must be specified to determines the status of the 'checked' prop.
 * Example: f.propsChecked( 'sports', 'running', 'profileForm' )
 * @param   {string}            fieldKey     - The key of the requested field
 * @param   {(string|string[])} checkedValue - Desired value when input is 'checked'
 * @param   {string}            [formKey]    - The field's formKey (optional, recommended)
 * @returns {Object}            Object containing props, or the 'value' prop only (empty string)
 */
export function propsChecked( libData, fieldKey='', checkedValue='', formKey='' ) {
  const props = _getFieldProps( libData, fieldKey, { checkedValue, formKey } );
  
  // HACK: at a minimum, return 'value', otherwise React throws "controlled input" warning..
  if ( __.isEmpty( props ) ) { props.value = ''; }
  
  return props;
}


/**
 * Get the first error message for a given input field.
 * Checks for presence of 'serverErrors' first.
 * Ignores client-side errors if the field is currently 'focused' or hasn't been 'touched'.
 * Ignores server errors if the field is currently 'focused'.
 * To get all errors regardless of status, use the 'props()' method, keying in for 'errors' or 'serverErrors'.
 * Example: f.error( 'email', 'userForm' )
 * @param   {string} fieldKey  - The key of the requested field
 * @param   {string} [formKey] - The field's formKey (optional, recommended)
 * @returns {string} Error message, or an empty string
 */
export function error( libData, fieldKey='', formKey='' ) {
  const props = _getFieldProps( libData, fieldKey, { formKey, pick: [ 'errors', 'serverErrors', 'focused', 'touched' ] } );
  const { errors, serverErrors, focused, touched } = props;

  const serverError     = !focused && serverErrors && serverErrors.length ? serverErrors[ 0 ] : '';
  const validationError = !focused && touched && errors && errors.length ? props.errors[ 0 ] : '';
  const error           = serverError ? serverError : validationError;

  return error;
}


/**
 * Primarily a React-Bootstrap helper, returns an object with the 'validationState' prop, or en empty object
 * The prop will be present only if it evaluates to "error" per above conditions, or to "success" for a 'dirty' (modified) field.
 * Example: f.validationState( 'email', 'userForm' )
 * @param   {string} fieldKey     - The key of the requested field
 * @param   {string} [formKey]    - The field's formKey (optional, recommended)
 * @returns {Object} Object containing 'valdationState' prop, or an empty object
 */
export function validationState( libData, fieldKey='', formKey='' ) {
  const { fns } = libData;
  const result  = {};
  const props   = _getFieldProps( libData, fieldKey, { formKey } );

  const form         = props.formKey;
  const isValidators = fns[ form ] && fns[ form ][ fieldKey ] && fns[ form ][ fieldKey ].validators;

  const { errors, serverErrors, focused, touched, dirty } = props;
  const isError = errors && errors.length || serverErrors && serverErrors.length;

  if ( isError && !focused && touched )    { result.validationState = 'error'; }
  if ( !isError && isValidators && dirty ) { result.validationState = 'success'; }

  return result;
}


/**
 * Get a field's "out" value (value processed through the 'out' filter, if specified in the schema).
 * Fields defined in schema as 'multiple' return arrays of "out" values.
 * Example: f.get( 'email', 'userForm' )
 * @param   {string} fieldKey  - The key of the requested field
 * @param   {string} [formKey] - The field's formKey (optional, recommended)
 * @returns {*}      The "out" value (a string, unless transformed by the 'out' filter)
 */
export function get( libData, fieldKey='', formKey='' ) {
  const props = _getFieldProps( libData, fieldKey, { formKey } );
  return props.valueOut ? props.valueOut : '';
}


/**
 * Get an object of key-value pairs of all fields and "out" values within a given form, or within multiple forms.
 * When requesting multiple forms, the data is nested. If no argument is supplied, returns ALL forms.
 * Example: f.getForm( 'userForm' ), or f.getForm( [ 'userForm', 'profileForm' ] ), or f.getForm()
 * @param   {string} [formKey] - The formKey of the requested form (if not supplied, returns all forms)
 * @returns {Object} Object containing a form's key-vals, or several form sub-objects, or an empty object
 */
export function getForm( libData, formKey='' ) {
  const { data } = libData;
  const formsKeyList = _getFormKeys( data, formKey );

  // get a single form
  if ( formsKeyList.length === 1 && data[ formsKeyList[ 0 ] ] ) {
    return _getFormOutValues( libData, formsKeyList[ 0 ] );

  // return a nested object containing all forms
  } else {
    const allForms = {};
    formsKeyList.forEach( ( key ) => {
      allForms[ key ] = _getFormOutValues( libData, key );
    });
    return allForms;
  }
}


/**
 * Set a new value into a field, or update several fields at once.
 * When setting values into a field defined as 'multiple', supply an array of values; single value acts as a "toggle".
 * Setting an empty string into a 'multiple' field gets converted into an empty array.
 * Any incoming value will be first run through the field's "in" filter, if specified in schema.
 * A value can also be an object of other props to be updated, e.g. { disabled: true }, but tread lightly!
 * Example: f.set( { gender: 'female', sports: [ 'running' ] }, 'profileForm' )
 * @param {Object} setData   - The data object, with fieldKey and new value key-val pairs to be updated
 * @param {string} [formKey] - The formKey of the form containing the fields in setData (optional, recommended)
 */
export function set( libData, setData={}, formKey='' ) {
  const { fns, dispatch } = libData;
  const fieldSetList = _makeFieldObjList( libData, setData, 'value', formKey );
  _dispatchUpdateFieldsAction( dispatch, fieldSetList, fns, WARN_SET );
}


/**
 * Reset a single field, or several fields, to their 'pristine' state.
 * Example: f.unset( 'email', 'userForm' ), or f.unset( [ 'email', 'password' ] )
 * @param {(string|string[])} fieldKey  - The fieldKey(s) to be reset.
 * @param {string}            [formKey] - The fields' formKey (optional, recommended)
 */
export function unset( libData, fieldKey='', formKey='' ) {
  const { fns, dispatch } = libData;
  const fieldSetList = _makeFieldUnsetList( libData, fieldKey, formKey );
  _dispatchUpdateFieldsAction( dispatch, fieldSetList, fns, WARN_UNSET );
}


/**
 * Reset all field values in a single form, or reset multiple forms, to their 'pristine' state.
 * If no argument is supplied, resets ALL forms.
 * Example: f.unsetForm( 'userForm' ), or f.unsetForm( [ 'userForm', 'profileForm' ] ), or f.unsetForm()
 * @param {(string|string[])} formKey - The formKey(s) of the form(s) to be unset, or no arg to unset all
 */
export function unsetForm( libData, formKey='' ) {
  const { data, fns, dispatch } = libData;
  const formsKeyList = _getFormKeys( data, formKey );
  let fieldSetList   = [];

  formsKeyList.forEach( ( form ) => {
    const fieldKeys = Object.keys( data[ form ] );
    fieldSetList    = [ ...fieldSetList, ..._makeFieldUnsetList( libData, fieldKeys, form ) ];
  });

  _dispatchUpdateFieldsAction( dispatch, fieldSetList, fns, WARN_UNSET_FORM );
}


/**
 * Clear a single field, or several fields.
 * Fields defined in schema as 'multiple' are reset as empty arrays.
 * Simultaneously, the 'touched' flag is also set to 'false'.
 * Example: f.clear( 'email', 'userForm' ), or f.clear( [ 'email', 'password' ] )
 * @param {(string|string[])} fieldKey  - The fieldKey(s) to be cleared.
 * @param {string}            [formKey] - The fields' formKey (optional, recommended)
 */
export function clear( libData, fieldKey='', formKey='' ) {
  const { fns, dispatch } = libData;
  const setVal       = { value: '', touched: false };
  const fieldSetList = _makeFieldSetList( libData, fieldKey, formKey, setVal );
  _dispatchUpdateFieldsAction( dispatch, fieldSetList, fns, WARN_CLEAR );
}


/**
 * Clear all field values in a single form, or clear multiple forms.
 * If no argument is supplied, clear ALL forms.
 * Simultaneously, each field's 'touched' flag is also set to 'false'.
 * Example: f.clearForm( 'userForm' ), or f.clearForm( [ 'userForm', 'profileForm' ] ), or f.clearForm()
 * @param {(string|string[])} formKey - The formKey(s) of the form(s) to be cleared, or no arg to clear all
 */
export function clearForm( libData, formKey='' ) {
  const { data, fns, dispatch } = libData;
  const setVal       = { value: '', touched: false };
  const formsKeyList = _getFormKeys( data, formKey );
  let fieldSetList   = [];

  formsKeyList.forEach( ( form ) => {
    const fieldKeys = Object.keys( data[ form ] );
    fieldSetList    = [ ...fieldSetList, ..._makeFieldSetList( libData, fieldKeys, form, setVal ) ];
  });

  _dispatchUpdateFieldsAction( dispatch, fieldSetList, fns, WARN_CLEAR_FORM );
}


/**
 * Check a single field, or several fields, for presence of 'errors' and/or 'serverErrors'.
 * Unlike 'error()', cares nothing for status of 'focused' or 'touched'.
 * Example: f.isValid( 'email' ), or f.isValid( [ 'email', 'password' ] )
 * @param   {(string|string[])} fieldKey  - The fieldKey(s) to be cleared
 * @param   {string}            [formKey] - The fields' formKey (optional, recommended)
 * @returns {Boolean}           True if any errors found, false if none
 */
export function isValid( libData, fieldKey='', formKey='' ) {
  const { data }     = libData;
  const fieldKeyList = __.toArray( fieldKey );
  let matchedFormKey = formKey;
  let isValid        = true;

  fieldKeyList.forEach( ( key ) => {
    if ( !formKey || !( data[ formKey ] && data[ formKey ][ key ] ) ) {
      matchedFormKey = _findFormKey( data, key );
    }
    if ( matchedFormKey ) {
      const props = _getFieldProps( libData, key, { formKey: matchedFormKey, pick: [ 'serverErrors', 'errors' ] } )
      if ( isValid && ( props.serverErrors.length || props.errors.length ) ) {
        isValid = false;
      }
    }
  });

  return isValid;
}


/**
 * Check all fields in a single form, or in multiple forms, for presence of 'errors' and/or 'serverErrors'.
 * If no argument is supplied, check ALL forms.
 * Example: f.isFormValid( 'userForm' ), or f.isFormValid( [ 'userForm', 'profileForm' ] ), or f.isFormValid()
 * @param   {(string|string[])} formKey - The formKey(s) of the form(s) to be checked, or no arg to check all
 * @returns {Boolean}           True if any errors found, false if none
 */
export function isFormValid( libData, formKey='' ) {
  const { data } = libData;
  const formsKeyList = _getFormKeys( data, formKey );
  let allErrors      = [];

  formsKeyList.forEach( ( form ) => {
    Object.keys( data[ form ] ).forEach( ( fieldKey ) => {
      const errors = _getFieldProps( libData, fieldKey, { formKey: form, pick: [ 'errors' ] } ).errors;
      allErrors = [ ...allErrors, ...errors ];
    });
  });

  return !( allErrors.length );
}


/**
 * Check if any fields within a single form, or within multiple forms, were modified from their 'pristine' state.
 * If no argument is supplied, check ALL forms.
 * To check a single field, use the 'props()' method, keying in for 'dirty'.
 * Example: f.isFormDirty( 'userForm' ), or f.isFormDirty( [ 'userForm', 'profileForm' ] ), or f.isFormDirty()
 * @param   {(string|string[])} formKey - The formKey(s) of the form(s) to be checked, or no arg to check all
 * @returns {Boolean}           True if any field(s) modified, false if none
 */
export function isFormDirty( libData, formKey='' ) {
  const { data } = libData;

  const formsKeyList = _getFormKeys( data, formKey );
  let isAllFieldsPristine = true;

  formsKeyList.forEach( ( form ) => {
    Object.keys( data[ form ] ).forEach( ( fieldKey ) => {
      const props = _getFieldProps( libData, fieldKey, { formKey, pick: [ 'dirty' ] } );
      if ( isAllFieldsPristine && props.dirty ) { isAllFieldsPristine = false; }
    });
  });

  return !isAllFieldsPristine;
}


/**
 * Set a single field, or several fields, as 'pristine' per their current values.
 * Both 'touched' and 'dirty' are reset; from here on, 'dirty' and 'unset()' will be referencing the current values.
 * Example: f.setPristine( 'email' ), or f.setPristine( [ 'email', 'password' ] )
 * @param {(string|string[])} fieldKey  - The fieldKey(s) to be set as 'pristine'.
 * @param {string}            [formKey] - The fields' formKey (optional, recommended)
 */
export function setPristine( libData, fieldKey='', formKey='' ) {
  const { fns, dispatch } = libData;
  const setVal       = { dirty: false, touched: false };
  const fieldSetList = _makeFieldSetList( libData, fieldKey, formKey, setVal );
  _dispatchUpdateFieldsAction( dispatch, fieldSetList, fns, WARN_SET_PRISTINE );
}


/**
 * Set all fields in a single form, or in multiple forms, as 'pristine' per their current values.
 * Both 'touched' and 'dirty' are reset; from here on, 'dirty' and 'unset()' will be referencing the current values.
 * If no argument is supplied, set fields across ALL forms as 'pristine'.
 * Example: f.setFormPristine( 'userForm' ), or f.setFormPristine( [ 'userForm', 'profileForm' ] ), or f.setFormPristine()
 * @param {(string|string[])} formKey - The formKey(s) of the form(s) to be cleared, or no arg to clear all
 */
export function setFormPristine( libData, formKey='' ) {
  const { data, fns, dispatch } = libData;
  const setVal       = { dirty: false, touched: false };
  const formsKeyList = _getFormKeys( data, formKey );
  let fieldSetList   = [];

  formsKeyList.forEach( ( form ) => {
    const fieldKeys = Object.keys( data[ form ] );
    fieldSetList    = [ ...fieldSetList, ..._makeFieldSetList( libData, fieldKeys, form, setVal ) ];
  });

  _dispatchUpdateFieldsAction( dispatch, fieldSetList, fns, WARN_SET_FORM_PRISTINE );
}


/**
 * Set "external" error message(s), e.g., from a server response, into field(s).
 * Server errors get cleared automatically, as soon as the field value changes.
 * The error() method checks for presence of server errors before fetching validation errors.
 * Example: f.setErrors( { email: 'Email taken', phone: 'Invalid phone number' }, 'userForm' )
 * @param {Object} setData   - Key-value pairs for all fields to receive error messages
 * @param {string} [formKey] - The formKey of the form containing the fields in setData (optional, recommended)
 */
export function setServerErrors( libData, setData={}, formKey='' ) {
  const { fns, dispatch } = libData;
  const fieldSetList = _makeFieldObjList( libData, setData, 'errors', formKey );
  _dispatchUpdateFieldsAction( dispatch, fieldSetList, fns, WARN_SET_SERVER_ERRORS );
}


/* -------------------- API HELPERS -------------------- */

/*
 * Helper to dispatch fieldSetList via an update action, or log a warning if nothing in list...
 */
function _dispatchUpdateFieldsAction( dispatch, fieldSetList, fns, warning ) {
  if ( fieldSetList.length ) {
    dispatch( updateFieldsAction( fieldSetList, fns ) );
  } else {
    console.warn( warning );
  }
}


/*
 * Helper to return a list (array) of matching form keys in REForms
 * 'query' can be a single key, or array of keys, or empty (return all form keys)
 */
function _getFormKeys( data, query='' ) {
  let keyList;

  if ( !query ) {
    keyList = Object.keys( data );
  } else {
    keyList = __.toArray( query ).filter( key => Boolean( data[ key ] ) );
  }

  return keyList;
}


/*
 * Helper to locate the form which the specified fieldKey belongs to (first match, or empty string)
 */
function _findFormKey( data, fieldKey ) {
  let matchedFormKey = '';
  const formKeyList = Object.keys( data );

  // quick check if only one form in REForms...
  if ( formKeyList.length === 1 && data[ formKeyList[ 0 ] ][ fieldKey ] ) {
    matchedFormKey = formKeyList[ 0 ];

  // otherwise iterate over all forms...
  } else {
    formKeyList.forEach( ( formKey ) => {
      Object.keys( data[ formKey ] ).forEach( ( key ) => {
        // as soon as matched, that's it
        if ( !matchedFormKey && key === fieldKey ) {
          matchedFormKey = formKey;
        }
      });
    });
  }

  return matchedFormKey;
}


/*
 * Helper to generate a fieldSetList of objects, as needed for updateFieldsAction
 * fieldQuery can be either a single fieldKey, or an array of fieldKeys
 */
function _makeFieldSetList( libData, fieldQuery, formKey, setVal ) {
  let fieldSetList   = [];
  const fieldKeyList = __.toArray( fieldQuery );

  fieldKeyList.forEach( ( fieldKey ) => {
    const setData = { [ fieldKey ]: setVal };
    fieldSetList  = [ ...fieldSetList, ..._makeFieldObjList( libData, setData, 'value', formKey ) ];
  });

  return fieldSetList;
}


/*
 * Helper to generate a fieldSetList for the 'unset' methods, as needed for updateFieldsAction
 * fieldQuery can be either a single fieldKey, or an array of fieldKeys
 */
function _makeFieldUnsetList( libData, fieldQuery, formKey ) {
  let fieldSetList   = [];
  const fieldKeyList = __.toArray( fieldQuery );

  fieldKeyList.forEach( ( fieldKey ) => {
    const props   = _getFieldProps( libData, fieldKey, { formKey, pick: [ 'multiple', 'valueOrig' ] } );
    const { multiple, valueOrig } = props;
    const value   = multiple ? [ ...valueOrig ] : valueOrig;
    const setData = { [ fieldKey ]: { value, touched: false } };
    fieldSetList  = [ ...fieldSetList, ..._makeFieldObjList( libData, setData, 'value', formKey ) ];
  });

  return fieldSetList;
}


/*
 * A lower-level helper for above functions, to parse user-provided setData object into the correct object array structure
 * Ensures that each field key exists in data, and locates its corresponding formKey if not supplied
 */
function _makeFieldObjList( libData, setData, propToSet, formKey ) {
  const { data }     = libData;
  let matchedFormKey = formKey;
  let fieldObjList   = [];

  // must be an object
  if ( typeof setData === 'object' ) {

    // check all fields to be updated..
    Object.keys( setData ).forEach( ( fieldKey ) => {

      // make sure fieldKey exists in one of the forms
      if ( !formKey || !( data[ formKey ] && data[ formKey ][ fieldKey ] ) ) {
        matchedFormKey = _findFormKey( data, fieldKey );
      }

      // if matched, push into list in expected obj format
      if ( matchedFormKey ) {
        const value = setData[ fieldKey ];

        if ( propToSet === 'value' ) {
          // if value is an object, assume users wants to update other props
          // TODO: validate obj keys against supported props only, otherwise garb props can accumulate in REForms' field objects!!!
          const props = typeof value === 'object' && !Array.isArray( value ) ? value : { value: value };
          fieldObjList.push( { formKey: matchedFormKey, fieldKey, touched: true, ...props } );
        }

        if ( propToSet === 'errors' ) {
          const serverErrors = __.toArray( value );
          fieldObjList.push( { formKey: matchedFormKey, fieldKey, serverErrors } );
        }
      }
    });
  }

  return fieldObjList;
}


/*
 * Universal internal data getter, by fieldKey (plus options)
 * Unless opts.formKey passed in, fetches the first matching fieldKey
 * By default, delivers an obj of props for JSX (per the field's type)
 * If opts.pick (array of prop names) specified, delivers those specific props only
 */
function _getFieldProps( libData, key, opts ) {
  const { data, fns, dispatch } = libData;
  const { formKey, pick, checkedValue } = opts;
  let fieldData = null;
  let props     = null;
  let form      = '';

  // if opts.formKey supplied, key directly into the form (no need to iterate)
  if ( formKey ) {
    if ( data[ formKey ] ) {
      fieldData = data[ formKey ][ key ];
      form      = formKey;
    }

  // otherwise, try to locate it (first match)..
  } else {
    form = _findFormKey( data, key );
    if ( form ) { fieldData = data[ form ][ key ]; }
  }

  // field data object found..
  if ( fieldData ) {
    const eventListeners = _getEventListeners( dispatch, form, key, fns );
    const filters        = fns[ form ][ key ].filters || {};

    // if opts.pick specified, pick out those specific props..
    if ( pick ) {
      props  = __.pick( { ...fieldData, ...eventListeners }, ...__.toArray( pick ) );

    // otherwise, assume we want ALL component-specific props
    } else {
      let { type, value, multiple, disabled } = fieldData;

      // add event listeners
      props = { ...fieldData, ...eventListeners };

      // other props only if true
      if ( multiple ) { props.multiple = true; }
      if ( disabled ) { props.disabled = true; }

      // add 'checked' prop for checkboxes and radios
      // user must supply the 'value' via 'checkedValue' (second arg)
      if ( type === 'checkbox' || type === 'radio' ) {
        if ( checkedValue ) {
          props.value   = checkedValue;
          props.checked = type === 'checkbox' && multiple ? __.contains( value, checkedValue ) : value === checkedValue;

        } else {
          props.value = value;
        }

      // all other field types...
      } else {
        props.value = value;
      }

      // add formKey
      props.formKey = form;
    }

    // if display filter specified, apply it on props.value
    // also deliver values as filtered in and out
    props.valueIn  = props.value;
    props.valueOut = filters.out ? filters.out( props.value ) : props.value;
    if ( filters.display ) { props.value = filters.display( props.value ); }

  // do not log warning if data is empty (occurs on first render)
  } else if ( !__.isEmpty( data ) ) {
    console.warn( `REForms: field ${ key } does not exist in schema...` );
  }

  return props ? props : {};
}


/*
 * Iterate over specified form's fields, return a new object of fieldKey & valueOut pairs, or empty object.
 */
function _getFormOutValues( libData, formKey ) {
  const { data } = libData;
  let formObj = {};

  if ( data && data[ formKey ] ) {
    Object.keys( data[ formKey ] ).forEach( ( fieldKey ) => {
      formObj[ fieldKey ] = _getFieldProps( libData, fieldKey, { formKey } ).valueOut;
    });
  }

  return formObj;
}


/*
 * Deliver standard input listener props
 */
function _getEventListeners( dispatch, formKey, fieldKey, fns ) {
  return {
    onFocus: () => {
      // console.log( 'onFocus:', formKey, '>', fieldKey );
      dispatch( updateFieldsAction( [ { formKey, fieldKey, touched: true, focused: true } ], fns ));
    },

    onChange: ( e ) => {
      // console.log( 'onChange:', formKey, '>', fieldKey, ':', e.target.value );
      // any serverErrors get cleared as soon as user begins typing...
      dispatch( updateFieldsAction( [ { formKey, fieldKey, value: e.target.value, serverErrors: '' } ], fns ));
    },

    onBlur: () => {
      // console.log( 'onBlur:', formKey, '>', fieldKey );
      dispatch( updateFieldsAction( [ { formKey, fieldKey, focused: false } ], fns ));
    }
  };
}
